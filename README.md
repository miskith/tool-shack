# tool-shack

[![npm version](https://img.shields.io/npm/v/tool-shack.svg)](https://www.npmjs.com/package/tool-shack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A lightweight, zero-dependency TypeScript utility library providing essential helper functions for the browser, DOM manipulation, storage, strings, date/time formatting, scheduling, and general data validation.

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
import { slugify, parseDuration, createElement, isTouchSupported, isValidJson, timeAgo, formatBytes, setLocalStorage, getLocalStorage } from 'tool-shack';

// String manipulation
console.log(slugify('Hello World!')); // 'hello-world'
console.log(formatBytes(1572864)); // '1.5 MB'

// Storage
setLocalStorage('user', { name: 'Alice' });
console.log(getLocalStorage('user')); // { name: 'Alice' }

// Date & Time
console.log(parseDuration(3661000));
// { days: 0, hours: 1, minutes: 1, seconds: 1, milliseconds: 0 }
console.log(timeAgo(new Date(Date.now() - 5 * 60000))); // '5 minutes ago'

// General Validation
console.log(isValidJson('{"valid": true}')); // true
```

---

## Modules & APIs

### 🌐 Browser (`browser`)

Utilities for feature detection, device capabilities, cookies, downloads, URL parameters, and tab focus.

| Function                                     | Description                                                           |
| -------------------------------------------- | --------------------------------------------------------------------- |
| `detectOS()`                                 | Detects user operating system (`'ios'`, `'android'`, `'macos'`, etc.) |
| `isTouchSupported()`                         | Checks if the current device/browser supports touch events            |
| `isPushNotificationSupported()`              | Checks if Push Notifications and Service Workers are supported        |
| `isScrollBehaviorSupported()`                | Checks if native smooth scroll behavior is supported                  |
| `isShareSupported()`                         | Checks if the Web Share API (`navigator.share`) is supported          |
| `isTabFocused()`                             | Checks whether the browser tab currently has focus                    |
| `tabFocusListener(onFocus, onBlur)`          | Subscribes callbacks for window/tab focus and blur events             |
| `preferColorScheme()`                        | Detects user color scheme preference (`'dark'`, `'light'`, or `null`) |
| `scrollToElement(element, options)`          | Smoothly scrolls the window or container to a target element          |
| `scrollToPosition(options)`                  | Smoothly scrolls to specific x/y coordinates                          |
| `downloadFile(data, filename, mimeType?)`    | Programmatically triggers file download in the browser                |
| `getQueryParams(url?)`                       | Extracts URL search query parameters into a key-value object          |
| `networkStatusListener(onOnline, onOffline)` | Subscribes to browser online/offline events with cleanup handle       |
| `getCookie(name)`                            | Retrieves and decodes a cookie value by name                          |
| `setCookie(name, value, options?)`           | Sets a browser cookie with days, path, domain, secure, and sameSite   |
| `deleteCookie(name, options?)`               | Deletes a browser cookie by name                                      |

---

### 💾 Storage (`storage`)

Type-safe `localStorage` and `sessionStorage` helpers with automatic JSON serialization and exception safety.

| Function                            | Description                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------- |
| `getLocalStorage(key, fallback?)`   | Retrieves item from localStorage with automatic JSON parsing                |
| `setLocalStorage(key, value)`       | Stores item in localStorage with automatic JSON serialization               |
| `removeLocalStorage(key)`           | Removes item from localStorage                                              |
| `clearLocalStorage()`               | Clears all items from localStorage                                          |
| `getSessionStorage(key, fallback?)` | Retrieves item from sessionStorage with automatic JSON parsing              |
| `setSessionStorage(key, value)`     | Stores item in sessionStorage with automatic JSON serialization             |
| `removeSessionStorage(key)`         | Removes item from sessionStorage                                            |
| `clearSessionStorage()`             | Clears all items from sessionStorage                                        |

---

### 🧱 DOM (`dom`)

Simplified element creation, async/outside event handling, clipboard operations, viewport detection, layout-shift-free scroll lock, and fullscreen.

| Function                                                 | Description                                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `createElement(tagName, props)`                          | Creates a DOM element with attributes, styles, dataset, ARIA, listeners, and children in a single call |
| `addEventListener(target, type, listener, options)`      | Attaches event listener(s) with support for multiple event types and array of targets                  |
| `addAsyncEventListener(target, type, listener, options)` | Attaches an asynchronous delegated event listener                                                      |
| `addClickOutsideListener(element, callback)`             | Triggers a callback when clicking outside a specified element                                          |
| `appendBefore(target, element)`                          | Inserts an element immediately before the target node                                                  |
| `appendAfter(target, element)`                           | Inserts an element immediately after the target node                                                   |
| `copyToClipboard(text)`                                  | Copies text to clipboard via Clipboard API with legacy fallback                                        |
| `fireEvent(element, eventName, detail)`                  | Dispatches a custom or native DOM event                                                                |
| `getElementOffset(element)`                              | Computes top, left, width, and height offsets relative to viewport/document                            |
| `isInViewport(element, offset?)`                         | Checks if an element is currently within the visible viewport                                          |
| `toggleFullscreen(element?)`                             | Toggles native fullscreen mode for an element or document root                                         |
| `toggleFullscreenWithFallback(element?, options?)`       | Toggles fullscreen with CSS pseudo-fullscreen fallback for iOS Safari and unsupported browsers        |
| `waitForElement(selector, timeout?, parent?)`            | Waits for an element to appear in the DOM using `MutationObserver`                                     |

---

### 🔤 String (`string`)

Case conversions, string transformations, formatting, escaping, masking, and random string generators.

| Function                                | Description                                                               |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `camelCase(value)`                      | Converts string to `camelCase`                                            |
| `capitalize(value)`                     | Capitalizes the first character of a string                               |
| `decodeBase64(value)`                   | Safely decodes a Base64 string to a Unicode string                        |
| `encodeBase64(value)`                   | Safely encodes a Unicode string to a Base64 string                        |
| `kebabCase(value)`                      | Converts string to `kebab-case`                                           |
| `pascalCase(value)`                     | Converts string to `PascalCase`                                           |
| `snakeCase(value)`                      | Converts string to `snake_case`                                           |
| `slugify(value, separator?)`            | Converts text into URL-safe slug with diacritics removal (default `-`)    |
| `removeDiacritics(value)`               | Strips accent marks and diacritics from text                              |
| `truncate(value, length, suffix?)`      | Truncates a string to a given length and appends a suffix (default `...`) |
| `mask(value, options?)`                 | Masks sensitive string characters (e.g. for card numbers or tokens)       |
| `formatBytes(bytes, decimals?)`         | Formats byte number into readable string (`'1.5 MB'`, `'2 KB'`)           |
| `escapeHTML(value)`                     | Escapes HTML entities (`&`, `<`, `>`, `"`, `'`)                           |
| `unescapeHTML(value)`                   | Unescapes HTML entities back to plain text                                |
| `byteSize(value)`                       | Calculates the byte length of a string in UTF-8                           |
| `randomString(length?, charset?)`       | Generates random string using `Math.random`                               |
| `randomCryptoString(length?, charset?)` | Generates cryptographically secure random string using Web Crypto API     |

---

### ⏱️ Date & Time (`dateTime`)

Date formatting, duration parsing, relative time, and calendar day comparison.

| Function                      | Description                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `parseDuration(durationInMs)` | Breaks down milliseconds into `{ days, hours, minutes, seconds, milliseconds }` |
| `dateAsIso(date?)`            | Formats a Date object as an ISO string (`YYYY-MM-DDTHH:mm:ss.sssZ`)             |
| `timeAgo(date, locale?)`      | Formats a date into a human-readable relative string (`'5 minutes ago'`)        |
| `isSameDay(date1, date2)`     | Checks if two dates fall on the same calendar day                               |

---

### ⚙️ General (`general`)

Array deduplication, picking, grouping & chunking, deep equality, number clamping, value safety checks, and JSON validation.

| Function                 | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `pick(object, keys)`     | Creates object composed of picked object properties     |
| `unique(array, keyFn?)`  | Deduplicates array items by reference or key callback   |
| `isEqual(a, b)`          | Performs deep structural comparison between two values  |
| `clamp(value, min, max)` | Constrains a number between min and max boundaries      |
| `groupBy(array, keyFn)`  | Groups array elements into an object by key             |
| `chunk(array, size?)`    | Splits array into chunks of specified size              |
| `isEmpty(value)`         | Checks if a string, array, map, set, or object is empty |
| `isNil(value)`           | Checks if a value is `null` or `undefined`              |
| `isValidJson(value)`     | Validates whether a given string is valid JSON          |

---

### ⏳ Schedule (`schedule`)

Debouncing, throttling, async retry, sleep, and animation frames.

| Function                             | Description                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| `debounce(fn, delay?)`               | Creates debounced function with `.cancel()` handle                             |
| `throttle(fn, limit?)`               | Creates throttled function with `.cancel()` handle                             |
| `sleep(ms)`                          | Promise-based delay helper (`await sleep(500)`)                                |
| `retry(fn, options?)`                | Retries async function with exponential backoff before failing                 |
| `runAnimation(callback, autoStart?)` | Executes a callback with `requestAnimationFrame` and returns a cancel function |
| `runAsync(callback)`                 | Runs a callback asynchronously in a Web Worker                                 |

---

## Documentation

Full API documentation and type definitions are available at:  
👉 **[https://storage.davidmyska.com/tool-shack/](https://storage.davidmyska.com/tool-shack/)**

---

## License

[MIT](https://opensource.org/licenses/MIT) © [David Myška](https://www.davidmyska.com/)
