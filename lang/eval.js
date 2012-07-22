// Generated by CoffeeScript 1.3.3
var breath, live;

live = function() {
  var children, evaluate, new_scope, origin, run;
  origin = {};
  origin.has = {
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
    }
  };
  new_scope = function(scope) {
    var child;
    child = {};
    child.parent = scope;
    return child.has = {};
  };
  run = function(arr) {};
  evaluate = function(elem) {
    var list;
    list = elem.children();
    list = $.map(list, function(item) {
      if (item.tagName === 'CODE') {
        return $(item).text();
      } else {
        return [evaluate($(item))];
      }
    });
    return run(list);
  };
  children = $('#cirru').children();
  return $.each(children, function(i) {
    var list;
    list = evaluate($(children[i]));
    return console.log(list);
  });
};

breath = live;