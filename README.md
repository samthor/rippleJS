# rippleJS

Adds Material Design-style feedback ripples to your existing HTML.

## Usage

Add an element with the `rippleJS` class within a parent element that has layout (aka, `position: relative` or `position: absolute`).

    <button class="yourButton">
      <br class="rippleJS" />
      Click Me
    </button>

    <script src="https://cdn.rawgit.com/samthor/rippleJS/master/ripple.min.js"></script>

## Ripple Color

To change the default color of a ripple, add the following style rules:

    .rippleJS .ripple {
      background: red;
    }

## Supports

Chrome, Safari, Firefox (all as of Dec 2014).

