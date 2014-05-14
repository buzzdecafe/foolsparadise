var util = require('./util');

function Either(left, right) {
  this.left = left;
  this.right = right;
}

Either.prototype.map = function(f) {
  return (isNil(this.right)) ? this : new Either(this.left, f(this.right));
};

Either.prototype.of = function(x) {
  return new Either(left, right);
};

module.exports = Either.prototype.of;



