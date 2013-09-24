# qunit-promises

QUnit plugin that adds assertions to check promises, availabe
as **qunit-promises** on [bower](http://sindresorhus.com/bower-components/).
[Test page](http://glebbahmutov.com/qunit-promises/)

[![Build status][ci-image]][ci-url]
[![dependencies][dependencies-image]][dependencies-url]
[![endorse][endorse-image]][endorse-url]

## Problem

Compared with other testing frameworks designed to deal with async code
(see [vows](http://vowsjs.org/) for example),
there is way too much boilerplate code to check promises when using
[QUnit](http://qunitjs.com/). For example, here is an asynchronous unit test
that checks that a promise resolves successfully with a certain value:

```javascript
// function delayedHello returns a promise

QUnit.asyncTest("test successful promise", 1, function (assert) {
    var promise = delayedHello();
    promise.then(function (actual) {
        assert.equal(actual, 'hello', 'promise resolved with "hello"');
    }).always(start);
});
```
## Promises plugin

**qunit-promises** plugin adds a pair of methods to QUnit's **assert** object,
making it very convenient to:

* assert that the promise either resolves or is rejected
* compare the final value to expected
* restart the testing queue

Same test as above, rewritten using new assertion:

```javascript
QUnit.asyncTest("test successful promise", 1, function (assert) {
    assert.willEqual(delayedHello(), 'hello', 'returns value "hello"');
});
```
## API

### Successful promises

```
assert.will(fn, [message])

- fn: function that returns a promise that should be resolved
- message (optional): to push in the log
```

```
assert.willEqual(fn, expected, [message])

- fn: function that returns a promise that should be resolved
- expected: to compare with the resolved value using ==
- message (optional): to push in the log
```

```
assert.willDeepEqual(fn, expected, [message])

- fn: function that returns a promise that should be resolved
- expected value: to compare with the resolved value using QUnit.equiv
- message (optional): to push in the log
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

Include _qunit-promises.js_ after _qunit.js_, new methods are
added to the **assert** object.

```html
<script src="http://code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script src="qunit-promises.js"></script>
```
For full example, see the [test page](http://glebbahmutov.com/qunit-promises/).


## Small print

Author: Gleb Bahmutov &copy; 2013

License: MIT - do anything with the code, but don't blame me if it does not work.

[ci-image]: https://travis-ci.org/bahmutov/qunit-promises.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/qunit-promises
[dependencies-image]: https://david-dm.org/bahmutov/qunit-promises.png
[dependencies-url]: https://david-dm.org/bahmutov/qunit-promises
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov