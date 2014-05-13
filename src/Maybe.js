
function Maybe(x) {
  this.value = x;
}

Maybe.prototype.map = function(f) {
  return isNil(this.value) ? this : new Maybe(f(this.value));
};

module.exports = function(x) {
  return new Maybe(x);
};


