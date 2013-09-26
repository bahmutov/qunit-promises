(function (QUnit) {
  function verifyPromise(promise) {
    if (!promise) {
      throw new Error('expected a promise object');
    }
    if (typeof promise.then !== 'function') {
      throw new Error('promise object does not have .then function');
    }
    if (typeof promise.always !== 'function') {
      throw new Error('promise object does not have .always function');
    }
  }

  QUnit.extend(QUnit.assert, {
    // resolved promises
    will: function (promise, message) {
      verifyPromise(promise);

      QUnit.stop();
      promise.then(function () {
        QUnit.push(true, undefined, undefined, message);
      }, function () {
        QUnit.push(false, undefined, undefined, 'promise rejected (but should have been resolved)');
      }).always(QUnit.start);
    },

    willEqual: function (promise, expected, message) {
      verifyPromise(promise);

      QUnit.stop();
      promise.then(function (actual) {
        QUnit.push(actual == expected, actual, expected, message);
      }, function (actual) {
        QUnit.push(false, actual, expected, 'promise rejected (but should have been resolved)');
      }).always(QUnit.start);
    },

    willDeepEqual: function (promise, expected, message) {
      verifyPromise(promise);

      QUnit.stop();
      promise.then(function (actual) {
        QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
      }, function (actual) {
        QUnit.push(false, actual, expected, 'promise rejected (but should have been resolved)');
      }).always(QUnit.start);
    },

    // rejected promises
    wont: function (promise, message) {
      verifyPromise(promise);

      QUnit.stop();
      promise.then(function () {
        QUnit.push(false, undefined, undefined, 'promise resolved (but should have been rejected)');
      }, function () {
        QUnit.push(true, undefined, undefined, message);
      }).always(QUnit.start);
    },

    wontEqual: function (promise, expected, message) {
      verifyPromise(promise);

      QUnit.stop();
      promise.then(function (actual) {
        QUnit.push(false, actual, expected, 'promise resolved (but should have been rejected)');
      }, function (actual) {
        QUnit.push(actual == expected, actual, expected, message);
      }).always(QUnit.start);
    }
  });
}(QUnit));