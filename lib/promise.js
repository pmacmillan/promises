

var P = module.exports = (function() {
  var Promise = function() {
    this.callbacks = {
      success: [],
      error: [],
      progress: []
    };
  };

  Promise.prototype.then = function(successFn, errorFn, progressFn) {
    if (successFn) this.callbacks.success.push(successFn);
    if (errorFn) this.callbacks.error.push(errorFn);
    if (progressFn) this.callbacks.progress.push(progressFn);

    return this;
  };

  Promise.prototype.handleSuccess = function(args) {
    this.callbacks.success.forEach(function(callback) {
      callback.apply(null, args);
    });
  };

  Promise.prototype.handleError = function(args) {
    this.callbacks.error.forEach(function(callback) {
      callback.apply(null, args);
    });
  };

  Promise.prototype.handleProgress = function(args) {
    this.callbacks.progress.forEach(function(callback) {
      callback.apply(null, args);
    });
  };

  var Deferred = function() {
    this.promise = new Promise();

    return this;
  };

  Deferred.prototype.resolve = function() {
    this.promise.handleSuccess(arguments);
  };

  Deferred.prototype.reject = function() {
    this.promise.handleError(arguments);
  };

  Deferred.prototype.notify = function() {
    this.promise.handleProgress(arguments);
  };

  return {
    defer: function() {
      return new Deferred();
    }
  };

})();






