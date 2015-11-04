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
