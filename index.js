var dom = require('dom');

module.exports = function(target, content, type, position, overlay, timeout) {
  console.log(target);
  var el = dom(target)[0];

  var tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.classList.add(type);
  tooltip.innerHTML = content;
  if(overlay) {

  }
  else {
    dom(tooltip).insertAfter(el);
  }

  if(typeof timeout !== 'undefined') {
    window.setTimeout(function(){
      dom(tooltip).addClass('fadeout');
      window.setTimeout(function(){
        dom(tooltip).remove();
      }, 300);
    }, timeout);
  }
}
