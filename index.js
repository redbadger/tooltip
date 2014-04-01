var dom = require('dom');

/*
* Params list: target, content, type, position, overlay, timeout, tip, tipPosition
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

    switch(params.tipPosition) {
      case 'left':
        tip.style.left = '2%';
        break;
      case 'center':
      case 'middle':
        tip.style.left = '50%';
        break;
      case 'right':
        tip.style.left = '97%';
        break;
      default:
        tip.style.left = '50%';
    }

    tooltip.appendChild(tip);

    var tipHeight = tooltip.offsetHeight;
  }


  var show = function() {
    if(this.position == 'top') {
      var parentEl = this.el.parentNode;
      parentEl.insertBefore(tooltip, this.el);
      tooltip.style.top = '-5px';
      if(typeof tip !== 'undefined') {
        dom(tip).addClass('top');
        tip.style.top = tooltip.offsetHeight;
      }

      if(this.overlay) {
        // Calculating absolute position of the overlayed tooltip
        var offsetTop = this.el.offsetTop - this.tooltip.offsetHeight - 5;
        dom(this.tooltip).addClass('overlay');
        dom(this.tooltip).css('top', offsetTop);
      }

    } else {
      tooltip.style.top = '5px';
      dom(this.tooltip).insertAfter(this.el);
      if(typeof tip !== 'undefined') {
        dom(tip).addClass('bottom');
        tip.style.top = '-5px';
      }

      if(this.overlay) {
        // Calculating absolute position of the overlayed tooltip
        var offsetTop = this.el.offsetTop + this.el.offsetHeight + 5;
        dom(this.tooltip).addClass('overlay');
        dom(this.tooltip).css('top', offsetTop);
      }
    }

    dom(this.tooltip).addClass('fadein');

    if(typeof params.timeout !== 'undefined') {
      window.setTimeout(hide, params.timeout);
    }
  }

  var hide = function() {
    dom(tooltip).addClass('fadeout');
    dom(tooltip).removeClass('fadein');
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
    tip: tip,
    tipHeight: tipHeight
  };
}

module.exports = Tooltip;
