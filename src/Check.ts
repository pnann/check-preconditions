/**
 * A simple class for checking preconditions. Users don't create this directly but rather use CheckStatic, which exposes
 * convenient helpers for creating Check instances.
 *
 * A check is terminated in a call to one of its assertion methods, for instance {@link Check#object}. The check will
 * throw when its assertion fails and will otherwise do nothing.
 */
class Check {

    private target: any;
    private targetName: string;
    private baseName: string;
    private negated: boolean;

    /**
     * @param {string} baseName - The base name to link this instance to. Can be null.
     * @param {any} target - The target to run the check against.
     * @param {string} [targetName] - An optional target name to include if the check fails.
     * @param {boolean} [negated] - Whether or not this check should be negated.
     */
    constructor(baseName: string, target: any, targetName?: string, negated?: boolean) {
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
    public not: Check;

    public function(): void {
        return this.checkType("Function");
    }

    public object(): void {
        return this.checkType("Object");
    }

    public number(): void {
        return this.checkType("Number");
    }

    public string(): void {
        return this.checkType("String");
    }

    public array(): void {
        return this.checkType("Array");
    }

    public null(): void {
        return this.verify(this.target === null, "null");
    }

    public undefined(): void {
        return this.verify(typeof this.target === "undefined", "undefined");
    }

    public empty(): void {
        return this.verify(this.target === null || typeof this.target === "undefined" || this.target === ""
            || (this.isType("Array") && this.target.length === 0) || (this.isType("Object") && !this.hasProperties()), "empty");
    }

    public exists(): void {
        return this.verify(typeof this.target !== "undefined" && this.target !== null, "null or undefined");
    }

    public true(): void {
        return this.verify(this.target === true, "true");
    }

    public false(): void {
        return this.verify(this.target === false, "false");
    }

    private checkType(type: string) {
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

    private verify(conditional: boolean, caseString: string) {
        if (this.negated ? conditional : !conditional) {
            var prefix = this.baseName ? `[${this.baseName}] ` : "";
            var target = this.targetName ? `${this.targetName} (${this.target})` : `${this.target}`;
            throw new Error(`${prefix}Check failed: ${target} was ${this.negated ? "" : "not "}${caseString}`);
        }
    }
}

export = Check;