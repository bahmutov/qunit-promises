// run from command line
// qunit -c ../qunit-promises.js -t node-tests.js

/*global module:false*/
var Q = module.require('q');

QUnit.module('a test module');

QUnit.test('first test', function (assert) {
	assert.ok(true, 'true is ok');
});

QUnit.test('second test', 1, function (assert) {
  /* jshint -W109 */
	assert.equal(1, "1", '1 == "1"');
});

QUnit.test('qunit-promises is present', 1, function (assert) {
	assert.equal(typeof assert.will, 'function', 'assert.will is there');
});

function delayedFoo() {
	var deferred = Q.defer();
	setTimeout(function () { deferred.resolve('foo'); }, 100);
	return deferred.promise;
}

QUnit.test('example promise test', function (assert) {
	assert.will(delayedFoo(), 'promise is resolved');
	assert.willEqual(delayedFoo(), 'foo', 'promise is resolved with correct value');
});

function delayedHello() {
  var deferred = Q.defer();
  setTimeout(function () { deferred.resolve('hello'); }, 100);
  return deferred.promise;
}

function delayedHelloFail() {
  var deferred = Q.defer();
  setTimeout(function () { deferred.reject('bye'); }, 100);
  return deferred.promise;
}

function delayedOne() {
  var deferred = Q.defer();
  setTimeout(function () { deferred.resolve(1); }, 100);
  return deferred.promise;
}

function delayedOneFail() {
  var deferred = Q.defer();
  setTimeout(function () { deferred.reject(1); }, 100);
  return deferred.promise;
}

// regular custom code testing a successful promise
QUnit.test('test successful promise', 1, function (assert) {
  QUnit.stop();
  var promise = delayedHello();
  promise.then(function (actual) {
    assert.equal(actual, 'hello', 'promise resolved with "hello"');
  }).finally(QUnit.start);
});

// qunit-promises assertion
QUnit.test('promise will resolve', 1, function (assert) {
  assert.will(delayedHello());
});

QUnit.test('promise will resolve with message', 1, function (assert) {
  assert.will(delayedHello(), 'the promise is ok');
});

QUnit.test('promise will resolve with value', 1, function (assert) {
  assert.willEqual(delayedHello(), 'hello', 'returns "hello"');
});

QUnit.test('compare value using deep equality', 1, function (assert) {
  assert.willEqual(delayedOne(), 1, 'returns 1');
});

// regular code to test failed promise
QUnit.test('test failed promise', 1, function (assert) {
  QUnit.stop();
  var promise = delayedHelloFail();
  promise.then(function () {
    assert.ok(false, 'promise failed to fail!');
  }, function (actual) {
    assert.equal(actual, 'bye', 'promise failed');
  }).finally(QUnit.start);
});

QUnit.test('promise will reject', 1, function (assert) {
  assert.wont(delayedHelloFail(), 'promise fails');
});

QUnit.test('promise will reject with value', 1, function (assert) {
  assert.wontEqual(delayedHelloFail(), 'bye');
});

QUnit.test('promise will reject with value + message', 1, function (assert) {
  assert.wontEqual(delayedHelloFail(), 'bye', 'this is a failed promise');
});

QUnit.test('using deep equality', 1, function (assert) {
  assert.wontEqual(delayedOneFail(), 1, 'returns 1');
});

// advanced
QUnit.test('two resolved promises in sequence', 1, function (assert) {
  assert.willEqual(delayedHello().then(delayedHello), 'hello', 'promises chained');
});

QUnit.test('null promise throws an error', function (assert) {
  assert.throws(function () {
    assert.will(null, 'this should not resolve');
  }, 'null promise causes an error');
});

QUnit.test('invalid promise throws an error', function (assert) {
  assert.throws(function () {
    assert.will({}, 'this does not have .then');
  }, 'invalid promise object causes an error');
});

QUnit.test('promise without .always throws an error', function (assert) {
  assert.throws(function () {
    assert.will({
      then: function () {}
    }, 'this does not have .always');
  }, 'invalid promise object causes an error');
});

/* testing async module setup work around */
QUnit.module('async setup');

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

QUnit.test('manual async init', function (assert) {
  assert.willEqual(initCounter().then(obj.getCounter.bind(obj)), 1);
});

QUnit.test('returning value', function (assert) {
  assert.willEqual(initCounter().then(function () { return obj.counter; }), 2);
});

// var allong = require('allong.es');
// var once = allong.es.once;
var once = module.require('lodash').once;

QUnit.module('once upon a promise in setup', {
  setup: once(function () {
    console.log('initialize once');
    QUnit.stop();
    initCounter().finally(QUnit.start);
  })
});

QUnit.test('first test after setup', function (assert) {
  assert.equal(obj.counter, 3, 'initialized counter');
});

QUnit.test('second test after setup', function (assert) {
  assert.equal(obj.counter, 3, 'initialized counter');
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
