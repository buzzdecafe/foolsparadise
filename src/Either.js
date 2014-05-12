function Either(x) {
  this.value = x;
}
Either.prototype.map = function(f) {
  
};

function Left(x) {
  this.value = x;
}
Left.prototype = Object.create(Either.prototype);

function Right(x) {
  this.value = x;
}
Right.prototype = Object.create(Either.prototype);


