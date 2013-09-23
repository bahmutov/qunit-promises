# qunit-promises

QUnit plugin that adds assertions to check promises quickly

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
    assert.willResolve(delayedHello(), 'hello', 'returns value "hello"');
});
```
## API

```
assert.willResolve(fn, [expected value], [message])

- fn: function that returns a promise that should be resolved
- expected value (optional): to compare with the value resolved
- message (optional): to push in the log
```

```javascript
assert.willReject(fn, [expected value], [message])

- fn: function that returns a promise that should be rejected (failed)
- expected value (optional): to compare with the value rejected
- message (optional): to push in the log
```

## Small print

Author: Gleb Bahmutov &copy; 2013

License: MIT - do anything with the code, but don't blame me if it does not work.

[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov