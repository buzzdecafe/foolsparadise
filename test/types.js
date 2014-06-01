
function I(x) { return x; };

function equals(a, b) {
  console.log(a.value, 'equals', b.value); 
  return a.value === b.value;
}

function getConstructor(obj) {
  return Object.getPrototypeOf(obj).constructor;
}

module.exports = {

  isFunctor: function(obj, f, g) {
      return typeof obj.map === 'function' &&
             equals(obj, obj.map(I)) && // identity
             equals(obj.map(function(x) { return f(g(x)); }), obj.map(g).map(f)); // composition
             // assert same types? JS won't help here...
             // 
  },

  isApply: function(obj, obj2) {
      return isFunctor(obj) &&
             typeof obj.ap === 'function' &&
             obj.ap(obj2) === obj.value(obj2.value);
  },

  isApplicative: function(obj, value) {
    var C = Object.getPrototypeOf(obj).constructor;
      return isApply(obj) &&
             typeof obj.of === 'function' &&
             equals(obj.of(value), new C(value));
  },

  isChain: function(obj, f, g) {
      return isApply(obj) &&
             typeof obj.chain === 'function' &&
             equals(obj.chain(f).chain(g), obj.chain(function(x) { return f(x).chain(g); }));
  },

  isMonad: function(obj) {
    return isApplicative(obj) && isChain(obj);
  }

};





