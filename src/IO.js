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

IO.prototype.map = function(f) {
  var io = this;
  return new IO(compose(f, io.fn));
};

IO.prototype.ap = function(app) {
  return this.fn(app.value);
};

IO.prototype.chain = function(f) {
  return new IO(function() { return f(this.value); });
};

IO.runIO = function(io) {
  return io.fn.apply(this, [].slice.call(arguments, 1));
};

IO.prototype.runIO = function() {
  return IO.runIO(this);
};


IO.prototype.of = IO.of;

module.exports = IO;



