# tool-shack

[![npm version](https://img.shields.io/npm/v/tool-shack.svg)](https://www.npmjs.com/package/tool-shack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A lightweight, zero-dependency TypeScript utility library providing essential helper functions for the browser, DOM manipulation, strings, date/time formatting, scheduling, and general data validation.

---

## Features

- 🪶 **Zero dependencies** & lightweight
- 📦 **Dual module support**: ESM (`import`) and CommonJS (`require`)
- 🏷️ **Full TypeScript support** with built-in type definitions
- 🌐 **Browser & DOM utilities** to streamline frontend development
- ⚡ **Tree-shakeable** exports

---

## Installation

```bash
# npm
npm install tool-shack

# pnpm
pnpm add tool-shack

# yarn
yarn add tool-shack
```

---

## Quick Start

```typescript
import { slugify, parseDuration, createElement, isTouchSupported, isValidJson } from 'tool-shack';

// String manipulation
console.log(slugify('Hello World!')); // 'hello-world'

// Date & Time
console.log(parseDuration(3661000));
// { days: 0, hours: 1, minutes: 1, seconds: 1, milliseconds: 0 }

// General Validation
console.log(isValidJson('{"valid": true}')); // true
```

---

## Modules & APIs

### 🌐 Browser (`browser`)

Utilities for feature detection, device capabilities, viewport scrolling, and tab focus.

| Function                            | Description                                                           |
| ----------------------------------- | --------------------------------------------------------------------- |
| `isTouchSupported()`                | Checks if the current device/browser supports touch events            |
| `isPushNotificationSupported()`     | Checks if Push Notifications and Service Workers are supported        |
| `isScrollBehaviorSupported()`       | Checks if native smooth scroll behavior is supported                  |
| `isShareSupported()`                | Checks if the Web Share API (`navigator.share`) is supported          |
| `isTabFocused()`                    | Checks whether the browser tab currently has focus                    |
| `tabFocusListener(onFocus, onBlur)` | Subscribes callbacks for window/tab focus and blur events             |
| `preferColorScheme()`               | Detects user color scheme preference (`'dark'`, `'light'`, or `null`) |
| `scrollToElement(element, options)` | Smoothly scrolls the window or container to a target element          |
| `scrollToPosition(options)`         | Smoothly scrolls to specific x/y coordinates                          |

---

### 🧱 DOM (`dom`)

Simplified element creation, event handling, and DOM placement.

| Function                                                 | Description                                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `createElement(tagName, props)`                          | Creates a DOM element with attributes, styles, dataset, ARIA, listeners, and children in a single call |
| `addEventListener(target, type, listener, options)`      | Attaches event listener(s) with support for multiple event types and array of targets                  |
| `addAsyncEventListener(target, type, listener, options)` | Attaches an asynchronous event listener                                                                |
| `addClickOutsideListener(element, callback)`             | Triggers a callback when clicking outside a specified element                                          |
| `appendBefore(target, element)`                          | Inserts an element immediately before the target node                                                  |
| `appendAfter(target, element)`                           | Inserts an element immediately after the target node                                                   |
| `fireEvent(element, eventName, detail)`                  | Dispatches a custom or native DOM event                                                                |
| `getElementOffset(element)`                              | Computes top, left, width, and height offsets relative to viewport/document                            |

#### `createElement` Example

```typescript
import { createElement } from 'tool-shack';

const button = createElement<HTMLButtonElement>('button', {
  className: 'btn primary',
  style: { backgroundColor: '#0070f3', color: '#fff' },
  aria: { label: 'Submit form' },
  dataset: { action: 'submit' },
  listeners: {
    click: () => console.log('Clicked!'),
  },
  children: ['Click Me'],
});

document.body.appendChild(button);
```

---

### 🔤 String (`string`)

String transformations, formatting, and sanitation.

| Function                           | Description                                                               |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `slugify(value, separator?)`       | Converts text into URL-safe slug with diacritics removal (default `-`)    |
| `removeDiacritics(value)`          | Strips accent marks and diacritics from text                              |
| `truncate(value, length, suffix?)` | Truncates a string to a given length and appends a suffix (default `...`) |
| `escapeHTML(value)`                | Escapes HTML entities (`&`, `<`, `>`, `"`, `'`)                           |
| `byteSize(value)`                  | Calculates the byte length of a string in UTF-8                           |

---

### ⏱️ Date & Time (`dateTime`)

Date formatting and duration parsing.

| Function                      | Description                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `parseDuration(durationInMs)` | Breaks down milliseconds into `{ days, hours, minutes, seconds, milliseconds }` |
| `dateAsIso(date?)`            | Formats a Date object as an ISO string (`YYYY-MM-DDTHH:mm:ss.sssZ`)             |

---

### ⚙️ General (`general`)

Value safety checks and JSON validation.

| Function             | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `isEmpty(value)`     | Checks if a string, array, map, set, or object is empty |
| `isNil(value)`       | Checks if a value is `null` or `undefined`              |
| `isValidJson(value)` | Validates whether a given string is valid JSON          |

---

### ⏳ Schedule (`schedule`)

Animation frames and async execution helpers.

| Function                     | Description                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `runAnimation(callback)`     | Executes a callback with `requestAnimationFrame` and returns a cancel function |
| `runAsync(callback, delay?)` | Runs a callback asynchronously (via microtask or `setTimeout`)                 |

---

## Documentation

Full API documentation and type definitions are available at:  
👉 **[https://storage.davidmyska.com/tool-shack/](https://storage.davidmyska.com/tool-shack/)**

---

## License

[MIT](https://opensource.org/licenses/MIT) © [David Myška](https://www.davidmyska.com/)
