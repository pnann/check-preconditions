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
        // Aliases for numerical checks
        this.gt = this.greaterThan;
        this.gte = this.greaterThanOrEqualTo;
        this.lt = this.lessThan;
        this.lte = this.lessThanOrEqualTo;
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
    Check.prototype.greaterThan = function (num) {
        return this.verify(this.target > num, "greater than");
    };
    Check.prototype.greaterThanOrEqualTo = function (num) {
        return this.verify(this.target >= num, "greater than or equal to");
    };
    Check.prototype.lessThan = function (num) {
        return this.verify(this.target < num, "less than");
    };
    Check.prototype.lessThanOrEqualTo = function (num) {
        return this.verify(this.target <= num, "less than or equal to");
    };
    Check.prototype.between = function (floor, ceiling) {
        return this.verify(this.target > floor && this.target < ceiling, "between (exclusive)");
    };
    Check.prototype.within = function (floor, ceiling) {
        return this.verify(this.target >= floor && this.target <= ceiling, "within (inclusive)");
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
export { Check };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0g7SUFPSTs7Ozs7T0FLRztJQUNILGVBQVksUUFBZ0IsRUFBRSxNQUFTLEVBQUUsVUFBbUIsRUFBRSxPQUFpQjtRQWtCeEUsT0FBRSxHQUFHLElBQUksQ0FBQztRQUNWLE1BQUMsR0FBRyxJQUFJLENBQUM7UUFDVCxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBd0VqQiwrQkFBK0I7UUFDeEIsT0FBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdEIsUUFBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUNoQyxPQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNuQixRQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBL0ZoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDtJQUNMLENBQUM7SUFFTSxRQUFFLEdBQVQsVUFBVSxRQUFnQjtRQUN0QixPQUFPLFVBQUksTUFBUyxFQUFFLFVBQW1CLElBQUssT0FBQSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0lBQzFGLENBQUM7SUFFTSxXQUFLLEdBQVosVUFBZ0IsTUFBUyxFQUFFLFVBQW1CO1FBQzFDLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFB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