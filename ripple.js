
window.addEventListener('load', function() {
  var raf = window.requestAnimationFrame || window.setTimeout;

  function applyStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.body.appendChild(style);
  }
  function hasCSS() {
    var test = document.createElement('div');
    test.className = 'rippleJS';
    document.body.appendChild(test);
    var s = window.getComputedStyle(test);
    var result = s.position == 'absolute';
    document.body.removeChild(test);
    return result;
  }

  if (!hasCSS()) {
    var css = '/*rippleJS*/@-webkit-keyframes rippleJS-opacity{0%,100%{opacity:0}75%{opacity:.4}}@keyframes rippleJS-opacity{0%,100%{opacity:0}75%{opacity:.4}}.rippleJS{display:block;position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden}.rippleJS.fill::after{position:absolute;top:0;left:0;right:0;bottom:0;content:""}.rippleJS.fill.active{border-radius:1000000px;overflow:hidden;-webkit-mask-image:-webkit-radial-gradient(circle,#fff,#000)}.rippleJS .ripple{position:absolute;border-radius:100%;background:#212121;opacity:0;transition:all .4s ease-in;width:0;height:0;pointer-events:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.rippleJS .ripple.done{margin-left:-100px;margin-top:-100px;width:200px;height:200px;animation:rippleJS-opacity 1s;-webkit-animation:rippleJS-opacity 1s}.rippleJS.fill .ripple.done{margin:-100% auto auto -100%;width:200%;padding-bottom:200%;height:0};';
    applyStyle(css);
  }

  document.addEventListener('click', function(ev) {
    var holder = ev.target;
    if (!holder.classList.contains('rippleJS')) {
      return false;  // ignore
    }
    holder.classList.add('active');

    var x = ev.offsetX;
    var y;
    if (x !== undefined) {
      y = ev.offsetY;
    } else {
      // firefox doesn't have offsetX/offsetY
      var rect = holder.getBoundingClientRect();
      x = ev.clientX - rect.left;
      y = ev.clientY - rect.top;
      raf = window.setTimeout;  // firefox needs the delay for css calc
    }

    var ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    ripple.style.webkitTransform = ripple.style.transform;

    raf(function() {
      ripple.classList.add('done');

      window.setTimeout(function() {
        holder.removeChild(ripple);
        holder.children.length || holder.classList.remove('active');
      }, 1250);  // larger than animation: duration in css

    }, 20);  // needs to be delayed, setTimeout with zero prevents anim

    holder.appendChild(ripple);
  });

});