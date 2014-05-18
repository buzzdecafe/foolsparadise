var compose = require("ramda").compose;

function IO(run) {
  this.run = run;
}

IO.of = function(fn) {
  return new IO(fn);
};

IO.prototype.map = function(f) {
  return new IO(f(this.run)).run();
};

IO.run = function(io) {
  return io.run.apply(this, [].slice.call(arguments, 1));
};

IO.prototype.of = IO.of;

module.exports = IO;



