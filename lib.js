
var rippleTypeAttr = 'data-event';

/**
 * @param {!Event|!Touch} event
 * @return {Node}
 */
function getHolderWithRippleJsClass(event) {
  var holder = /** @type {!Node} */ (event.target);
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

/**
 * @param {string} type
 * @param {!Event|!Touch} at
 */
export function startRipple(type, at) {
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

/**
 * Installs mousedown/touchstart handlers on the target for ripples.
 *
 * @param {!Node=} target to install on, default document 
 */
export default function init(target) {
  target = target || document;
  target.addEventListener('mousedown', function(ev) {
    if (ev.button === 0) {
      // trigger on left click only
      startRipple(ev.type, ev);
    }
  }, {passive: true});
  target.addEventListener('touchstart', function(ev) {
    for (var i = 0; i < ev.changedTouches.length; ++i) {
      startRipple(ev.type, ev.changedTouches[i]);
    }
  }, {passive: true});
}
