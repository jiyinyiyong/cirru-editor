// Generated by CoffeeScript 1.3.3
var caret, draw, escape, isArr, isStr, notArr;

isArr = Array.isArray;

isStr = function(item) {
  return (typeof item) === 'string';
};

notArr = function(item) {
  return !(isArr(item));
};

escape = function(item) {
  return item.replace(/\s/g, '&nbsp;');
};

caret = '<span id="caret"> </span>';

draw = function(list) {
  var html, inline;
  html = '';
  inline = '';
  list.forEach(function(item) {
    return html += isArr(item) ? draw(item) : isStr(item) ? "<code>" + (item.replace(/\t/, caret)) + "</code>" : "<code>" + (escape(item)) + "</code>";
  });
  if (list.every(notArr)) {
    inline = ' class="inline"';
  }
  if (inline) {

  }
  return "<pre" + inline + ">" + html + "</pre>";
};

exports.render = function(list, elem) {
  console.log(list);
  return elem.html(draw(list));
};