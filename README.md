# rippleJS

Adds Material Design-style feedback ripples to your existing HTML.

## Usage

Include the [rippleJS script](https://cdn.rawgit.com/samthor/rippleJS/master/ripple.min.js) at the end of your page. Then, add element with the `rippleJS` class within a parent element that has layout (aka, `position: relative` or `position: absolute`).

    <button class="yourButton">
      <br class="rippleJS" />
      Click Me
    </button>

    <script src="https://cdn.rawgit.com/samthor/rippleJS/master/ripple.min.js"></script>

rippleJS adds a click handler on `document.body`, so you don't need to 'register' any new elements as you add them to the DOM. It also inserts its own CSS.

### Ripple Fill

By default, tapping or clicking on a `rippleJS` element will create a fixed-size ripple (on the right below). However, by adding the `fill` class, the ripple will fill to rounded corner edges (on the left): good for form elements with fixed size.

<video width="246" height="122" controls style="margin: auto">
  <source src="rippleJS.mov" type="video/mp4" />
</video>

For example:

    <div class="optHolder">
      <br class="rippleJS fill" />
      <input type="checkbox" />
    </div>

### Ripple Color

To change the default color of a ripple, add the following style rules:

    .rippleJS .ripple {
      background: red;
    }

## Supports

Chrome, Safari, Firefox (all as of Dec 2014).

