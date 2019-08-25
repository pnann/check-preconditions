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
exports.Check = Check;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSDtJQU9JOzs7OztPQUtHO0lBQ0gsZUFBWSxRQUFnQixFQUFFLE1BQVMsRUFBRSxVQUFtQixFQUFFLE9BQWlCO1FBa0J4RSxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ1YsTUFBQyxHQUFHLElBQUksQ0FBQztRQUNULE9BQUUsR0FBRyxJQUFJLENBQUM7UUF3RWpCLCtCQUErQjtRQUN4QixPQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN0QixRQUFHLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ2hDLE9BQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ25CLFFBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUEvRmhDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUVNLFFBQUUsR0FBVCxVQUFVLFFBQWdCO1FBQ3RCLE9BQU8sVUFBSSxNQUFTLEVBQUUsVUFBbUIsSUFBSyxPQUFBLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQXZDLENBQXVDLENBQUM7SUFDMUYsQ0FBQztJQUVNLFdBQUssR0FBWixVQUFnQixNQUFTLEVBQUUsVUFBbUI7UUFDMUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFPTSxnQkFBQSxVQUFRLENBQUEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sc0JBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sc0JBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sc0JBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0scUJBQUssR0FBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sZ0JBQUEsTUFBSSxDQUFBLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLHlCQUFTLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLHFCQUFLLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsSUFBVyxJQUFJLENBQUMsTUFBTyxLQUFLLEVBQUU7ZUFDcEcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFXLElBQUksQ0FBQyxNQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BJLENBQUM7SUFFTSxzQkFBTSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBRU0sZ0JBQUEsTUFBSSxDQUFBLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQVEsSUFBSSxDQUFDLE1BQU8sS0FBSyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLGdCQUFBLE9BQUssQ0FBQSxHQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFRLElBQUksQ0FBQyxNQUFPLEtBQUssS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSwyQkFBVyxHQUFsQixVQUFtQixHQUFXO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBUSxJQUFJLENBQUMsTUFBTyxHQUFHLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sb0NBQW9CLEdBQTNCLFVBQTRCLEdBQVc7UUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFRLElBQUksQ0FBQyxNQUFPLElBQUksR0FBRyxFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVNLHdCQUFRLEdBQWYsVUFBZ0IsR0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQVEsSUFBSSxDQUFDLE1BQU8sR0FBRyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLGlDQUFpQixHQUF4QixVQUF5QixHQUFXO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBUSxJQUFJLENBQUMsTUFBTyxJQUFJLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSx1QkFBTyxHQUFkLFVBQWUsS0FBYSxFQUFFLE9BQWU7UUFDekMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFRLElBQUksQ0FBQyxNQUFPLEdBQUcsS0FBSyxJQUFXLElBQUksQ0FBQyxNQUFPLEdBQUcsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDNUcsQ0FBQztJQUVNLHNCQUFNLEdBQWIsVUFBYyxLQUFhLEVBQUUsT0FBZTtRQUN4QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQVEsSUFBSSxDQUFDLE1BQU8sSUFBSSxLQUFLLElBQVcsSUFBSSxDQUFDLE1BQU8sSUFBSSxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUM3RyxDQUFDO0lBUU8seUJBQVMsR0FBakIsVUFBa0IsSUFBWTtRQUMxQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFLLElBQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHNCQUFNLEdBQWQsVUFBZSxJQUFZO1FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLGFBQVcsSUFBSSxNQUFHLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU8sNkJBQWEsR0FBckI7UUFDSSxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLHNCQUFNLEdBQWQsVUFBZSxXQUFvQixFQUFFLFVBQWtCO1FBQ25ELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtZQUMzQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFJLElBQUksQ0FBQyxRQUFRLE9BQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzFELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFJLElBQUksQ0FBQyxVQUFVLFVBQUssSUFBSSxDQUFDLE1BQU0sTUFBRyxDQUFDLENBQUMsQ0FBQyxLQUFHLElBQUksQ0FBQyxNQUFRLENBQUM7WUFDMUYsTUFBTSxJQUFJLEtBQUssQ0FBSSxNQUFNLHNCQUFpQixNQUFNLGNBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUcsVUFBWSxDQUFDLENBQUM7U0FDdEc7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLEFBaEpELElBZ0pDO0FBRU8sc0JBQUsifQ==