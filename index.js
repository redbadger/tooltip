var dom = require('dom');

/*
* Params list: target, content, type, position, overlay, timeout, tip, tipPosition
*/

function Tooltip(params) {
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
        tip.style.left = '93%';
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
      tooltip.style.top = '-2px';
      if(typeof tip !== 'undefined') {
        dom(tip).addClass('top');
        tip.style.top = tooltip.offsetHeight;
      }

      if(this.overlay) {
        // Calculating absolute position of the overlayed tooltip
        var offsetTop = this.el.offsetTop - this.tooltip.offsetHeight - 5;
        dom(this.tooltip).addClass('tooltip-overlay');
        dom(this.tooltip).css('top', offsetTop);
      }

    } else {
      tooltip.style.top = '2px';
      dom(tooltip).insertAfter(el);
      if(typeof tip !== 'undefined') {
        dom(tip).addClass('bottom');
        tip.style.top = '-10px';
      }

      if(this.overlay) {
        // Calculating absolute position of the overlayed tooltip
        var offsetTop = this.el.offsetTop + this.el.offsetHeight + 5;
        dom(this.tooltip).addClass('tooltip-overlay');
        dom(this.tooltip).css('top', offsetTop);
      }
    }

    dom(this.tooltip).addClass('tooltip-fadein');

    if(typeof params.timeout !== 'undefined') {
      window.setTimeout(hide, params.timeout);
    }
  }

  var hide = function() {
    dom(tooltip).addClass('tooltip-fadeout');
    dom(tooltip).removeClass('tooltip-fadein');
    window.setTimeout(function(){
      dom(tooltip).remove();
    }, 300);
  }

  var toggle = function() {
    dom(this.tooltip).hasClass('tooltip-fadein') ? this.hide() : this.show();
  }

  return {
    hide: hide,
    show: show,
    toggle: toggle,
    tooltip: tooltip,
    el: el,
    overlay: params.overlay,
    position: params.position,
    tip: tip,
    tipHeight: tipHeight
  };
}

module.exports = Tooltip;
