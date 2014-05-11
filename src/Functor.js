var Identity = require('Identity');

function Functor(x) {
  this.value = x;
}

Functor.prototype.map = function(f) {
  return new Functor(f(this.value));
};



module.exports = function(x) {
  return new Functor(x);
}
