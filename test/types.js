
function I(x) { return x; };

function equals(a, b) {
  console.log(a.value, 'equals', b.value); 
  return a.value === b.value;
}

function getConstructor(obj) {
  return Object.getPrototypeOf(obj).constructor;
}

function isFunctor(obj, f, g) {
  return typeof obj.map === 'function' &&
         equals(obj, obj.map(I)) && // identity
         equals(obj.map(function(x) { return f(g(x)); }), obj.map(g).map(f)); // composition
}

function isApply(obj, obj2) {
  var C = getConstructor(obj);
  /*isFunctor(obj) &&*/
  return typeof obj.ap === 'function' &&
         equals(obj.ap(obj2), C(obj.value(obj2.value)));
}

function isApplicative(obj, value) {
  var C = Object.getPrototypeOf(obj).constructor;
  return isApply(obj) &&
         typeof obj.of === 'function' &&
         equals(obj.of(value), new C(value));
}

function isChain(obj, f, g) {
  return isApply(obj) &&
         typeof obj.chain === 'function' &&
         equals(obj.chain(f).chain(g), obj.chain(function(x) { return f(x).chain(g); }));
}

function isMonad(obj) {
  return isApplicative(obj) && isChain(obj);
}


module.exports = {
  isFunctor: isFunctor,
  isApply: isApply,
  isApplicatove: isApplicative,
  isChain: isChain,
  isMonad: isMonad
};

