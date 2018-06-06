import {terser} from "rollup-plugin-terser";

export default [{
    input: "lib/index.js",
    output: [{
        file: "lib/index.cjs.js",
        format: "cjs",
        interop: false
    }, {
        file: "lib/index.esm.js",
        format: "es"
    }, {
        file: "lib/check-preconditions.min.js",
        format: "iife",
        name: "CheckPreconditions"
    }],
    plugins: [
        terser()
    ]
}];
