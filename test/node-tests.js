// run from command line
// qunit -c ../qunit-promises.js -t node-tests.js
// gt qunit-promises.js test/node-tests.js
/*global module:false*/
QUnit.module('a test module');

QUnit.test('first test', function (assert) {
	assert.ok(true, 'true is ok');
});

QUnit.test('second test', 1, function (assert) {
  /* jshint -W109 */
	assert.equal(1, +"1", '1 == "1"');
});

QUnit.test('qunit-promises is present', 1, function (assert) {
	assert.equal(typeof assert.will, 'function', 'assert.will is there');
});

function delayedFoo() {
  return new Promise(function(resolve, reject) {
	  setTimeout(function () { resolve('foo'); }, 100);
	});
}

QUnit.test('example promise test', function (assert) {
	assert.will(delayedFoo(), 'promise is resolved');
});

QUnit.test('example promise test with value', function (assert) {
  assert.willEqual(delayedFoo(), 'foo', 'promise is resolved with correct value');
});

function delayedHello() {
  return new Promise(function(resolve, reject){
    setTimeout(function () { resolve('hello'); }, 100);
  });
}

function delayedHelloFail() {
  return new Promise(function(resolve, reject){
    setTimeout(function () { reject('bye'); }, 100);
  });
}

function delayedOne() {
  return new Promise(function(resolve, reject){
    setTimeout(function () { resolve(1); }, 100);
  });
}

function delayedOneFail() {
  return new Promise(function(resolve, reject){
    setTimeout(function () { reject(1); }, 100);
  });
}

function delayedFooBar() {
  return new Promise(function(resolve, reject){
    var result = {
      foo: {
        bar: true
      }
    };
    setTimeout(function () { resolve(result); }, 100);
  });
}

// regular custom code testing a successful promise
QUnit.test('test successful promise', 1, function (assert) {
  var done = assert.async();
  var promise = delayedHello();
  promise.then(function (actual) {
    assert.equal(actual, 'hello', 'promise resolved with "hello"');
    done();
  });
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

QUnit.test('compare value using equality', 1, function (assert) {
  assert.willEqual(delayedOne(), 1, 'returns 1');
});

QUnit.test('QUnit.equiv', function (assert) {
  assert.equal(typeof QUnit.equiv, 'function', 'QUnit.equiv is a function');
});

QUnit.test('promise will resolve with value using deepEqual', function (assert) {
  var expected = {
    foo: {
      bar: true
    }
  };
  assert.willDeepEqual(delayedFooBar(), expected, 'returns equal object');
});

// regular code to test failed promise
QUnit.test('test failed promise', 1, function (assert) {
  var done = assert.async();
  var promise = delayedHelloFail();
  promise.then(function () {
    assert.ok(false, 'promise failed to fail!');
    done();
  }, function (actual) {
    assert.equal(actual, 'bye', 'promise failed');
    done();
  });
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

/* testing async module setup work around */
QUnit.module('async setup');

var obj = {
  counter: 0,
  getCounter: function () {
    return this.counter;
  }
};

function initCounter() {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      obj.counter += 1;
      resolve();
    }, 1000);
  });
}

QUnit.test('manual async init', function (assert) {
  assert.willEqual(initCounter().then(obj.getCounter.bind(obj)), 1);
});

QUnit.test('returning value', function (assert) {
  assert.willEqual(initCounter().then(function () { return obj.counter; }), 2);
});
