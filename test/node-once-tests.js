/*global module:false*/
var once = module.require('lodash').once;
var Q = module.require('q');

var obj = {
  counter: 0,
  getCounter: function () {
    return this.counter;
  }
};

function initCounter() {
  var defer = Q.defer();
  setTimeout(function () {
    obj.counter += 1;
    defer.resolve();
  }, 1000);
  return defer.promise;
}

QUnit.module('once upon a promise in setup', {
  setup: once(function () {
    console.log('initialize once');
    QUnit.stop();
    initCounter().finally(QUnit.start);
  })
});

QUnit.test('first test after setup', function (assert) {
  assert.equal(obj.counter, 1, 'initialized counter');
});

QUnit.test('second test after setup', function (assert) {
  assert.equal(obj.counter, 1, 'initialized counter');
});

QUnit.test('promise once resolved', function (assert) {
  QUnit.stop();
  var initCounterOnce = once(initCounter);
  var p1 = initCounterOnce();
  assert.ok(!p1.isFulfilled(), 'promise unfulfilled');
  p1.then(function () {
    QUnit.ok(p1.isFulfilled(), 'now promise has been fulfilled');

    var p2 = initCounterOnce();
    QUnit.deepEqual(p1, p2, 'once returns same promise');
    QUnit.ok(p2.isFulfilled(), 'promise has been fulfilled already');

    p2.then(QUnit.start);
  });
});
