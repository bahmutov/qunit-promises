var Q = require('q');

QUnit.module('a test module');

QUnit.test('first test', function (assert) {
	assert.ok(true, 'true is ok');
});

QUnit.test('second test', 1, function (assert) {
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