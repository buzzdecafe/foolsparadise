var R = require('ramda');
var Semigroup = require("Semigroup");
var Monoid = require("Monoid");
var Functor = require("Functor");
var Apply = require("Apply");
var Applicative = require("Applicative");
var Chain = require("Chain");
var Monad = require("Monad");

describe("Semigroup", function() {

  var sg = Semigroup();
  it("has the correct interface", function() {
    expect(typeof sg.concat).toBe('function');    
  });

  describe("concat", function() {
    it("takes a value of the same Semigroup, and must return a value of the same Semigroup.", function() {
      var out = sg.concat(Semigroup());
      expect(out.concat).toBeDefined();
    });
  });
});

describe("Monoid", function() {

  it("has the correct interface", function() {

  });

});

describe("Functor", function() {

  it("has the correct interface", function() {

  });

});

describe("Apply", function() {

  it("has the correct interface", function() {

  });

});

describe("Applicative", function() {

  it("has the correct interface", function() {

  });

});

describe("Chain", function() {

  it("has the correct interface", function() {

  });

});

describe("Monad", function() {

  it("has the correct interface", function() {

  });

});





