import * as chai from "chai";
import {chain, contains, keys} from "underscore";
import {Check} from "../src/Check";

const expect = chai.expect;

type NumericalCheckAliases =
    "greaterThan"
    | "gt"
    | "greaterThanOrEqualTo"
    | "gte"
    | "lessThan"
    | "lt"
    | "lessThanOrEqualTo"
    | "lte";

describe("Check", function () {
    const BASE_NAME = "TEST";
    const mockObject = {};
    const mockArray = [];

    const baseClass = function () {
        this.blah = "blah"
    };
    const extendedClass = function () {
    };
    extendedClass.prototype = new baseClass();
    const mockExtendedObject = (new extendedClass());

    const testData = {
        "function": [function () {
        }],
        "object": [mockObject, mockExtendedObject, {"blah": "blah"}],
        "number": [-1, -0.666, 0, 0.666, 1],
        "string": ["", "blah"],
        "array": [mockArray, [0], ["string"]],
        "null": [null],
        "undefined": [undefined],
        "empty": [null, undefined, mockObject, mockArray, mockExtendedObject, ""]
    };

    const wonkyMap = {
        trueList: [1, "1", [1]],
        falseList: [0, "0", "", [], [[]], [0]]
    };

    /**
     * Checks that for the given testKey, all values given throw and don't throw as expected.
     *
     * @param {string} testKey - The string form of the terminator function to call. For example: function would call .function()
     * @param {any[]} values - An array of values to check against.
     * @param {boolean} negated - Whether or not this test should check the negated case.
     */
    const runExpectedTest = function (testKey: string, values: any[], negated: boolean) {
        for (const value of values) {
            for (const baseName of [BASE_NAME, null, undefined]) {
                expect(function () {
                    const result = new Check(baseName, value, testKey, negated)[testKey]();
                    expect(result).to.equal(value);
                }).to.not.throw();

                expect(function () {
                    new Check(baseName, value, testKey, !negated)[testKey]();
                }).to.throw();
            }
        }
    };

    describe("type checks", function () {
        keys(testData).forEach(function (testKey) {
            describe(testKey, function () {
                it(`should properly handle ${testKey} values`, function () {
                    const values = testData[testKey];
                    runExpectedTest(testKey, values, false);
                });

                it(`should properly handle non-${testKey} values`, function () {
                    const values = <any> chain(testData).values().flatten(true).uniq().reject(function (value) {
                        return contains(testData[testKey], value);
                    }).value();
                    runExpectedTest(testKey, values, true);
                });
            });
        });
    });

    describe("exists", function () {
        it("should properly handle non null or undefined values", function () {
            const values = <any> chain(testData).values().flatten(true).uniq().filter(function (value) {
                return value !== null && value !== undefined
            }).value();

            runExpectedTest("exists", values, false);
        });

        it("should properly handle null or undefined values", function () {
            runExpectedTest("exists", [null, undefined], true);
        });
    });

    describe("true", function () {
        it("should properly handle truthiness", function () {
            expect(function () {
                const result = new Check(BASE_NAME, true).is.true();
                expect(result).is.true;
            }).to.not.throw();

            for (const value of wonkyMap.trueList) {
                expect(function () {
                    new Check(BASE_NAME, value).is.true();
                }).to.throw();
            }
        });
    });

    describe("false", function () {
        it("should properly handle falsiness", function () {
            expect(function () {
                const result = new Check(BASE_NAME, false).is.false();
                expect(result).is.false;
            }).to.not.throw();

            for (const value of wonkyMap.falseList) {
                expect(function () {
                    new Check(BASE_NAME, value).is.false();
                }).to.throw();
            }
        });
    });

    describe("basic numerical checks", function () {
        const runNumericalTest = (aliases: NumericalCheckAliases[], targetValue: number, successValues: number[], failValues: number[]) => {
            for (const alias of aliases) {
                for (const successValue of successValues) {
                    const result = new Check(BASE_NAME, targetValue).is[alias](successValue);
                    expect(result).to.equal(targetValue);
                }

                for (const failValue of failValues) {
                    expect(function () {
                        const result = new Check(BASE_NAME, targetValue).is[alias](failValue);
                    }).to.throw();
                }
            }
        };

        describe("greaterThan", function () {
            runNumericalTest(["greaterThan", "gt"], 1, [-1, 0], [1, 2]);
        });

        describe("greaterThanOrEqualTo", function () {
            runNumericalTest(["greaterThanOrEqualTo", "gte"], 1, [0, 1], [2]);
        });

        describe("lessThan", function () {
            runNumericalTest(["lessThan", "lt"], 1, [2], [0, 1]);
        });

        describe("greaterThanOrEqualTo", function () {
            runNumericalTest(["lessThanOrEqualTo", "lte"], 1, [1, 2], [0]);
        });
    });

    describe("numerical range checks", function () {
        const runNumericalTest = (alias: ("between" | "within"), targetValue: number, successValues: [number, number][], failValues: [number, number][]) => {
            for (const successValue of successValues) {
                const result = new Check(BASE_NAME, targetValue).is[alias](successValue[0], successValue[1]);
                expect(result).to.equal(targetValue);
            }

            for (const failValue of failValues) {
                expect(function () {
                    const result = new Check(BASE_NAME, targetValue).is[alias](failValue[0], failValue[1]);
                }).to.throw();
            }
        };

        describe("between", function () {
            runNumericalTest("between", 1, [[0, 2]], [[0, 1], [1, 2], [2, 3]]);
            runNumericalTest("between", 1.5, [[1, 2]], [[1, 1.5], [1.5, 2]]);
        });

        describe("within", function () {
            runNumericalTest("within", 1, [[0, 2], [1, 2], [0, 1]], [[-1, 0], [2, 3]]);
            runNumericalTest("within", 1.5, [[1, 2], [1, 1.5], [1.5, 2]], []);
        });
    });

    describe("Check.of", function () {
        it("should returns a function which when called will create a Check instance", () => {
            const check = Check.of(BASE_NAME);
            const target = "target";
            const targetName = "target-name";

            const result = check(target, targetName);
            expect(result).is.an.instanceOf(Check);
        });

        it("should return a function which when called will create a Check instance, even if no targetName is given", () => {
            const check = Check.of(BASE_NAME);
            const target = "target";

            const result = check(target);
            expect(result).is.an.instanceOf(Check);
        });
    });

    describe("Check.check", function () {
        it("should returns a Check instance", () => {
            const target = "target";
            const targetName = "target-name";
            const result = Check.check(target, targetName);

            expect(result).is.an.instanceOf(Check);
        });

        it("should returns a Check instance, even if no targetName is given", () => {
            const target = "target";
            const result = Check.check(target);

            expect(result).is.an.instanceOf(Check);
        });
    });
});
