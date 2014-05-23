var isNil = require('./util').isNil;

function Either(left, right) {
  if (!(this instanceof Either)) {
    return new Either(left, right);
  }
  this.left = left;
  this.right = right;
}

Either.of = function(value) {
  return new Either(undefined, value);
};

Either.prototype.map = function(f) {
  return (isNil(this.right)) ? this : new Either(this.left, f(this.right));
};

Either.prototype.of = Either.of;

module.exports = Either;



