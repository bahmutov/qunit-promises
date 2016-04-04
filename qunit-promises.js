(function (QUnit) {
  // E6 promises have .then and .catch functions
  function verifyPromise(promise) {
    if (!promise) {
      throw new Error('expected a promise object');
    }
    if (typeof promise.then !== 'function') {
      throw new Error('promise object does not have .then function');
    }
    if (typeof promise.catch !== 'function') {
      throw new Error('promise object does not have .catch function');
    }
    return;
  }

  QUnit.extend(QUnit.assert, {
    // resolved promises
    will: function (promise, message) {
      verifyPromise(promise);

      var done = this.async();
      promise.then(function () {
        this.push(true, undefined, undefined, message);
        done();
      }.bind(this), function () {
        this.push(false, undefined, undefined, 'promise rejected (but should have been resolved)');
        done();
      }.bind(this));
    },

    willEqual: function (promise, expected, message) {
      verifyPromise(promise);

      var done = this.async();
      promise.then(function (actual) {
        QUnit.push(actual == expected, actual, expected, message);
        done();
      }.bind(this), function (actual) {
        QUnit.push(false, actual, expected, 'promise rejected (but should have been resolved)');
        done();
      }.bind(this));
    },

    willDeepEqual: function (promise, expected, message) {
      verifyPromise(promise);

      var done = this.async();
      promise.then(function (actual) {
        if (typeof QUnit.equiv !== 'function') {
          throw new Error('Missing QUnit.equiv function');
        }
        QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
        done();
      }.bind(this), function (actual) {
        QUnit.push(false, actual, expected, 'promise rejected (but should have been resolved)');
        done();
      }.bind(this));
    },

    // rejected promises
    wont: function (promise, message) {
      verifyPromise(promise);

      var done = this.async();
      promise.then(function () {
        QUnit.push(false, undefined, undefined, 'promise resolved (but should have been rejected)');
        done();
      }.bind(this), function () {
        QUnit.push(true, undefined, undefined, message);
        done();
      }.bind(this));
    },

    wontEqual: function (promise, expected, message) {
      verifyPromise(promise);

      var done = this.async();
      promise.then(function (actual) {
        QUnit.push(false, actual, expected, 'promise resolved (but should have been rejected)');
        done();
      }.bind(this), function (actual) {
        QUnit.push(actual == expected, actual, expected, message);
        done();
      }.bind(this));
    },

    wontDeepEqual: function (promise, expected, message) {
      verifyPromise(promise);

      var done = this.async();
      promise.then(function (actual) {
        QUnit.push(false, actual, expected, 'promise resolved (but should have been rejected)');
        done();
      }.bind(this), function (actual) {
        QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
        done();
      }.bind(this));
    }
  });
}(QUnit));
