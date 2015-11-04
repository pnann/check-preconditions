var Check = require("./Check");
var initialize = function (checkClass) {
    if (checkClass === void 0) { checkClass = Check; }
    var check = function (baseName, target, targetName) {
        return new checkClass(baseName, target, targetName);
    };
    return {
        of: function (baseName) {
            return check.bind(undefined, baseName);
        },
        check: check.bind(undefined, null)
    };
};
module.exports = initialize;
