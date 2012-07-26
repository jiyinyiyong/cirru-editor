// Generated by CoffeeScript 1.3.3
var breath, live;

live = function() {
  var children, evaluate, new_scope, origin, run;
  origin = {};
  origin.children = {};
  origin.children.bin = {
    set: function(key) {
      return function(value) {
        return key = value;
      };
    },
    '@': function(scope) {
      return function(arr) {
        var dest, item, _i, _len, _results;
        dest = scope;
        _results = [];
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          item = arr[_i];
          _results.push(dest = item === '..' ? dest.parent : item === '/' ? origin : dest[item]);
        }
        return _results;
      };
    },
    echo: function(arr) {
      return console.log((arr.map(String)).join(', '));
    },
    number: function(arr) {
      if (arr.length === 1) {
        return Number(arr[0]);
      } else {
        return arr.map(Number);
      }
    },
    '+': function(arr) {
      return (arr.map(Number)).reduce(function(x, y) {
        return x + y;
      });
    }
  };
  origin.search = function(key) {
    if (origin.children.bin[key] != null) {
      return origin.children.bin;
    } else if (origin.children[key] != null) {
      return origin.children;
    } else {
      return void 0;
    }
  };
  new_scope = function(scope) {
    var here;
    here = {};
    here.parent = scope;
    here.children = {};
    return here.search = function(key) {
      if (origin.children.bin[key] != null) {
        return origin.children.bin;
      } else if (here[key] != null) {
        return here;
      } else if (here.parent.children[key] != null) {
        return here.parent.children;
      } else {
        return void 0;
      }
    };
  };
  run = function(scope, arr) {
    var key, pls;
    key = arr[0];
    pls = scope.search(key);
    if (pls != null) {
      return pls[key](arr.slice(1));
    } else {
      throw new Error('not found');
    }
  };
  evaluate = function(scope, elem) {
    var list;
    list = elem.children();
    list = $.map(list, function(item) {
      if (item.tagName === 'CODE') {
        return $(item).text();
      } else {
        return [evaluate(scope, $(item))];
      }
    });
    return run(origin, list);
  };
  children = $('#cirru').children();
  return $.each(children, function(i) {
    var list;
    list = evaluate(origin, $(children[i]));
    return console.log(list);
  });
};

breath = live;
