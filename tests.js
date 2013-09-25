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

// regular custom code testing a successful promise
QUnit.asyncTest('test successful promise', 1, function (assert) {
  var promise = delayedHello();
  promise.then(function (actual) {
    assert.equal(actual, 'hello', 'promise resolved with "hello"');
  }).always(QUnit.start);
});

// qunit-promises assertion
QUnit.asyncTest('promise will resolve', 1, function (assert) {
  assert.will(delayedHello());
});

QUnit.asyncTest('promise will resolve with message', 1, function (assert) {
  assert.will(delayedHello(), 'the promise is ok');
});

QUnit.asyncTest('promise will resolve with value', 1, function (assert) {
  assert.willEqual(delayedHello(), 'hello', 'returns "hello"');
});

QUnit.asyncTest('compare value using deep equality', 1, function (assert) {
  assert.willEqual(delayedOne(), 1, 'returns 1');
});

// regular code to test failed promise
QUnit.asyncTest('test failed promise', 1, function (assert) {
  var promise = delayedHelloFail();
  promise.then(function () {
    assert.ok(false, 'promise failed to fail!');
  }, function (actual) {
    assert.equal(actual, 'bye', 'promise failed');
  }).always(QUnit.start);
});

QUnit.asyncTest('promise will reject', 1, function (assert) {
  assert.wont(delayedHelloFail(), 'promise fails');
});

QUnit.asyncTest('promise will reject with value', 1, function (assert) {
  assert.wontEqual(delayedHelloFail(), 'bye');
});

QUnit.asyncTest('promise will reject with value + message', 1, function (assert) {
  assert.wontEqual(delayedHelloFail(), 'bye', 'this is a failed promise');
});

QUnit.asyncTest('using deep equality', 1, function (assert) {
  assert.wontEqual(delayedOneFail(), 1, 'returns 1');
});

// advanced
QUnit.asyncTest('two resolved promises in sequence', 1, function (assert) {
  assert.willEqual(delayedHello().then(delayedHello), 'hello', 'promises chained');
});