var compose = require("ramda").compose;

function IO(fn) {
  if (!(this instanceof IO)) {
    return new IO(fn);
  }
  this.fn = fn;
}

// `f` must return an IO
IO.prototype.chain = function(f) {
  var io = this;
  return new IO(function() { 
    return f(io.fn()).fn(); 
  });
};

IO.prototype.map = function(f) {
  var io = this;
  return new IO(compose(f, io.fn));
};

IO.prototype.ap = function(value) {
  var io = this;
  return value.map(io.fn);
};

IO.runIO = function(io) {
  return io.runIO.apply(io, [].slice.call(arguments, 1));
};

IO.prototype.runIO = function() {
  console.log(arguments);
  return this.fn.apply(this, arguments);
};

IO.prototype.equals = function(that) {
  return this.fn() === that.fn();
};

IO.prototype.of = function(value) {
  return new IO(function() {
    return value;
  });
};

IO.of = IO.prototype.of;

module.exports = IO;



