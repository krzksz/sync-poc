# Any Elements

[![Build Status](https://travis-ci.org/krzksz/any-elements.svg?branch=master)](https://travis-ci.org/krzksz/any-elements) ![Bundle Size](https://badgen.net/bundlephobia/minzip/any-elements)

Lightweight component library built to enable custom elements-like features and API for any selectors you desire.

## Features

- Class-based components.
- Automatic upgrading of existing and dynamically added elements.
- Ability to target elements with any valid CSS selector.
- Support for `connected`, `disconnected`, and `attributeChanged` lifecycle hooks.
- Support for lazy loading of components.
- Distributed in multiple formats including CJS, UMD & ESM.
- **Less then 1KB minified and gzipped**.

## Installation

```
npm install --save any-elements
```

## Browsers support

Library is supported by all modern browsers:

- IE 11+
- Edge
- Chrome
- Safari 6+
- Firefox
- Safari iOS
- Android

Support for older browsers like IE 10 can be achieved by providing Mutation Observer polyfill.

## Example

```javascript
import { Component, Registry } from "any-elements";

class MyComponent extends Component {
  connected() {
    this.root.innerText = "Hello World!";
  }
}

const registry = new Registry();
registry.define("my-component", MyComponent, { selector: ".my-component" });
```

## Lifecycle hooks

### `connected`

Called without any arguments when matching element is found or added to the the DOM. This callback is called asynchronously because of lazy loading support.

### `disconnected`

Called without any arguments after component's root element got removed from the DOM. This callback is called synchronously.

### `attributeChanged`

Called every time component root's attribute changes with following arguments:

- `name` - string, attribute's name.
- `oldValue` - string, attribute's old value.
- `newValue` - string, attribute's new value.

For this hook to be called you need to define a static `observedAttributes` field that defines which attributes should be watched.
