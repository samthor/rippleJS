# rippleJS

Adds Material Design-style feedback ripples to your existing HTML.

## Usage

Include the [rippleJS script](https://cdn.rawgit.com/samthor/rippleJS/master/ripple.min.js) at the end of your page. Then, add element with the `rippleJS` class within a parent element that has layout (aka, `position: relative` or `position: absolute`).

    <button class="yourButton">
      Click Me
      <link class="rippleJS" />
    </button>

    <script src="https://cdn.rawgit.com/samthor/rippleJS/master/ripple.min.js"></script>

rippleJS adds a click handler on `document.body`, so you don't need to register any new elements as you add them to the DOM. It also inserts its own CSS.

### Ripple Fill

By adding the `fill` class to a `rippleJS` element, the rippler will fill to rounded corners: good for form elements with fixed size. For example:

    <div class="optHolder">
      <link class="rippleJS fill" />
      <input type="checkbox" />
    </div>

### Ripple Color

To change the default color of a ripple, add the following style rule:

    .rippleJS .ripple {
      background: red;
    }

You could also change it just for some elements:

    .yourClassName .rippleJS .ripple {
      background: blue;
    }

## Supports

Chrome, Safari, Firefox (all as of Dec 2014).

