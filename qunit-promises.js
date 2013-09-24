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
    }, function (actual) {
      QUnit.push(false, actual, expected, 'promise rejected (but should have been resolved)');
    }).always(QUnit.start);
  },

  willReject: function (promise, expected, message) {
    if (!promise) {
      QUnit.push(false, undefined, 'a promise', 'expected a promise that would reject');
      QUnit.start();
      return;
    }

    promise.then(function (actual) {
      QUnit.push(false, actual, expected, 'promise resolved (but should have been rejected)');
    }, function (actual) {
      if ('undefined' === typeof expected) {
        QUnit.push(true, true, true, message);
      } else {
        QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
      }
    }).always(QUnit.start);
  }
});