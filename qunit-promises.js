QUnit.extend(QUnit.assert, {
  willResolve: function (promise) {
    if (!promise) {
      QUnit.push(false, undefined, 'a promise', 'expected a promise that would resolve');
      QUnit.start();
      return;
    }

    promise.then(function () {
      QUnit.push(true, true, true, 'promise resolved');
    }, function () {
      QUnit.push(false, true, true, 'promise rejected (but should have been resolved)');
    }).always(start);
  },

  willReject: function (promise) {
    if (!promise) {
      QUnit.push(false, undefined, 'a promise', 'expected a promise that would reject');
      QUnit.start();
      return;
    }

    promise.then(function () {
      QUnit.push(false, true, true, 'promise resolved (but should have been rejected)');
    }, function () {
      QUnit.push(true, true, true, 'promise rejected');
    }).always(start);
  }
});