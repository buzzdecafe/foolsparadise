function Identity(x) {
  this.value = x;
}

module.exports = function(x) {
  return new Identity(x); 
};



