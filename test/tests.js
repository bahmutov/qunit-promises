function delayedHello() {
  var deferred = new $.Deferred();
  setTimeout(function () { deferred.resolve('hello'); }, 100);
  return deferred.promise();
}

function delayedHelloFail() {
  var deferred = new $.Deferred();
  setTimeout(function () { deferred.reject('bye'); }, 100);
  return deferred.promise();
}

function delayedNestedFail() {
  var deferred = new $.Deferred();
  var result = {
    foo: {
      bar: 'baz'
    }
  };
  setTimeout(function () { deferred.reject(result); }, 100);
  return deferred.promise();
}

function delayedOne() {
  var deferred = new $.Deferred();
  setTimeout(function () { deferred.resolve(1); }, 100);
  return deferred.promise();
}

function delayedOneFail() {
  var deferred = new $.Deferred();
  setTimeout(function () { deferred.reject(1); }, 100);
  return deferred.promise();
}

function delayedFooBar() {
  var deferred = new $.Deferred();
  var result = {
    foo: {
      bar: true
    }
  };
  setTimeout(function () { deferred.resolve(result); }, 100);
  return deferred.promise();
}

// regular custom code testing a successful promise
QUnit.test('test successful promise', 1, function (assert) {
  QUnit.stop();
  var promise = delayedHello();
  promise.then(function (actual) {
    assert.equal(actual, 'hello', 'promise resolved with "hello"');
  }).always(QUnit.start);
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

QUnit.test('promise will resolve with value using deepEqual', 1, function (assert) {
  var expected = {
    foo: {
      bar: true
    }
  };
  assert.willDeepEqual(delayedFooBar(), expected, 'returns equal object');
});

// regular code to test failed promise
QUnit.test('test failed promise', 1, function (assert) {
  QUnit.stop();
  var promise = delayedHelloFail();
  promise.then(function () {
    assert.ok(false, 'promise failed to fail!');
  }, function (actual) {
    assert.equal(actual, 'bye', 'promise failed');
  }).always(QUnit.start);
});

QUnit.test('promise will reject', 1, function (assert) {
  assert.wont(delayedHelloFail(), 'promise fails');
});

QUnit.test('promise will reject with value', 1, function (assert) {
  assert.wontEqual(delayedHelloFail(), 'bye');
});

QUnit.test('promise will reject with deep value', 1, function (assert) {
  assert.wontDeepEqual(delayedHelloFail(), 'bye');
});

QUnit.test('deep equal for rejected promise', 1, function (assert) {
  var expected = {
    foo: {
      bar: 'baz'
    }
  };
  assert.wontDeepEqual(delayedNestedFail(), expected);
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
