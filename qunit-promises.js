<<<<<<< HEAD
QUnit.extend(QUnit.assert, {
  willResolve: function (promise, expected, message) {
    if (!promise) {
      QUnit.push(false, undefined, 'a promise', 'expected a promise that would resolve');
      QUnit.start();
      return;
    }

    promise.then(function (actual) {
      if ('undefined' === typeof expected) {
        QUnit.push(true, true, true, message);
      } else {
        QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
      }
    }, function () {
      QUnit.push(false, actual, expected, 'promise rejected (but should have been resolved)');
    }).always(start);
  },

  willReject: function (promise, expected, message) {
    if (!promise) {
      QUnit.push(false, undefined, 'a promise', 'expected a promise that would reject');
      QUnit.start();
      return;
    }

    promise.then(function () {
      QUnit.push(false, actual, expected, 'promise resolved (but should have been rejected)');
    }, function (actual) {
      if ('undefined' === typeof expected) {
        QUnit.push(true, true, true, message);
      } else {
        QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
      }
    }).always(start);
=======
function isValid(promise) {
  if (!promise) {
    QUnit.push(false, undefined, 'a promise', 'expected a promise that would resolve');
    QUnit.start();
    return false;
  } else {
    return true;
  }
}

QUnit.extend(QUnit.assert, {
  // resolved promises
  will: function (promise, message) {
    if (!isValid(promise)) { return; }

    promise.then(function () {
      QUnit.push(true, undefined, undefined, message);
    }, function () {
      QUnit.push(false, undefined, undefined, 'promise rejected (but should have been resolved)');
    }).always(QUnit.start);
  },

  willEqual: function (promise, expected, message) {
    if (!isValid(promise)) { return; }

    promise.then(function (actual) {
      QUnit.push(actual == expected, actual, expected, message);
    }, function (actual) {
      QUnit.push(false, actual, expected, 'promise rejected (but should have been resolved)');
    }).always(QUnit.start);
  },

  willDeepEqual: function (promise, expected, message) {
    if (!isValid(promise)) { return; }

    promise.then(function (actual) {
      QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
    }, function (actual) {
      QUnit.push(false, actual, expected, 'promise rejected (but should have been resolved)');
    }).always(QUnit.start);
  },

  // rejected promises
  wont: function (promise, message) {
    if (!isValid(promise)) { return; }

    promise.then(function () {
      QUnit.push(false, undefined, undefined, 'promise resolved (but should have been rejected)');
    }, function () {
      QUnit.push(true, undefined, undefined, message);
    }).always(QUnit.start);
  },

  wontEqual: function (promise, expected, message) {
    if (!isValid(promise)) { return; }

    promise.then(function (actual) {
      QUnit.push(false, actual, expected, 'promise resolved (but should have been rejected)');
    }, function (actual) {
      QUnit.push(actual == expected, actual, expected, message);
    }).always(QUnit.start);
>>>>>>> master
  }
});