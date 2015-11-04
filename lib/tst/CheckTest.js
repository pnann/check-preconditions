/// <reference path="../typings/tsd.d.ts" />
var chai = require("chai");
var _ = require("underscore");
var expect = chai.expect;
var Check = require("../src/Check");
describe("Check", function () {
    var BASE_NAME = "TEST";
    var mockObject = {};
    var mockArray = [];
    var baseClass = function () {
        this.blah = "blah";
    };
    var extendedClass = function () {
    };
    extendedClass.prototype = new baseClass();
    var mockExtendedObject = (new extendedClass());
    var testData = {
        "function": [function () {
            }],
        "object": [mockObject, mockExtendedObject, { "blah": "blah" }],
        "number": [-1, -0.666, 0, 0.666, 1],
        "string": ["", "blah"],
        "array": [mockArray, [0], ["string"]],
        "null": [null],
        "undefined": [undefined],
        "empty": [null, undefined, mockObject, mockArray, mockExtendedObject, ""]
    };
    var wonkyMap = {
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
    var runExpectedTest = function (testKey, values, negated) {
        for (var _i = 0; _i < values.length; _i++) {
            var value = values[_i];
            expect(function () {
                new Check(BASE_NAME, value, testKey, negated)[testKey]();
            }).to.not.throw();
            expect(function () {
                new Check(BASE_NAME, value, testKey, !negated)[testKey]();
            }).to.throw();
        }
    };
    describe("type checks", function () {
        _.keys(testData).forEach(function (testKey) {
            describe(testKey, function () {
                it("should properly handle " + testKey + " values", function () {
                    var values = testData[testKey];
                    runExpectedTest(testKey, values, false);
                });
                it("should properly handle non-" + testKey + " values", function () {
                    var values = _.chain(testData).values().flatten(true).uniq().reject(function (value) {
                        return _.contains(testData[testKey], value);
                    }).value();
                    runExpectedTest(testKey, values, true);
                });
            });
        });
    });
    describe("exists", function () {
        it("should properly handle non null or undefined values", function () {
            var values = _.chain(testData).values().flatten(true).uniq().filter(function (value) {
                return value !== null && value !== undefined;
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
                new Check(BASE_NAME, true).is.true();
            }).to.not.throw();
            for (var _i = 0, _a = wonkyMap.trueList; _i < _a.length; _i++) {
                var value = _a[_i];
                expect(function () {
                    new Check(BASE_NAME, value).is.true();
                }).to.throw();
            }
        });
    });
    describe("false", function () {
        it("should properly handle falsiness", function () {
            expect(function () {
                new Check(BASE_NAME, false).is.false();
            }).to.not.throw();
            for (var _i = 0, _a = wonkyMap.falseList; _i < _a.length; _i++) {
                var value = _a[_i];
                expect(function () {
                    new Check(BASE_NAME, value).is.false();
                }).to.throw();
            }
        });
    });
});
