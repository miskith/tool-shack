# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-09-02

### Added

#### 🌐 Browser

- `detectOS` - Detect client operating system (`ios`, `android`, `macos`, `windows`, `linux`, `unknown`).
- `downloadFile` - Trigger file download from string content or `Blob`.
- `getQueryParams` - Parse URL query parameters into an object.
- `networkStatusListener` - Subscribe to browser online/offline network events.
- `getCookie`, `setCookie`, `deleteCookie` - Cookie management with security and expiration options.
- `isTouchSupported`, `isPushNotificationSupported`, `isScrollBehaviorSupported`, `isShareSupported`, `isTabFocused` - Feature detection helpers.
- `preferColorScheme`, `preferDarkColorScheme`, `preferLightColorScheme` - Media color scheme preference detection.
- `scrollToElement`, `scrollToPosition` - Smooth scrolling utilities.
- `tabFocusListener` - Page visibility / tab focus change listener.

#### 💾 Storage

- `getLocalStorage`, `setLocalStorage`, `removeLocalStorage`, `clearLocalStorage` - Type-safe `localStorage` utilities with automatic JSON serialization and optional Unicode-safe Base64 encoding.
- `getSessionStorage`, `setSessionStorage`, `removeSessionStorage`, `clearSessionStorage` - Type-safe `sessionStorage` utilities with JSON serialization and optional Base64 encoding.

#### 🧱 DOM

- `createElement` - Fluent element creation with props, styles, dataset, ARIA attributes, listeners, and nested children.
- `addEventListener`, `addAsyncEventListener` - Multi-target and asynchronous delegated event listeners.
- `addClickOutsideListener` - Dismissal handling when clicking outside target elements.
- `appendBefore`, `appendAfter` - Sibling element insertion helpers.
- `copyToClipboard` - Copy text using the Clipboard API with fallback support.
- `fireEvent` - Dispatch standard or CustomEvent instances.
- `getElementOffset` - Compute element offsets relative to viewport and document.
- `isInViewport` - Viewport intersection check with boundary offset support.
- `toggleFullscreen` - Native fullscreen toggle for elements or document root.
- `toggleFullscreenWithFallback` - Fullscreen toggle with graceful CSS pseudo-fullscreen fallback for iOS Safari and unsupported environments.
- `waitForElement` - MutationObserver-based asynchronous element waiter.

#### 🔤 String

- `camelCase`, `capitalize`, `kebabCase`, `pascalCase`, `snakeCase` - String case transformations.
- `slugify`, `removeDiacritics` - URL slug generation with diacritic normalization.
- `encodeBase64`, `decodeBase64` - UTF-8 and Unicode-safe Base64 encoding and decoding.
- `formatBytes` - Human-readable byte sizing formatter (e.g. `'1.5 MB'`).
- `mask` - Mask sensitive characters in strings (e.g. cards, keys, tokens).
- `truncate` - String truncation with custom suffix support.
- `escapeHTML`, `unescapeHTML` - HTML entity encoding and decoding.
- `byteSize` - UTF-8 byte length calculation.
- `randomString`, `randomCryptoString` - Pseudo-random and cryptographically secure random string generators.

#### ⏱️ Date & Time

- `dateAsIso` - Format Date instance to standard ISO string.
- `isSameDay` - Calendar day comparison supporting Dates, timestamps, and ISO strings.
- `parseDuration` - Convert milliseconds into `{ days, hours, minutes, seconds, milliseconds }`.
- `timeAgo` - Human-readable relative time formatting using native `Intl.RelativeTimeFormat`.

#### ⚙️ General

- `chunk` - Split array into chunks of specified length.
- `clamp` - Constrain number within min/max bounds.
- `groupBy` - Group array items by key extractor callback.
- `isEmpty` - Empty checks for strings, arrays, objects, Maps, and Sets.
- `isEqual` - Deep structural equality comparison for primitives, objects, arrays, Dates, and RegExps.
- `isNil` - Check for `null` or `undefined`.
- `isValidJson` - Safely validate JSON string syntax.
- `pick` - Extract selected keys from an object with full TypeScript type inference.
- `unique` - Array deduplication by value or key selector.

#### ⏳ Schedule

- `debounce` - Debounce function execution with `.cancel()` handle.
- `throttle` - Throttle function execution with `.cancel()` handle.
- `retry` - Retry async operations with exponential backoff.
- `sleep` - Promise-based delay helper.
- `runAnimation` - `requestAnimationFrame` loop helper with cancel handle.
- `runAsync` - Run task in an isolated Web Worker.

#### 🏗️ Architecture & Tooling

- Dual module distribution: ESM (`dist/esm`) and CommonJS (`dist/cjs`).
- Tree-shakeable modular structure (`sideEffects: false`).
- 100% TypeScript with strict typings and zero `any`.
- Comprehensive unit test suite with 100+ tests via Vitest.
- Flat ESLint configuration with strict TypeScript and JSDoc rules.
- TypeDoc documentation generator.
