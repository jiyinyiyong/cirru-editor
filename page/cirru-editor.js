// Generated by CoffeeScript 1.3.3
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

exports.editor = function(elem) {
  var alphabet, check, choice, create_block, ctrl_c, ctrl_p, ctrl_v, do_render, focused, insert_blank, insert_char, key, list, move_down, move_left, move_right, move_up, on_update, render, ret, tool, _ref;
  tool = {
    err: function(info) {
      throw new Error(info);
    }
  };
  (check = function() {
    if (typeof $ === "undefined" || $ === null) {
      tool.err('I need jQuery!');
    }
    if (elem == null) {
      return tool.err('need a elem!');
    }
  })();
  ret = {};
  list = ['\t'];
  elem = $(elem);
  focused = false;
  ret.val = function(value) {
    if (value != null) {
      return list = value;
    } else {
      return list;
    }
  };
  render = require('./renderer.js').render;
  on_update = [];
  ret.update = function(f) {
    return on_update.push(f);
  };
  ret.render = do_render = function() {
    render(list, elem);
    return on_update.forEach(function(f) {
      return f();
    });
  };
  elem.click(function(e) {
    focused = true;
    elem.css({
      opacity: 1
    });
    e.preventDefault();
    return false;
  });
  $(window).click(function() {
    elem.css({
      opacity: 0.4
    });
    return focused = false;
  });
  _ref = require('./functions.js'), insert_char = _ref.insert_char, insert_blank = _ref.insert_blank, move_left = _ref.move_left, move_right = _ref.move_right, move_up = _ref.move_up, move_down = _ref.move_down, create_block = _ref.create_block, ctrl_c = _ref.ctrl_c, ctrl_v = _ref.ctrl_v, ctrl_p = _ref.ctrl_p;
  alphabet = require('./alphabet.js').all;
  $('body').keypress(function(e) {
    var char;
    if (focused) {
      char = String.fromCharCode(e.keyCode);
      if (__indexOf.call(alphabet, char) >= 0) {
        list = insert_char(list, char);
        return do_render();
      }
    }
  });
  choice = require('./control.js').choice;
  $('body').keydown(function(e) {
    var code;
    if (focused) {
      code = e.keyCode;
      if (choice[code] != null) {
        list = choice[code](list);
        do_render();
        return e.preventDefault();
      }
    }
  });
  key = new Kibo;
  key.down('ctrl m', function() {
    return ctrl_m(list);
  });
  key.down('ctrl y', function() {
    return ctrl_y(list);
  });
  key.down('ctrl p', function() {
    return ctrl_p(list);
  });
  return ret;
};