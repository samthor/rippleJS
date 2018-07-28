
import init from './lib.js';

(function() {
    var css = /** @noinline */ ('/*rippleJS*/.rippleJS,.rippleJS.fill::after{position:absolute;top:0;left:0;right:0;bottom:0}.rippleJS{display:block;overflow:hidden;border-radius:inherit;-webkit-mask-image:-webkit-radial-gradient(circle,#fff,#000)}.rippleJS.fill::after{content:""}.rippleJS.fill{border-radius:1000000px}.rippleJS .ripple{position:absolute;border-radius:100%;background:currentColor;opacity:.2;width:0;height:0;-webkit-transition:-webkit-transform .4s ease-out,opacity .4s ease-out;transition:transform .4s ease-out,opacity .4s ease-out;-webkit-transform:scale(0);transform:scale(0);pointer-events:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.rippleJS .ripple.held{opacity:.4;-webkit-transform:scale(1);transform:scale(1)}.rippleJS .ripple.done{opacity:0}');

  /**
   * @return {boolean}
   */
  function hasCSS() {
    var test = document.createElement('div');
    test.className = 'rippleJS';
    document.body.appendChild(test);
    var s = window.getComputedStyle(test);
    var result = (s.position === 'absolute');
    document.body.removeChild(test);
    return result;
  }

  function setup() {
    // minified CSS from ripple.css
    if (!hasCSS()) {
      var style = document.createElement('style');
      style.textContent = css;
      document.head.insertBefore(style, document.head.firstChild);
    }
    init();
  };

  if (document.readyState === 'complete') {
    setup();
  } else {
    window.addEventListener('load', setup);
  }
}());
