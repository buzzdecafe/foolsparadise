var isNil = require('../util').isNil;

function Maybe(x) {
  if (!(this instanceof Maybe)) {
    return new Maybe(x);
  }
  this.value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
};

Maybe.prototype.map = function(f) {
  return isNil(this.value) ? this : new Maybe(f(this.value));
};

Maybe.prototype.of = Maybe.of;

module.exports = Maybe;


