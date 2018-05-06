"use strict";
exports.__esModule = true;
/**
 * A simple class for checking preconditions. Users don't create this directly but rather use CheckStatic, which exposes
 * convenient helpers for creating Check instances.
 *
 * A check is terminated in a call to one of its assertion methods, for instance {@link Check#object}. The check will
 * throw when its assertion fails and will otherwise do nothing.
 */
var Check = /** @class */ (function () {
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
    Check.of = function (baseName) {
        return function (target, targetName) { return new Check(baseName, target, targetName); };
    };
    Check.check = function (target, targetName) {
        return new Check(null, target, targetName);
    };
    Check.prototype["function"] = function () {
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
    Check.prototype["null"] = function () {
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
    Check.prototype["true"] = function () {
        return this.verify(this.target === true, "true");
    };
    Check.prototype["false"] = function () {
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
exports.Check = Check;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSDtJQU9JOzs7OztPQUtHO0lBQ0gsZUFBWSxRQUFnQixFQUFFLE1BQVMsRUFBRSxVQUFtQixFQUFFLE9BQWlCO1FBa0J4RSxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ1YsTUFBQyxHQUFHLElBQUksQ0FBQztRQUNULE9BQUUsR0FBRyxJQUFJLENBQUM7UUFuQmIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUQ7SUFDTCxDQUFDO0lBRU0sUUFBRSxHQUFULFVBQWEsUUFBZ0I7UUFDekIsT0FBTyxVQUFDLE1BQVMsRUFBRSxVQUFtQixJQUFLLE9BQUEsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQztJQUN2RixDQUFDO0lBRU0sV0FBSyxHQUFaLFVBQWdCLE1BQVMsRUFBRSxVQUFtQjtRQUMxQyxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQU9NLGdCQUFBLFVBQVEsQ0FBQSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxzQkFBTSxHQUFiO1FBQ0ksT0FBTyxJQUFJ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