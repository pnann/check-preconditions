# check-preconditions [![Build Status](https://travis-ci.org/pnann/check-preconditions.svg)](https://travis-ci.org/pnann/check-preconditions) ![npm dependencies](https://david-dm.org/pnann/check-preconditions.svg) [![Coverage Status](https://coveralls.io/repos/pnann/check-preconditions/badge.svg?branch=master&service=github)](https://coveralls.io/github/pnann/check-preconditions?branch=master)

> A small and simple ES3 compatible preconditions library for Node and the browser.

check-preconditions has zero dependencies and comes as both a CommonJS module and minified for the browser. It includes
type, existence, and equality checks with a convenient BDD-style API. Fully unit tested and ready to go.

## Installation

#### Node

```console
$ npm install check-preconditions
```

#### Browser

```html
<script src="check-preconditions.min.js"></script>
```

## Usage

```javascript
var CheckPreconditions = require("check-preconditions"); //For the minified version: window.CheckPreconditions
var check = CheckPreconditions.check;

var blah = null;
check(blah).is.a.string(); //Throws "Check failed: null was not a String"
check(blah, "blah").is.a.string(); //Throws "Check failed: blah (null) was not a String"
check(blah).is.not.a.string(); //OK!
```

A check will throw when its assertion fails and will otherwise do nothing. For instance, `check(null).is.a.string()`
will throw an Error, where `check(null).is.null()` will not.

`is`, `a`, and `an` can be used to make human readable checks, terminating in a function call defining the check itself.

`not` negates the check, so `check(null).is.not.a.string()` will not throw.

An optional name can be given with the object to check and will be included in the Error when thrown.

#### Named instances

An instance of `check` can be bound to a name, such as a class or module name. This is useful for tracking precondition
failures back to their source in situations where you don't have a stacktrace.

```javascript
var check = CheckPreconditions.of("Logger");

var blah = null;
check(blah).is.a.string(); //Throws "[Logger] Check failed: null was not a String"
check(blah, "blah").is.a.string(); //Throws "[Logger] Check failed: blah (null) was not a String"
check(blah).is.not.a.string(); //OK!
```
   
## API

See [check-preconditions.d.ts](check-preconditions.d.ts) for TypeScript type definitions.

```javascript
interface Check {

    /**
     * Passthrough properties, these have no affect on the instance. They can be called ad nauseum and in any order.
     *
     * check(blah).is.a.string();
     * check(blah).is.an.object();
     * //etc.
     */
    is: Check;
    a: Check;
    an: Check;

    /**
     * Inverts the instance's check. This can only be used once per Check instance, so you can't not not something.
     *
     * var blah = "blah!";
     *
     * check(blah).is.a.string(); //OK!
     * check(blah).is.not.a.string(); //Throws
     */
    not: Check;

    /**
     * Type checks. These will throw if the target is not of the given type. Number includes NaN.
     */
    function(): void;
    object(): void;
    number(): void;
    string(): void;
    array(): void;
    null(): void;
    undefined(): void;
    true(): void;
    false(): void;

    /**
     * Check that the target is empty. This check passes if the target is any of the following:
     *  - an object with no enumerable own properties.
     *  - an array with no elements
     *  - an empty string
     */
    empty(): void;

    /**
     * Check whether the target exists. This is defined as being neither null nor undefined.
     */
    exists(): void;
}

declare module "check-preconditions" {
    /**
     * Create a named Checker linked to the given baseName. This name is included in the Error thrown from all Checks
     * created from it.
     *
     * @param {string} baseName - A baseName to link created Checks to. Usually a Class or Module name.
     */
    export function of(baseName: string): (target: any, name?: string) => Check

    /**
     * Check the given target with an optional name. If a name is given it will be included in the Error thrown
     * when the Check fails.
     *
     * @param {any} target - A thing to check against.
     * @param {string} [name] - An optional name for the target.
     */
    export function check(target: any, name?: string): Check
}
```

## [License](LICENSE)
MIT
