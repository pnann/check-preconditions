import Check = require("./Check");

interface CheckStatic {
    of: (baseName: string) => {
        check: (target: any, targetName?: string) => Check;
    },
    check: (target: any, targetName?: string) => Check
}

var initialize = function (checkClass = Check): CheckStatic {
    var check = function (baseName: string, target: any, targetName: string) {
        return new checkClass(baseName, target, targetName);
    };

    return {
        of: function (baseName: string) {
            return check.bind(undefined, baseName)
        },
        check: check.bind(undefined, null),
    };
};

export = initialize;