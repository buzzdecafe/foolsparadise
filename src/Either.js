var util = require('./util');

function Either(left, right) {
  this.left = left;
  this.right = right;
}

Either.prototype.map = function(f) {
  return (isNil(this.right)) ? this : new Either(this.left, f(this.right));
};

module.exports = function (left, right) {
  return new Either(left, right);
};



