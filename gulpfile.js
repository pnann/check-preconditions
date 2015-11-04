var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var collapse = require("bundle-collapser/plugin");
var del = require("del");
var gulp = require("gulp");
var gutil = require("gulp-util");
var istanbul = require("gulp-istanbul");
var merge = require("merge2");
var mocha = require("gulp-mocha");
var source = require("vinyl-source-stream");
var ts = require("gulp-typescript");
var tsd = require("gulp-tsd");
var uglify = require("gulp-uglify");

const sourceGlob = "src/**/*.ts";
const testGlob = "tst/**/*.ts";
const sourceOutputDir = "lib/src";
const testOutputDir = "lib/tst";

const compiledSourceGlob = "lib/src/**/*.js";
const compiledTestGlob = "lib/tst/**/*.js";

const browserifyEntry = "lib/src/index.js";
const browserifyOutputName = "check-preconditions.min.js";
const browserifyStandaloneName = "CheckPreconditions";

var tsSourceProject = ts.createProject({
    module: "commonjs",
    target: "es3"
});

var tsTestProject = ts.createProject({
    module: "commonjs",
    target: "es3"
});

gulp.task("tsd", function (done) {
    tsd({
        command: "reinstall",
        latest: true,
        config: "./tsd.json"
    }, done);
});

gulp.task("build", ["tsd"], function () {
    var tsResult = gulp.src(sourceGlob)
        .pipe(ts(tsSourceProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(sourceOutputDir)),
        tsResult.js.pipe(gulp.dest(sourceOutputDir))
    ]);
});

gulp.task("watch-build", ["build"], function () {
    gulp.watch(sourceGlob, ["build"]);
});

gulp.task("build-tests", ["tsd"], function () {
    var tsResult = gulp.src(testGlob)
        .pipe(ts(tsTestProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(testOutputDir)),
        tsResult.js.pipe(gulp.dest(testOutputDir))
    ]);
});

gulp.task("pre-test", ["build", "build-tests"], function () {
    return gulp.src(compiledSourceGlob)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["pre-test"], function () {
    return gulp.src(compiledTestGlob, {read: false})
        .pipe(mocha({reporter: "nyan"}))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({thresholds: {global: 100}}));
});

gulp.task("watch-test", ["test"], function () {
    return gulp.watch([sourceGlob, testGlob], ["test"]);
});

gulp.task("clean", function () {
    return del([
        "lib"
    ]);
});

gulp.task("build-dist", ["build"], function () {
    var b = browserify({
        entries: browserifyEntry,
        debug: false,
        standalone: browserifyStandaloneName
    });

    return b.plugin(collapse).bundle()
        .pipe(source(browserifyOutputName))
        .pipe(buffer())
        .pipe(uglify())
        .on("error", gutil.log)
        .pipe(gulp.dest("lib"));
});

gulp.task("default", ["build-dist"]);
