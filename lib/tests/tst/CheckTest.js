"use strict";
exports.__esModule = true;
var chai = require("chai");
var underscore_1 = require("underscore");
var Check_1 = require("../src/Check");
var expect = chai.expect;
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
        var _loop_1 = function (value) {
            var _loop_2 = function (baseName) {
                expect(function () {
                    var result = new Check_1.Check(baseName, value, testKey, negated)[testKey]();
                    expect(result).to.equal(value);
                }).to.not["throw"]();
                expect(function () {
                    new Check_1.Check(baseName, value, testKey, !negated)[testKey]();
                }).to["throw"]();
            };
            for (var _i = 0, _a = [BASE_NAME, null, undefined]; _i < _a.length; _i++) {
                var baseName = _a[_i];
                _loop_2(baseName);
            }
        };
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            _loop_1(value);
        }
    };
    describe("type checks", function () {
        underscore_1.keys(testData).forEach(function (testKey) {
            describe(testKey, function () {
                it("should properly handle " + testKey + " values", function () {
                    var values = testData[testKey];
                    runExpectedTest(testKey, values, false);
                });
                it("should properly handle non-" + testKey + " values", function () {
                    var values = underscore_1.chain(testData).values().flatten(true).uniq().reject(function (value) {
                        return underscore_1.contains(testData[testKey], value);
                    }).value();
                    runExpectedTest(testKey, values, true);
                });
            });
        });
    });
    describe("exists", function () {
        it("should properly handle non null or undefined values", function () {
            var values = underscore_1.chain(testData).values().flatten(true).uniq().filter(function (value) {
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
                var result = new Check_1.Check(BASE_NAME, true).is["true"]();
                expect(result).is["true"];
            }).to.not["throw"]();
            var _loop_3 = function (value) {
                expect(function () {
                    new Check_1.Check(BASE_NAME, value).is["true"]();
                }).to["throw"]();
            };
            for (var _i = 0, _a = wonkyMap.trueList; _i < _a.length; _i++) {
                var value = _a[_i];
                _loop_3(value);
            }
        });
    });
    describe("false", function () {
        it("should properly handle falsiness", function () {
            expect(function () {
                var result = new Check_1.Check(BASE_NAME, false).is["false"]();
                expect(result).is["false"];
            }).to.not["throw"]();
            var _loop_4 = function (value) {
                expect(function () {
                    new Check_1.Check(BASE_NAME, value).is["false"]();
                }).to["throw"]();
            };
            for (var _i = 0, _a = wonkyMap.falseList; _i < _a.length; _i++) {
                var value = _a[_i];
                _loop_4(value);
            }
        });
    });
    describe("basic numerical checks", function () {
        var runNumericalTest = function (aliases, targetValue, successValues, failValues) {
            var _loop_5 = function (alias) {
                for (var _i = 0, successValues_1 = successValues; _i < successValues_1.length; _i++) {
                    var successValue = successValues_1[_i];
                    var result = new Check_1.Check(BASE_NAME, targetValue).is[alias](successValue);
                    expect(result).to.equal(targetValue);
                }
                var _loop_6 = function (failValue) {
                    expect(function () {
                        var result = new Check_1.Check(BASE_NAME, targetValue).is[alias](failValue);
                    }).to["throw"]();
                };
                for (var _a = 0, failValues_1 = failValues; _a < failValues_1.length; _a++) {
                    var failValue = failValues_1[_a];
                    _loop_6(failValue);
                }
            };
            for (var _i = 0, aliases_1 = aliases; _i < aliases_1.length; _i++) {
                var alias = aliases_1[_i];
                _loop_5(alias);
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
        var runNumericalTest = function (alias, targetValue, successValues, failValues) {
            for (var _i = 0, successValues_2 = successValues; _i < successValues_2.length; _i++) {
                var successValue = successValues_2[_i];
                var result = new Check_1.Check(BASE_NAME, targetValue).is[alias](successValue[0], successValue[1]);
                expect(result).to.equal(targetValue);
            }
            var _loop_7 = function (failValue) {
                expect(function () {
                    var result = new Check_1.Check(BASE_NAME, targetValue).is[alias](failValue[0], failValue[1]);
                }).to["throw"]();
            };
            for (var _a = 0, failValues_2 = failValues; _a < failValues_2.length; _a++) {
                var failValue = failValues_2[_a];
                _loop_7(failValue);
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
        it("should returns a function which when called will create a Check instance", function () {
            var check = Check_1.Check.of(BASE_NAME);
            var target = "target";
            var targetName = "target-name";
            var result = check(target, targetName);
            expect(result).is.an.instanceOf(Check_1.Check);
        });
        it("should return a function which when called will create a Check instance, even if no targetName is given", function () {
            var check = Check_1.Check.of(BASE_NAME);
            var target = "target";
            var result = check(target);
            expect(result).is.an.instanceOf(Check_1.Check);
        });
    });
    describe("Check.check", function () {
        it("should returns a Check instance", function () {
            var target = "target";
            var targetName = "target-name";
            var result = Check_1.Check.check(target, targetName);
            expect(result).is.an.instanceOf(Check_1.Check);
        });
        it("should returns a Check instance, even if no targetName is given", function () {
            var target = "target";
            var result = Check_1.Check.check(target);
            expect(result).is.an.instanceOf(Check_1.Check);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tUZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHN0L0NoZWNrVGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUE2QjtBQUM3Qix5Q0FBaUQ7QUFDakQsc0NBQW1DO0FBRW5DLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFZM0IsUUFBUSxDQUFDLE9BQU8sRUFBRTtJQUNkLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUN6QixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdEIsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXJCLElBQU0sU0FBUyxHQUFHO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUE7SUFDdEIsQ0FBQyxDQUFDO0lBQ0YsSUFBTSxhQUFhLEdBQUc7SUFDdEIsQ0FBQyxDQUFDO0lBQ0YsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQzFDLElBQU0sa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFFakQsSUFBTSxRQUFRLEdBQUc7UUFDYixVQUFVLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQztRQUNGLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQztRQUM1RCxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNuQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO1FBQ3RCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ2QsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUM7S0FDNUUsQ0FBQztJQUVGLElBQU0sUUFBUSxHQUFHO1FBQ2IsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekMsQ0FBQztJQUVGOzs7Ozs7T0FNRztJQUNILElBQU0sZUFBZSxHQUFHLFVBQVUsT0FBZSxFQUFFLE1BQWEsRUFBRSxPQUFnQjtnQ0FDbkUsS0FBSztvQ0FDRCxRQUFRO2dCQUNmLE1BQU0sQ0FBQztvQkFDSCxJQUFNLE1BQU0sR0FBRyxJQUFJLGFBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO29CQUN2RSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFLLENBQUEsRUFBRSxDQUFDO2dCQUVsQixNQUFNLENBQUM7b0JBQ0gsSUFBSSxhQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUM3RCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBSyxDQUFBLEVBQUUsQ0FBQzs7WUFSbEIsS0FBdUIsVUFBNEIsRUFBNUIsTUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUE1QixjQUE0QixFQUE1QixJQUE0QjtnQkFBOUMsSUFBTSxRQUFRLFNBQUE7d0JBQVIsUUFBUTthQVNsQjs7UUFWTCxLQUFvQixVQUFNLEVBQU4saUJBQU0sRUFBTixvQkFBTSxFQUFOLElBQU07WUFBckIsSUFBTSxLQUFLLGVBQUE7b0JBQUwsS0FBSztTQVdmO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUNwQixpQkFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLE9BQU87WUFDcEMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxFQUFFLENBQUMsNEJBQTBCLE9BQU8sWUFBUyxFQUFFO29CQUMzQyxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsZ0NBQThCLE9BQU8sWUFBUyxFQUFFO29CQUMvQyxJQUFNLE1BQU0sR0FBUyxrQkFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLO3dCQUNyRixPQUFPLHFCQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM5QyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDWCxlQUFlLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2YsRUFBRSxDQUFDLHFEQUFxRCxFQUFFO1lBQ3RELElBQU0sTUFBTSxHQUFTLGtCQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUs7Z0JBQ3JGLE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFBO1lBQ2hELENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRVgsZUFBZSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsaURBQWlELEVBQUU7WUFDbEQsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNiLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtZQUNwQyxNQUFNLENBQUM7Z0JBQ0gsSUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFJLENBQUEsRUFBRSxDQUFDO2dCQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQUksQ0FBQSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBSyxDQUFBLEVBQUUsQ0FBQztvQ0FFUCxLQUFLO2dCQUNaLE1BQU0sQ0FBQztvQkFDSCxJQUFJLGFBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQUksQ0FBQSxFQUFFLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFLLENBQUEsRUFBRSxDQUFDOztZQUhsQixLQUFvQixVQUFpQixFQUFqQixLQUFBLFFBQVEsQ0FBQyxRQUFRLEVBQWpCLGNBQWlCLEVBQWpCLElBQWlCO2dCQUFoQyxJQUFNLEtBQUssU0FBQTt3QkFBTCxLQUFLO2FBSWY7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUNkLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtZQUNuQyxNQUFNLENBQUM7Z0JBQ0gsSUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFLLENBQUEsRUFBRSxDQUFDO2dCQUN0RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQUssQ0FBQSxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBSyxDQUFBLEVBQUUsQ0FBQztvQ0FFUCxLQUFLO2dCQUNaLE1BQU0sQ0FBQztvQkFDSCxJQUFJLGFBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQUssQ0FBQSxFQUFFLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFLLENBQUEsRUFBRSxDQUFDOztZQUhsQixLQUFvQixVQUFrQixFQUFsQixLQUFBLFFBQVEsQ0FBQyxTQUFTLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCO2dCQUFqQyxJQUFNLEtBQUssU0FBQTt3QkFBTCxLQUFLO2FBSWY7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1FBQy9CLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxPQUFnQyxFQUFFLFdBQW1CLEVBQUUsYUFBdUIsRUFBRSxVQUFvQjtvQ0FDL0csS0FBSztnQkFDWixLQUEyQixVQUFhLEVBQWIsK0JBQWEsRUFBYiwyQkFBYSxFQUFiLElBQWEsRUFBRTtvQkFBckMsSUFBTSxZQUFZLHNCQUFBO29CQUNuQixJQUFNLE1BQU0sR0FBRyxJQUFJLGFBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN6RSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDeEM7d0NBRVUsU0FBUztvQkFDaEIsTUFBTSxDQUFDO3dCQUNILElBQU0sTUFBTSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFLLENBQUEsRUFBRSxDQUFDOztnQkFIbEIsS0FBd0IsVUFBVSxFQUFWLHlCQUFVLEVBQVYsd0JBQVUsRUFBVixJQUFVO29CQUE3QixJQUFNLFNBQVMsbUJBQUE7NEJBQVQsU0FBUztpQkFJbkI7O1lBVkwsS0FBb0IsVUFBTyxFQUFQLG1CQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO2dCQUF0QixJQUFNLEtBQUssZ0JBQUE7d0JBQUwsS0FBSzthQVdmO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUNwQixnQkFBZ0IsQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQzdCLGdCQUFnQixDQUFDLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDakIsZ0JBQWdCLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUM3QixnQkFBZ0IsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtRQUMvQixJQUFNLGdCQUFnQixHQUFHLFVBQUMsS0FBNkIsRUFBRSxXQUFtQixFQUFFLGFBQWlDLEVBQUUsVUFBOEI7WUFDM0ksS0FBMkIsVUFBYSxFQUFiLCtCQUFhLEVBQWIsMkJBQWEsRUFBYixJQUFhLEVBQUU7Z0JBQXJDLElBQU0sWUFBWSxzQkFBQTtnQkFDbkIsSUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3hDO29DQUVVLFNBQVM7Z0JBQ2hCLE1BQU0sQ0FBQztvQkFDSCxJQUFNLE1BQU0sR0FBRyxJQUFJLGFBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0YsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQUssQ0FBQSxFQUFFLENBQUM7O1lBSGxCLEtBQXdCLFVBQVUsRUFBVix5QkFBVSxFQUFWLHdCQUFVLEVBQVYsSUFBVTtnQkFBN0IsSUFBTSxTQUFTLG1CQUFBO3dCQUFULFNBQVM7YUFJbkI7UUFDTCxDQUFDLENBQUM7UUFFRixRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ2hCLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNmLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0UsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDakIsRUFBRSxDQUFDLDBFQUEwRSxFQUFFO1lBQzNFLElBQU0sS0FBSyxHQUFHLGFBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ3hCLElBQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQztZQUVqQyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5R0FBeUcsRUFBRTtZQUMxRyxJQUFNLEtBQUssR0FBRyxhQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUV4QixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtZQUNsQyxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDeEIsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLElBQU0sTUFBTSxHQUFHLGFBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRS9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRTtZQUNsRSxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDeEIsSUFBTSxNQUFNLEdBQUcsYUFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVuQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=