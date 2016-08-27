import Check = require("./Check");

interface CheckStatic {
    of: (baseName: string) => <T>(target: T, targetName?: string) => Check<T>,
    check: <T>(target: T, targetName?: string) => Check<T>
}

var initialize = function (checkClass = Check): CheckStatic {
    return {
        of: (baseName: string) => (target: any, targetName?: string) => new checkClass(baseName, target, targetName),
        check: (target: any, targetName?: string) => new checkClass(null, target, targetName),
    };
};

export = initialize;