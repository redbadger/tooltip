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

  // Create tip

  if(typeof params.tip !== 'undefined' && params.tip != false) {
    var tip = document.createElement('div');
    tip.className = 'tip';
    tooltip.appendChild(tip);

    var tipHeight = tooltip.offsetHeight;
  }


  var show = function() {
    if(this.position == 'top') {
      dom(tip).addClass('top');
      var parentEl = this.el.parentNode;
      parentEl.insertBefore(tooltip, this.el);
      tooltip.style.top = '-5px';
      tip.style.top = tooltip.offsetHeight;
    } else {
      dom(tip).addClass('bottom');
      tip.style.top = '-5px';
      tooltip.style.top = '5px';
      dom(this.tooltip).insertAfter(this.el);
    }

    if(this.overlay) {
      console.log('Params overlay true');
      dom(tooltip).addClass('overlay');
    }

    dom(this.tooltip).addClass('fadein');

    if(typeof params.timeout !== 'undefined') {
      window.setTimeout(hide, params.timeout);
    }
  }

  var hide = function() {
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
