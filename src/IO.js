var compose = require("ramda").compose;

function IO(value, run) {
  this.value = value;
  this.sideEffect = run;
}

IO.of = function(value, run) {
  return new IO(value, run);
};

IO.prototype.map = function(f) {
  return new IO(this.value, compose(f, this.sideEffect));
};

IO.prototype.run = function() {
  return this.sideEffect(this.value);
};

IO.prototype.of = IO.of;

module.exports = IO.of;



