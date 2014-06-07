var mocha = require('gulp-mocha');
var assert = require('assert');
var types = require('./types');
var R = require('ramda');

var IO = require('../src/IO');

describe('IO', function() {
  var f1 = function(x) { console.log("IO 1"); return "1 "; };
  var f2 = function(x) { console.log("IO 2"); return x + "2 "; };
  var f3 = function(x) { console.log("IO 3"); return x + "3 "; };
  var i1 = IO(f1);
  var i2 = IO(f2);
  var i3 = IO(f3);

  it('is a Functor', function() {
    var fTest = types.functor;
    assert.equal(true, fTest.iface(i1));
    assert.equal(true, fTest.id(i1));
    assert.equal(true, fTest.compose(i1, f2, f3));
  });

  it('is an Apply', function() {
    var aTest = types.apply;

    assert.equal(true, aTest.iface(i1));
    assert.equal(true, aTest.compose(i1, i2, i3));
  });

  it('is an Applicative', function() {
    var aTest = types.applicative;
    var app1 = IO(101);
    var app2 = IO(-123);
    var appF = IO(R.multiply(3));

    assert.equal(true, aTest.iface(app1));
    assert.equal(true, aTest.id(app1, app2));
    assert.equal(true, aTest.id(app1, maybeNull));
    assert.equal(true, aTest.homomorphic(app1, R.add(3), 46));
    assert.equal(true, aTest.interchange(app2, appF, 17));
  });

  it('is a Chain', function() {
    var cTest = types.chain;
    var f1 = I;
    var f2 = I;
    var fNull = function() {return IO(null);};
    assert.equal(true, cTest.iface(m));
    assert.equal(true, cTest.associative(m, f1, f2));
  });

  it('is a Monad', function() {
    var mTest = types.monad;
    assert.equal(true, mTest.iface(m));
  });

});


