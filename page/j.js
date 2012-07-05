// Generated by CoffeeScript 1.3.3
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

$(function() {
  var click_choose, cursor, ed, editable, empty, focus, in_sight, pop_point, set_point;
  editable = 'contenteditable';
  cursor = "<div class='point' " + editable + "='true'></div>";
  empty = ['', '<br>'];
  ed = $('#editor');
  ed.append(cursor);
  $('.point').focus();
  ed.click(function() {
    return (function() {
      return $('.point').focus();
    })();
  });
  click_choose = function(elems) {
    return elems[0].onclick = function() {
      var old, up, _ref;
      old = $('.point').removeAttr(editable).removeAttr('class');
      click_choose(old);
      console.log(old);
      if (old.html().length === 0) {
        up = old.parent();
        old.remove();
<<<<<<< HEAD
        while (_ref = up.html(), __indexOf.call(empty, _ref) >= 0) {
=======
        while ((_ref = up.html()) === '' || _ref === '<br>') {
>>>>>>> b6f4ce021c2ed22bd6fb5606672a8c87406c2873
          old = up;
          up = up.parent();
          old.remove();
        }
      }
      set_point(elems);
      return false;
    };
  };
  pop_point = function(elems) {
    elems.removeAttr(editable).removeAttr('class');
    click_choose(elems);
    return elems;
  };
  set_point = function(elems) {
    elems.attr(editable, 'true').attr('class', 'point').focus();
    return elems;
  };
  focus = function() {
    var sel;
    $('.point').focus();
    sel = window.getSelection();
    return sel.collapse($('.point')[0], 1);
  };
  in_sight = true;
  $('#editor').bind('focus', function() {
    return in_sight = true;
  });
  $('#editor').bind('blur', function() {
    return in_sight = false;
  });
  return $(document).keydown(function(e) {
    var next, old, prev, _ref, _ref1;
    console.log(e.keyCode);
    if (in_sight) {
      switch (e.keyCode) {
        case 13:
          old = pop_point($('.point'));
          old.after("<section>" + cursor + "</section>");
          focus();
          if (old.html().length === 0) {
            old[0].outerHTML = '';
          }
          break;
        case 9:
          if ($('.point').html().length > 0) {
            if (e.shiftKey) {
              $('.point').before(cursor);
              old = $('.point').last();
            } else {
              $('.point').after(cursor);
              old = $('.point').first();
            }
            pop_point(old);
            focus();
          }
          break;
        case 46:
          if ($('.point').next().length > 0) {
            next = $('.point').next();
            old = pop_point($('.point'));
            old.remove();
            if (next[0].tagName === 'DIV') {
              set_point(next);
            } else if (next[0].tagName === 'SECTION') {
              next.prepend(cursor);
              focus();
            }
          } else if ($('.point').prev().length > 0) {
            prev = $('.point').prev();
            old = pop_point($('.point'));
            old.remove();
            if (prev[0].tagName === 'DIV') {
              set_point(prev);
            } else {
              prev.append(cursor);
              focus();
            }
          }
          break;
        case 38:
          if (_ref = $('.point').html(), __indexOf.call(empty, _ref) < 0) {
            old = pop_point($('.point'));
            old.before(cursor);
            focus();
          } else if ($('.point').prev().length > 0) {
            prev = $('.point').prev();
            if (prev[0].tagName === 'DIV') {
              set_point($('.point').prev());
            } else if (prev[0].tagName === 'SECTION') {
              prev.append(cursor);
            }
            $('.point')[1].outerHTML = '';
            focus();
          } else if ($('.point').parent().attr('id') !== 'editor') {
            $('.point').parent().before(cursor);
            $('.point').last().remove();
            focus();
          }
          break;
        case 40:
          if (_ref1 = $('.point').html(), __indexOf.call(empty, _ref1) < 0) {
            old = pop_point($('.point'));
            old.after(cursor);
            focus();
          } else if ($('.point').next().length > 0) {
            next = $('.point').next();
            if (next[0].tagName === 'DIV') {
              set_point($('.point').next());
            } else if (next[0].tagName === 'SECTION') {
              next.prepend(cursor);
            }
            $('.point').first().remove();
            focus();
          } else if ($('.point').parent().attr('id') !== 'editor') {
            $('.point').parent().after(cursor);
            $('.point').first().remove();
            focus();
          }
          break;
        default:
          return true;
      }
      return false;
    }
  });
});
