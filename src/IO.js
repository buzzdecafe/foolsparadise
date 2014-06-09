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

IO.prototype.ap = function(app) {
  return new IO(function() { this.fn(app.value); });
};

IO.runIO = function(io) {
  return io.runIO.apply(io, arguments);
};

IO.prototype.runIO = function() {
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

IO.of = function(f) {
  if (typeof f !== 'function') {
    throw new TypeError('IO.of takes a function argument');
  }
  return IO(f).of(f);
};

module.exports = IO;



