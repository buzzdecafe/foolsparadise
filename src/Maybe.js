var undef = void 0;

function Maybe(x) {
  this.value = x;
}

Maybe.prototype = Object.create(Functor.prototype);

Maybe.prototype.map = function(f) {
  if (this.value !== null || this.value !== undef) {
    return new Maybe(f(this.value));
  }
};

module.exports = function(x) {
  return new Maybe(x);
}
