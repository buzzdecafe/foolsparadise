var mocha = require('gulp-mocha');
var assert = require('assert');
var types = require('./types');
var R = require('ramda');

var Maybe = require('../src/Maybe');

describe('Maybe', function() {
  var m = Maybe(1);
  it('is a functor', function() {
    assert.equal(true, types.isFunctor(m, R.multiply(2), R.add(1)));
  });

});


