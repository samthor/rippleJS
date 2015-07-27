# rippleJS

Adds Material Design-style feedback ripples to your existing HTML without any dependencies. [Show me the demos!](http://samthor.github.io/rippleJS)

## Usage

Include the [rippleJS script](https://cdn.rawgit.com/samthor/rippleJS/v1.0.2/ripple.min.js) at the end of your page. Then, add element with the `rippleJS` class within a parent element that has layout (aka, `position: relative` or `position: absolute`).

```html
<button class="yourButton">
  Click Me
  <link class="rippleJS" />
</button>

<script src="https://cdn.rawgit.com/samthor/rippleJS/v1.0.2/ripple.min.js"></script>
```

rippleJS adds handlers on `document.body`, so you don't need to register any new elements as you add them to the DOM. It supports touch and mouse events (even at the same time), and includes its own CSS.

### Ripple Fill

By adding the `fill` class to a `rippleJS` element, the ripple will fill to rounded corners, good for form elements with fixed size. For example:

```html
<div class="optHolder">
  <input type="checkbox" />
  <link class="rippleJS fill" />
</div>
```

### Ripple Color

The default color is a transparent version of the current color (aka, the `currentColor` [keyword](http://www.w3.org/TR/css3-color/#currentcolor)).
To change this default, add the following style rule:

```css
.rippleJS .ripple {
  background: red;
}
```

You could also change it just for some elements:

```css
.yourClassName .rippleJS .ripple {
  background: blue;
}
```

Or change the level of opacity:

```css
.moreOpaque .rippleJS .ripple {
  opacity: 0.65;
}
````

## Supports

Chrome, Safari, Firefox (all as of Dec 2014).

## Bower

Instead of using rippleJS directly, you can fetch it using Bower:

    $ bower install vanilla-ripplejs
