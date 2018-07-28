
window.addEventListener('load', function() {
  function applyStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.head.insertBefore(style, document.head.firstChild);
  }
  function hasCSS() {
    var test = document.createElement('div');
    test.className = 'rippleJS';
    document.body.appendChild(test);
    var s = window.getComputedStyle(test);
    var result = (s.position === 'absolute');
    document.body.removeChild(test);
    return result;
  }
  if (!hasCSS()) {
    var css = '/*rippleJS*/.rippleJS,.rippleJS.fill::after{position:absolute;top:0;left:0;right:0;bottom:0}.rippleJS{display:block;overflow:hidden;border-radius:inherit;-webkit-mask-image:-webkit-radial-gradient(circle,#fff,#000)}.rippleJS.fill::after{content:""}.rippleJS.fill{border-radius:1000000px}.rippleJS .ripple{position:absolute;border-radius:100%;background:currentColor;opacity:.2;width:0;height:0;-webkit-transition:-webkit-transform .4s ease-out,opacity .4s ease-out;transition:transform .4s ease-out,opacity .4s ease-out;-webkit-transform:scale(0);transform:scale(0);pointer-events:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.rippleJS .ripple.held{opacity:.4;-webkit-transform:scale(1);transform:scale(1)}.rippleJS .ripple.done{opacity:0}';
    applyStyle(css);
  }

  var rippleTypeAttr = 'data-event';

  function getHolderWithRippleJsClass(event) {
    var holder = event.target;
    var childNodesLength = holder.childNodes.length;

    if (holder.localName !== 'button' || !childNodesLength) {
      return holder.classList.contains('rippleJS') ? holder : null;
    }

    // fix firefox event target issue https://bugzilla.mozilla.org/show_bug.cgi?id=1089326
    for (var i = 0; i < childNodesLength; ++i) {
      var child = holder.childNodes[i];
      var cl = child.classList;
      if (cl && cl.contains('rippleJS')) {
        return child;  // return valid holder
      }
    }

    return null;
  }

  function startRipple(type, at) {
    var holder = getHolderWithRippleJsClass(at);
    if (!holder) {
      return false;  // ignore
    }
    var cl = holder.classList;

    // Store the event use to generate this ripple on the holder: don't allow
    // further events of different types until we're done. Prevents double-
    // ripples from mousedown/touchstart.
    var prev = holder.getAttribute(rippleTypeAttr);
    if (prev && prev !== type) {
      return false;
    }
    holder.setAttribute(rippleTypeAttr, type);

    // Create and position the ripple.
    var rect = holder.getBoundingClientRect();
    var x = at.offsetX;
    var y;
    if (x !== undefined) {
      y = at.offsetY;
    } else {
      x = at.clientX - rect.left;
      y = at.clientY - rect.top;
    }
    var ripple = document.createElement('div');
    var max;
    if (rect.width === rect.height) {
      max = rect.width * 1.412;
    } else {
      max = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
    }
    var dim = max*2 + 'px';
    ripple.style.width = dim;
    ripple.style.height = dim;
    ripple.style.marginLeft = -max + x + 'px';
    ripple.style.marginTop = -max + y + 'px';

    // Activate/add the element.
    ripple.className = 'ripple';
    holder.appendChild(ripple);
    window.setTimeout(function() {
      ripple.classList.add('held');
    }, 0);

    var releaseEvent = (type === 'mousedown' ? 'mouseup' : 'touchend');
    var release = function(ev) {
      // TODO: We don't check for _our_ touch here. Releasing one finger
      // releases all ripples.
      document.removeEventListener(releaseEvent, release);
      ripple.classList.add('done');

      // larger than animation: duration in css
      window.setTimeout(function() {
        holder.removeChild(ripple);
        if (!holder.children.length) {
          cl.remove('active');
          holder.removeAttribute(rippleTypeAttr);
        }
      }, 650);
    };
    document.addEventListener(releaseEvent, release);
  }

  document.addEventListener('mousedown', function(ev) {
    if (ev.button === 0) {
      // trigger on left click only
      startRipple(ev.type, ev);
    }
  });
  document.addEventListener('touchstart', function(ev) {
    for (var i = 0; i < ev.changedTouches.length; ++i) {
      startRipple(ev.type, ev.changedTouches[i]);
    }
  });
});