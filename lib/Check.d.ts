/**
 * A simple class for checking preconditions. Users don't create this directly but rather use CheckStatic, which exposes
 * convenient helpers for creating Check instances.
 *
 * A check is terminated in a call to one of its assertion methods, for instance {@link Check#object}. The check will
 * throw when its assertion fails and will otherwise do nothing.
 */
declare class Check<T> {
    private readonly target;
    private readonly targetName;
    private readonly baseName;
    private readonly negated;
    /**
     * @param {string} baseName - The base name to link this instance to. Can be null.
     * @param {any} target - The target to run the check against.
     * @param {string} [targetName] - An optional target name to include if the check fails.
     * @param {boolean} [negated] - Whether or not this check should be negated.
     */
    constructor(baseName: string, target: T, targetName?: string, negated?: boolean);
    static of(baseName: string): <T>(target: T, targetName?: string) => Check<T>;
    static check<T>(target: T, targetName?: string): Check<T>;
    is: this;
    a: this;
    an: this;
    not: Check<T>;
    function(): T;
    object(): T;
    number(): T;
    string(): T;
    array(): T;
    null(): T;
    undefined(): T;
    empty(): T;
    exists(): T;
    true(): T;
    false(): T;
    greaterThan(num: number): T;
    greaterThanOrEqualTo(num: number): T;
    lessThan(num: number): T;
    lessThanOrEqualTo(num: number): T;
    between(floor: number, ceiling: number): T;
    within(floor: number, ceiling: number): T;
    gt: (num: number) => T;
    gte: (num: number) => T;
    lt: (num: number) => T;
    lte: (num: number) => T;
    private checkType;
    /**
     * Check whether or not the target is of the given type. This is done using toString in order to get around the
     * issues with JavaScript typeof checking.
     *
     * @param {string} type - The type string to compare against.
     */
    private isType;
    private hasProperties;
    private verify;
}
export { Check };
