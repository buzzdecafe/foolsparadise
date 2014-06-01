var mocha = require('gulp-mocha');
var assert = require('assert');
var types = require('./types');
var R = require('ramda');

var Maybe = require('../src/Maybe');

describe('Maybe', function() {
  var m = Maybe(1);

  it('is a Functor', function() {
    assert.equal(true, types.isFunctor(m, R.multiply(2), R.add(1)));
  });

  it('is an Apply', function() {
    var app1 = Maybe(function(x) { return x * 10; });
    var app2 = Maybe(10);
    assert.equal(true, types.isApply(app1, app2));
  });

});


