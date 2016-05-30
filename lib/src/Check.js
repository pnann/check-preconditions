"use strict";
/**
 * A simple class for checking preconditions. Users don't create this directly but rather use CheckStatic, which exposes
 * convenient helpers for creating Check instances.
 *
 * A check is terminated in a call to one of its assertion methods, for instance {@link Check#object}. The check will
 * throw when its assertion fails and will otherwise do nothing.
 */
var Check = (function () {
    /**
     * @param {string} baseName - The base name to link this instance to. Can be null.
     * @param {any} target - The target to run the check against.
     * @param {string} [targetName] - An optional target name to include if the check fails.
     * @param {boolean} [negated] - Whether or not this check should be negated.
     */
    function Check(baseName, target, targetName, negated) {
        this.is = this;
        this.a = this;
        this.an = this;
        this.baseName = baseName;
        this.target = target;
        this.targetName = targetName;
        this.negated = negated;
        if (!negated) {
            this.not = new Check(baseName, target, targetName, true);
        }
    }
    Check.prototype.function = function () {
        return this.checkType("Function");
    };
    Check.prototype.object = function () {
        return this.checkType("Object");
    };
    Check.prototype.number = function () {
        return this.checkType("Number");
    };
    Check.prototype.string = function () {
        return this.checkType("String");
    };
    Check.prototype.array = function () {
        return this.checkType("Array");
    };
    Check.prototype.null = function () {
        return this.verify(this.target === null, "null");
    };
    Check.prototype.undefined = function () {
        return this.verify(typeof this.target === "undefined", "undefined");
    };
    Check.prototype.empty = function () {
        return this.verify(this.target === null || typeof this.target === "undefined" || this.target === ""
            || (this.isType("Array") && this.target.length === 0) || (this.isType("Object") && !this.hasProperties()), "empty");
    };
    Check.prototype.exists = function () {
        return this.verify(typeof this.target !== "undefined" && this.target !== null, "defined and non-null");
    };
    Check.prototype.true = function () {
        return this.verify(this.target === true, "true");
    };
    Check.prototype.false = function () {
        return this.verify(this.target === false, "false");
    };
    Check.prototype.checkType = function (type) {
        return this.verify(this.isType(type), "a " + type);
    };
    /**
     * Check whether or not the target is of the given type. This is done using toString in order to get around the
     * issues with JavaScript typeof checking.
     *
     * @param {string} type - The type string to compare against.
     */
    Check.prototype.isType = function (type) {
        return (Object.prototype.toString.call(this.target) === "[object " + type + "]");
    };
    Check.prototype.hasProperties = function () {
        for (var prop in this.target) {
            if (this.target.hasOwnProperty(prop)) {
                return true;
            }
        }
        return false;
    };
    Check.prototype.verify = function (conditional, caseString) {
        if (this.negated ? conditional : !conditional) {
            var prefix = this.baseName ? "[" + this.baseName + "] " : "";
            var target = this.targetName ? this.targetName + " (" + this.target + ")" : "" + this.target;
            throw new Error(prefix + "Check failed: " + target + " was " + (this.negated ? "" : "not ") + caseString);
        }
        return this.target;
    };
    return Check;
}());
module.exports = Check;
