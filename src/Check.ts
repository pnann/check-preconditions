/**
 * A simple class for checking preconditions. Users don't create this directly but rather use CheckStatic, which exposes
 * convenient helpers for creating Check instances.
 *
 * A check is terminated in a call to one of its assertion methods, for instance {@link Check#object}. The check will
 * throw when its assertion fails and will otherwise do nothing.
 */
class Check<T> {

    private target: T;
    private targetName: string;
    private baseName: string;
    private negated: boolean;

    /**
     * @param {string} baseName - The base name to link this instance to. Can be null.
     * @param {any} target - The target to run the check against.
     * @param {string} [targetName] - An optional target name to include if the check fails.
     * @param {boolean} [negated] - Whether or not this check should be negated.
     */
    constructor(baseName: string, target: T, targetName?: string, negated?: boolean) {
        this.baseName = baseName;
        this.target = target;
        this.targetName = targetName;
        this.negated = negated;
        if(!negated) {
            this.not = new Check(baseName, target, targetName, true);
        }
    }

    public is = this;
    public a = this;
    public an = this;
    public not: Check<T>;

    public function(): T {
        return this.checkType("Function");
    }

    public object(): T {
        return this.checkType("Object");
    }

    public number(): T {
        return this.checkType("Number");
    }

    public string(): T {
        return this.checkType("String");
    }

    public array(): T {
        return this.checkType("Array");
    }

    public null(): T {
        return this.verify(this.target === null, "null");
    }

    public undefined(): T {
        return this.verify(typeof this.target === "undefined", "undefined");
    }

    public empty(): T {
        return this.verify(this.target === null || typeof this.target === "undefined" || (<any> this.target) === ""
            || (this.isType("Array") && (<any> this.target).length === 0) || (this.isType("Object") && !this.hasProperties()), "empty");
    }

    public exists(): T {
        return this.verify(typeof this.target !== "undefined" && this.target !== null, "defined and non-null");
    }

    public true(): T {
        return this.verify((<any> this.target) === true, "true");
    }

    public false(): T {
        return this.verify((<any> this.target) === false, "false");
    }

    private checkType(type: string): T {
        return this.verify(this.isType(type), `a ${type}`);
    }

    /**
     * Check whether or not the target is of the given type. This is done using toString in order to get around the
     * issues with JavaScript typeof checking.
     *
     * @param {string} type - The type string to compare against.
     */
    private isType(type: string): boolean {
        return (Object.prototype.toString.call(this.target) === `[object ${type}]`);
    }

    private hasProperties(): boolean {
        for (var prop in this.target) {
            if (this.target.hasOwnProperty(prop)) {
                return true;
            }
        }

        return false;
    }

    private verify(conditional: boolean, caseString: string): T {
        if (this.negated ? conditional : !conditional) {
            var prefix = this.baseName ? `[${this.baseName}] ` : "";
            var target = this.targetName ? `${this.targetName} (${this.target})` : `${this.target}`;
            throw new Error(`${prefix}Check failed: ${target} was ${this.negated ? "" : "not "}${caseString}`);
        }

        return this.target;
    }
}

export = Check;