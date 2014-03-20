var dom = require('dom');

/*
* Params list: target, content, type, position, overlay, timeout
*/
function Tooltip(params) {
  console.log(params.target);
  var el = dom(params.target)[0];

  var tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.classList.add(params.type);
  tooltip.innerHTML = params.content;

  var tip = document.createElement('div');
  tip.className = 'tip';
  tooltip.appendChild(tip);

  var tipHeight = tooltip.offsetHeight;


  var show = function() {
    if(this.overlay) {
      console.log('Params overlay true');
    }
    else {
      if(this.position == 'top') {
        var parentEl = this.el.parentNode;
        parentEl.insertBefore(tooltip, this.el);
      } else {
        dom(this.tooltip).insertAfter(this.el);
      }
      dom(this.tooltip).addClass('fadein');
    }

    if(typeof params.timeout !== 'undefined') {
      console.log('Params timeout: ' + params.timeout);
      window.setTimeout(hide, params.timeout);
    }
  }

  var hide = function() {
    console.log('Tooltip: ' + tooltip.innerHTML);
    dom(tooltip).addClass('fadeout');
    window.setTimeout(function(){
      dom(tooltip).remove();
    }, 300);
  }

  return {
    hide: hide,
    show: show,
    tooltip: tooltip,
    el: el,
    overlay: params.overlay,
    position: params.position,
    tipHeight: tipHeight
  };
}

module.exports = Tooltip;
