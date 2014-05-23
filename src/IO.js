var compose = require("ramda").compose;

function IO(fn) {
  this.fn = fn;
}

IO.of = function(value) {
  return new IO(function() {
    return value;
  });
};

IO.prototype.map = function(f) {
  var io = this;
  return new IO(compose(f, io.fn));
};

IO.run = function(io) {
  return io.fn.apply(this, [].slice.call(arguments, 1));
};

IO.prototype.of = IO.of;

module.exports = IO;



