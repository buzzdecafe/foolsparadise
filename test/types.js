var R = require('ramda');

var I = R.identity;

function equals(a, b) {
  console.log(a.value, 'equals', b.value); 
  return a.value === b.value;
}

function getConstructor(obj) {
  return Object.getPrototypeOf(obj).constructor;
}

var interfaces = { functor: ['map'] };
interfaces.apply = interfaces.functor.concat(['ap']);
interfaces.applicative = interfaces.apply.concat(['of']);
interfaces.chain = interfaces.apply.concat(['chain']);
interfaces.monad = R.uniq(interfaces.chain.concat(interfaces.applicative));

function correctInterface(type) {
  return function(obj) {
    return R.all(function(method) {
      return obj[method] && typeof obj[method] === 'function';
    }, interfaces[type]);
  };
}


module.exports = {

  functor: {
    iface: correctInterface('functor'),
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
    compose: function(objF, objV) {
      var C = Object.getPrototypeOf(objF).constructor;
      return equals(objF.ap(objV), C(objF.value(objV.value)));
    }
  },
  
  applicative: {
    iface: correctInterface('applicative'),
    id: function(obj, obj2) {
      return equals(obj.of(I).ap(obj2), obj2);
    },
    homomorphic: function(obj, f, x) {
      return equals(obj.of(f).ap(obj.of(x)), obj.of(f(x)));
    },
    interchange: function(obj1, obj2, x) {
      return equals(obj2.ap(obj1.of(x)), 
                    obj1.of(function(f) { return f(x); }).ap(obj2));
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


