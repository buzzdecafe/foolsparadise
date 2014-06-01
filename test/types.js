var R = require('ramda');

function I(x) { return x; };

function equals(a, b) {
  console.log(a.value, 'equals', b.value); 
  return a.value === b.value;
}

function getConstructor(obj) {
  return Object.getPrototypeOf(obj).constructor;
}

var interfaces = {
  functor: ['map'],
  apply: interfaces.functor.concat(['ap']),
  applicative: interfaces.apply.concat('of'),
  chain: interfaces.apply.concat('of'),
  monad: R.uniq(interfaces.chain.concat(interfaces.applicative))
};

function correctInterface(type) {
  return function(obj) {
    var methods = interfaces[type];
    return R.all(function(method) {
      return obj[method] && typeof obj[method] === 'function';
    });
}


function isChain(obj, f, g) {
  /* isApply */
  return typeof obj.chain === 'function' &&
}

function isMonad(obj) {
  return isApplicative(obj) && isChain(obj);
}


module.exports = {

  functor: {
    iface: correctIterface('functor'),
    id: function(obj) { 
      return equals(obj, obj.map(I));
    },
    compose: function(obj, f, g) {
      return  equals(
                obj.map(function(x) { return f(g(x)); }), 
                obj.map(g).map(f)
              );
    }
  },
  
  apply: {
    iface: correctInterface('apply'),
    compose: function(objF, objV, f, g) {
      var C = Object.getPrototypeOf(obj).constructor;
      return equals(objF.ap(objV), C(objF.value(objV.value)));
    }
  },
  
  applicative: {
    iface: correctInterface('applicative'),
    id: function(obj, obj2) {
      return equals(obj.of(I).ap(obj2), obj2);
    },
    homomorphic: function(obj, f) {
      return equals(a.of(f).ap(a.of(x)), a.of(f(x)));
    },
    interchange: function() {
      return equals(u.ap(a.of(y)), a.of(function(f) { return f(y); }).ap(u));
    }
  },
  
  chain: {
    iface: correctInterface('chain'),
    associative: function(obj, f, g) {
      return equals(obj.chain(f).chain(g), 
                    obj.chain(function(x) { return f(x).chain(g); })
             );
    }
  },
  
  monad: {
    iface: correctInterface('monad')
  }
};

