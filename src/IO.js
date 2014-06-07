var compose = require("ramda").compose;

function IO(fn) {
  if (!(this instanceof IO)) {
    return new IO(fn);
  }
  this.fn = fn;
}

IO.of = function(value) {
  return new IO(function() {
    return value;
  });
};

// `f` must return an IO
IO.prototype.chain = function(f) {
  var io = this;
  return new IO(function() { 
    return f(io.fn()).fn(); 
  });
};

IO.prototype.map = function(f) {
  return this.chain(function(a) {
    return IO.of(f(a));
  });
};

IO.prototype.ap = function(app) {
  return this.chain(function(f) {
    return app.map(f);
  });
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

IO.prototype.of = IO.of;

module.exports = IO;



