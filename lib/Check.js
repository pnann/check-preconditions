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
export { Check };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0g7SUFPSTs7Ozs7T0FLRztJQUNILGVBQVksUUFBZ0IsRUFBRSxNQUFTLEVBQUUsVUFBbUIsRUFBRSxPQUFpQjtRQWtCeEUsT0FBRSxHQUFHLElBQUksQ0FBQztRQUNWLE1BQUMsR0FBRyxJQUFJLENBQUM7UUFDVCxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBbkJiLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUVNLFFBQUUsR0FBVCxVQUFhLFFBQWdCO1FBQ3pCLE9BQU8sVUFBQyxNQUFTLEVBQUUsVUFBbUIsSUFBSyxPQUFBLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQXZDLENBQXVDLENBQUM7SUFDdkYsQ0FBQztJQUVNLFdBQUssR0FBWixVQUFnQixNQUFTLEVBQUUsVUFBbUI7UUFDMUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFPTSxnQkFBQSxVQUFRLENBQUEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sc0JBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNB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