

var assert = require('assert');
var should = require('should');
var P = require('../');


describe('P', function() {
  describe('defer', function() {
    it('should call the success handlers when resolved', function(done) {
      var deferred = P.defer();
      var chained = false;

      deferred.promise.then(function() { chained = true; });
      deferred.promise.then(function() {
        chained.should.equal(true);
        done();
      });

      deferred.resolve();
    });

    it('should pass the resolution arguments to each callback', function() {
      var deferred = P.defer();

      deferred.promise.then(function(a,b,c) {
        a.should.equal('a');
        b.should.equal(42);
        c.should.be.a('object');
        c.foo.should.equal('bar');
      });

      deferred.resolve('a', 42, { foo: 'bar' });
    });

    it('should call all error handlers when rejected', function(done) {
      var deferred = P.defer();
      var chained = false;

      deferred.promise.then(null, function() { chained = true; });
      deferred.promise.then(
        null,
        function() {
          chained.should.equal(true);
          done();
        });

      deferred.reject();
    });

    it('should call all progress handlers as progress is made', function(done) {
      var deferred = P.defer();
      var i, progress = 0;
      var chained = false;

      deferred.promise.
        then(null, null, function() { chained = true; }).
        then(
          function() {
            chained.should.equal(true);
            progress.should.equal(5);
            done();
          },
          null,
          function() { progress++; }
        );


      for (i = 0; i < 5; ++i) {
        deferred.notify();
      }

      deferred.resolve();
    });
  });
});

