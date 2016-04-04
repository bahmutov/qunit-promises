function delayedHello() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){ resolve('hello'); }, 100);
  });
}

function delayedHelloFail() {
  return new Promise(function(resolve, reject){
    setTimeout(function () { reject('bye'); }, 100);
  });
}

function delayedNestedFail() {
  var result = {
    foo: {
      bar: 'baz'
    }
  };
  
  return new Promise(function(resolve, reject){
    setTimeout(function () { reject(result); }, 100);
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
  var result = {
    foo: {
      bar: true
    }
  };
  
  return new Promise(function(resolve, reject){
    setTimeout(function () { resolve(result); }, 100);
  });
}

// regular custom code testing a successful promise
QUnit.test('test successful promise', function (assert) {
  var done = assert.async();
  var promise = delayedHello();
  promise.then(function (actual) {
    assert.equal(actual, 'hello', 'promise resolved with "hello"');
    done();
  }, function (actual) {
    assert.equal(false, 'promise failed!');
    done();
  });
});

// qunit-promises assertion
QUnit.test('promise will resolve', function (assert) {
  assert.will(delayedHello());
});

QUnit.test('promise will resolve with message', function (assert) {
  assert.will(delayedHello(), 'the promise is ok');
});

QUnit.test('promise will resolve with value', function (assert) {
  assert.willEqual(delayedHello(), 'hello', 1, 'returns "hello"');
});

QUnit.test('compare value using deep equality', function (assert) {
  assert.willEqual(delayedOne(), 1, 'returns 1');
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
QUnit.test('test failed promise', function (assert) {
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

QUnit.test('promise will reject', function (assert) {
  assert.wont(delayedHelloFail(), 'promise fails');
});

QUnit.test('promise will reject with value', function (assert) {
  assert.wontEqual(delayedHelloFail(), 'bye');
});

QUnit.test('promise will reject with deep value', function (assert) {
  assert.wontDeepEqual(delayedHelloFail(), 'bye');
});

QUnit.test('deep equal for rejected promise', function (assert) {
  var expected = {
    foo: {
      bar: 'baz'
    }
  };
  assert.wontDeepEqual(delayedNestedFail(), expected);
});

QUnit.test('promise will reject with value + message', function (assert) {
  assert.wontEqual(delayedHelloFail(), 'bye', 'this is a failed promise');
});

QUnit.test('using deep equality', function (assert) {
  assert.wontEqual(delayedOneFail(), 1, 'returns 1');
});

// advanced
QUnit.test('two resolved promises in sequence', function (assert) {
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

