"use strict";
var Check = require("./Check");
var initialize = function (checkClass) {
    if (checkClass === void 0) { checkClass = Check; }
    return {
        of: function (baseName) { return function (target, targetName) { return new checkClass(baseName, target, targetName); }; },
        check: function (target, targetName) { return new checkClass(null, target, targetName); }
    };
};
module.exports = initialize;
