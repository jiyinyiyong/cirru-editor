// Generated by CoffeeScript 1.3.3

$(function() {
  var click_choose, cursor, ed, editable, in_sight;
  editable = 'contenteditable';
  cursor = "<div class='point' " + editable + "='true'></div>";
  ed = $('#editor');
  ed.append(cursor);
  $('.point').focus();
  ed.click(function() {
    return (function() {
      return $('.point').focus();
    })();
  });
  click_choose = function(elems) {
    return elems.click(function() {
      var old;
      old = $('.point').removeAttr(editable).removeAttr('id');
      click_choose(old);
      elems.attr(editable, 'true').attr('class', 'point').focus();
      return false;
    });
  };
  window.pop_point = function(elems) {
    return elems.removeAttr(editable).removeAttr('class');
  };
  window.set_point = function(elems) {
    return elems.attr(editable, 'true').attr('class', 'point').focus();
  };
  in_sight = true;
  $('#editor').bind('focus', function() {
    return in_sight = true;
  });
  $('#editor').bind('blur', function() {
    return in_sight = false;
  });
  return $(document).keydown(function(e) {
    var next, old, prev;
    console.log(e.keyCode);
    if (in_sight) {
      switch (e.keyCode) {
        case 13:
          console.log('xx');
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
            console.log($('.point'));
            pop_point(old);
            click_choose(old);
            $('.point').focus();
          }
          break;
        case 46:
          if ($('.point').next().length > 0) {
            next = $('.point').next();
            old = pop_point($('.point'));
            old[0].outerHTML = '';
            set_point(next);
          } else if ($('.point').prev().length > 0) {
            prev = $('.point').prev();
            old = pop_point($('.point'));
            old[0].outerHTML = '';
            set_point(prev);
          }
          break;
        case 38:
          if ($('.point').html().length > 0) {
            old = pop_point($('.point'));
            old.before(cursor);
            $('.point').focus();
          } else if ($('.point').prev().length > 0) {
            set_point($('.point').prev());
            $('.point')[1].outerHTML = '';
            $('.point').focus();
          }
          break;
        case 40:
          if ($('.point').html().length > 0) {
            old = pop_point($('.point'));
            old.after(cursor);
            $('.point').focus();
          } else if ($('.point').next().length > 0) {
            set_point($('.point').next());
            $('.point')[0].outerHTML = '';
            $('.point').focus();
          }
          break;
        default:
          return true;
      }
      return false;
    }
  });
});
