var mocha = require('gulp-mocha');
var assert = require('assert');
var types = require('./types');
var R = require('ramda');

var Maybe = require('../src/Maybe');

describe('Maybe', function() {
  var m = Maybe(1);

  it('is a Functor', function() {
    fTest = types.functor;
    assert.equal(true, fTest.iface(m));
    assert.equal(true, fTest.id(m));
    assert.equal(true, fTest.compose(m, R.multiply(2), R.add(3)));
  });

  it('is an Apply', function() {
    var aTest = types.apply;
    var app1 = Maybe(function(x) { return x * 10; });
    var app2 = Maybe(10);

    assert.equal(true, aTest.iface(app1));
  });

  it('is an Applicative', function() {
    var aTest = types.applicative;
    var app = Maybe(101);
    assert.equal(true, aTest.iface(app));
  });
});


