var compose = require("ramda").compose;

function IO(run) {
  this.run = run;
}

IO.of = function(value) {
  return new IO(function() {
    return value;
  });
};

IO.prototype.map = function(f) {
  var io = this;
  return new IO(compose(f, io.run));
};

IO.run = function(io) {
  return io.run.apply(this, [].slice.call(arguments, 1));
};

IO.prototype.of = IO.of;

module.exports = IO;



