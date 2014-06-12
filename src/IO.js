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

IO.prototype.ap = function(thatIo) {
  var thisIo = this;
  return new IO(function() { 
    thisIo.fn(thatIo);
  });
};

IO.runIO = function(io) {
  return io.runIO.apply(io, [].slice.call(arguments, 1));
};

IO.prototype.runIO = function() {
  console.log(arguments);
  return this.fn.apply(this, arguments);
};

IO.prototype.of = function(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('IO.of requires a function argument. Got ' + typeof fn);
  }
  return new IO(fn);
};

IO.of = IO.prototype.of;

IO.prototype.equals = function(that) {
  return this === that ||
         this.fn === that.fn ||
         IO.runIO(this) === IO.runIO(that);
};

module.exports = IO;



