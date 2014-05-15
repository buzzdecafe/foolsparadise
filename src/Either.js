var isNil = require('./util').isNil;

function Either(left, right) {
  this.left = left;
  this.right = right;
}

Either.of = function(left, right) {
  return new Either(left, right);
};

Either.prototype.map = function(f) {
  return (isNil(this.right)) ? this : new Either(this.left, f(this.right));
};

Either.prototype.of = Either.of;

module.exports = Either.of;



