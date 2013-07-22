

var P = module.exports = (function() {
  var Promise = function() {
    this.callbacks = { success: [], error: [], progress: [] };
  };

  Promise.prototype.then = function(successFn, errorFn, progressFn) {
    if (successFn) this.callbacks.success.push(successFn);
    if (errorFn) this.callbacks.error.push(errorFn);
    if (progressFn) this.callbacks.progress.push(progressFn);

    return this;
  };

  ['success', 'error', 'progress'].forEach(function(state) {
    Promise.prototype['handle' + state.charAt(0).toUpperCase() + state.slice(1)] = function() {
      var args = arguments;

      this.callbacks[state].forEach(function(callback) {
        callback.apply(null, args);
      });
    };
  });

  var Deferred = function() {
    this.promise = new Promise();

    return this;
  };

  Deferred.prototype.resolve = function() {
    this.promise.handleSuccess.apply(this.promise, arguments);
  };

  Deferred.prototype.reject = function() {
    this.promise.handleError.apply(this.promise, arguments);
  };

  Deferred.prototype.notify = function() {
    this.promise.handleProgress.apply(this.promise, arguments);
  };

  return {
    defer: function() {
      return new Deferred();
    }
  };
})();



