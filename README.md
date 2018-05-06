# check-preconditions [![Build Status](https://travis-ci.org/pnann/check-preconditions.svg)](https://travis-ci.org/pnann/check-preconditions) ![npm dependencies](https://david-dm.org/pnann/check-preconditions.svg) [![Coverage Status](https://coveralls.io/repos/pnann/check-preconditions/badge.svg?branch=master&service=github)](https://coveralls.io/github/pnann/check-preconditions?branch=master)

[![Greenkeeper badge](https://badges.greenkeeper.io/pnann/check-preconditions.svg)](https://greenkeeper.io/)

> A small and simple preconditions library for Node and the browser.

`check-preconditions` enables easy addition of preconditions to any package, whether ES6, CommonJS, or directly in the 
browser. With zero dependencies and is <1KB gzipped, it includes type, existence, and equality checks with a convenient 
BDD-style API. Fully unit tested and ready to go.

## Installation

#### Node

```console
$ npm install check-preconditions
```

#### Browser

```html
<script src="lib/check-preconditions.min.js"></script>
```

## Usage

```javascript
var CheckPreconditions = require("check-preconditions"); // For the minified version: window.CheckPreconditions
var check = CheckPreconditions.check;

var blah = null;
check(blah).is.a.string(); // Throws "Check failed: null was not a String"
check(blah, "blah").is.a.string(); // Throws "Check failed: blah (null) was not a String"
check(blah).is.not.a.string(); // OK!

var result = check(blah).is.null(); // OK! All checks return the value passed in, so result === blah.
```

A check will throw when its assertion fails and will otherwise do nothing. For instance, `check(null).is.a.string()`
will throw an Error, where `check(null).is.null()` will not.

`is`, `a`, and `an` can be used to make human readable checks, terminating in a function call defining the check itself.

`not` negates the check, so `check(null).is.not.a.string()` will not throw.

An optional name can be given with the object to check and will be included in the Error when thrown. All checks return
the original value passed in and typing is preserved for TypeScript consumers.

#### Named instances

An instance of `check` can be bound to a name, such as a class or module name. This is useful for tracking precondition
failures back to their source in situations where you don't have a stacktrace.

```javascript
var check = CheckPreconditions.of("Logger");

var blah = null;
check(blah).is.a.string(); // Throws "[Logger] Check failed: null was not a String"
check(blah, "blah").is.a.string(); // Throws "[Logger] Check failed: blah (null) was not a String"
check(blah).is.not.a.string(); // OK!

var result = check(blah).is.null(); // OK! All checks return the value passed in, so result === blah.
```

## API

See [index.d.ts](lib/index.d.ts) for TypeScript type definitions.

## [License](LICENSE)
MIT
