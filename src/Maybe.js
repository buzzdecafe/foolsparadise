var isNil = require('./util').isNil;

function Maybe(x) {
  this.value = x;
}

Maybe.prototype.map = function(f) {
  return isNil(this.value) ? this : new Maybe(f(this.value));
};

Maybe.prototype.of = function(x) {
  return new Maybe(x);
};

module.exports = Maybe.prototype.of;


