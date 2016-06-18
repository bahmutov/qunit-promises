# qunit-promises

QUnit plugin that adds assertions to check promises.

[Test page](http://glebbahmutov.com/qunit-promises/)

[![NPM][qunit-promises-icon]][qunit-promises-url]

[![Build status][ci-image]][ci-url]
[![Coverage Status][qunit-promises-coverage-image]][qunit-promises-coverage-url]
[![Code Climate][qunit-promises-code-climage-image]][qunit-promises-code-climage-url]
[![Codacy][qunit-promises-codacy-image]][qunit-promises-codacy-url]
[![dependencies][dependencies-image]][dependencies-url]

[![semantic-release][semantic-image] ][semantic-url]

Available through [bower](http://sindresorhus.com/bower-components/) and
[npm](https://npmjs.org/package/qunit-promises) as **qunit-promises**.
Included in the list of [QUnit plugins](http://qunitjs.com/plugins/).

Compatible with jQuery's and Q's promises.

## Problem

Compared with other testing frameworks designed to deal with async code
(see [vows](http://vowsjs.org/) for example),
there is way too much boilerplate code to check promises when using
[QUnit](http://qunitjs.com/). For example, here is an asynchronous unit test
that checks that a promise resolves successfully with a certain value:

```javascript
// function delayedHello returns a promise

QUnit.test("test successful promise", 1, function (assert) {
    QUnit.stop();
    var promise = delayedHello();
    promise.then(function (actual) {
        assert.equal(actual, 'hello', 'promise resolved with "hello"');
    }).always(QUnit.start);
});
```
## Promises plugin

**qunit-promises** plugin adds a pair of methods to QUnit's
**assert** object. It does these things for you:

* **stops** current test queue
	* use QUnit.test(), not QUnit.asyncTest()
	* do not call QUnit.stop()
* asserts that the promise either resolves or is rejected
* compares the final value to expected
* **restarts** the testing queue
	* so you don't have to call `QUnit.start()`

Same test as above, rewritten using new assertion:

```javascript
QUnit.test("test successful promise", 1, function (assert) {
    assert.willEqual(delayedHello(), 'hello', 'returns value "hello"');
});
```
## API

### Successful promises

```
assert.will(fn, [expectation [, message]])
assert.will(fn, [message])

- fn: function that returns a promise that should be resolved
- expectation: function that will evaluate received result and
  return true / false if it's correct or wrong
- message (optional): to push in the log
```

```
assert.willEqual(fn, expected, [message], [actualTransform])

- fn: function that returns a promise that should be resolved
- expected: to compare with the resolved value using ==
- message (optional): to push in the log
- actualTransform (optional): function that will transform promise's
  result for comparison with "expected", e.g. extract a member from object
```

```
assert.willDeepEqual(fn, expected, [message], [actualTransform])

- fn: function that returns a promise that should be resolved
- expected value: to compare with the resolved value using QUnit.equiv
- message (optional): to push in the log
- actualTransform (optional): function that will transform promise's
  result for comparison with "expected", e.g. extract a member from object
```

### Rejected promises

```
assert.wont(fn, [message])

- fn: function that returns a promise that should be rejected (failed)
- message (optional): to push in the log
```

```
assert.wontEqual(fn, expected, [message])

- fn: function that returns a promise that should be rejected (failed)
- expected: to compare with the rejected value using ==
- message (optional): to push in the log
```

```
assert.wontDeepEqual(fn, expected, [message])

- fn: function that returns a promise that should be rejected (failed)
- expected: to compare with the rejected value using QUnit.equiv
- message (optional): to push in the log
```

## Install

### Browser

* `bower install qunit-promises`
* Include _qunit-promises.js_ after _qunit.js_, new methods are
added to the **assert** object.

```html
<script src="http://code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script src="qunit-promises.js"></script>
<script src="tests.js"></script>
```
For full example, see the [test page](http://glebbahmutov.com/qunit-promises/).

### Node

The **qunit-promises** is compatible with [node-qunit](https://github.com/kof/node-qunit) and its wrapper [grunt-node-qunit](https://npmjs.org/package/grunt-node-qunit).

Also compatible with [gt](https://github.com/bahmutov/gt), which provides
code coverage.

* npm install qunit-promises --save
* preload _qunit-promises.js_ as a dependency

```sh
// via node-qunit
qunit -c test/node-tests.js -t test/node-tests.js -d qunit-promises.js

// via gt
gt qunit-promises.js test/node-tests.js
```

## Advanced

*qunit-promises* simplify the tests when there is a single promise to be evaluated.
In other cases, you might to combine promises (chain, or evaluate in parallel)
yourself before calling *assert.will...* as the last step.

```javascript
assert.will(promiseOne().then(promiseTwo), 'one, then two succeeded');
```

## Small print

Author: Gleb Bahmutov &copy; 2013

License: MIT - do anything with the code, but don't blame me if it does not work.

[qunit-promises-icon]: https://nodei.co/npm/qunit-promises.png?downloads=true
[qunit-promises-url]: https://npmjs.org/package/qunit-promises
[ci-image]: https://travis-ci.org/bahmutov/qunit-promises.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/qunit-promises
[qunit-promises-coverage-image]: https://coveralls.io/repos/bahmutov/qunit-promises/badge.png
[qunit-promises-coverage-url]: https://coveralls.io/r/bahmutov/qunit-promises
[qunit-promises-code-climage-image]: https://codeclimate.com/github/bahmutov/qunit-promises/badges/gpa.svg
[qunit-promises-code-climage-url]: https://codeclimate.com/github/bahmutov/qunit-promises
[qunit-promises-codacy-image]: https://www.codacy.com/project/badge/b9027bffd24b4fb081eeb295fe7ce007
[qunit-promises-codacy-url]: https://www.codacy.com/public/bahmutov/qunit-promises.git
[dependencies-image]: https://david-dm.org/bahmutov/qunit-promises.png
[dependencies-url]: https://david-dm.org/bahmutov/qunit-promises
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
