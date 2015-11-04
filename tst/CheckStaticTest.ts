/// <reference path="../typings/tsd.d.ts" />

import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
chai.use(sinonChai);
var expect = chai.expect;

import Check = require("../src/Check");
import CheckStatic = require("../src/CheckStatic");

describe("CheckStatic", function () {
    var checkSpy;
    var staticInstance;

    beforeEach(function () {
        checkSpy = sinon.spy(Check);
        staticInstance = CheckStatic(checkSpy);
    });

    describe("check", function () {
        it("should return an check object", function () {
            var check = staticInstance.check(true, "true");
            expect(check).to.be.instanceOf(Check);
            expect(checkSpy).to.have.been.calledWithNew;
            expect(checkSpy).to.have.been.calledWithExactly(null, true, "true");
        });
    });

    describe("of", function () {
        const BASE_NAME = "basename";

        it("should bind check to baseName", function () {
            var baseNamed = staticInstance.of(BASE_NAME);
            baseNamed(true, "true");
            expect(checkSpy).to.have.been.calledWithNew;
            expect(checkSpy).to.have.been.calledWithExactly(BASE_NAME, true, "true");
        });
    });

    describe("general", function () {
        it("should work", function () {
            expect(function () {
                var instance = CheckStatic();
                instance.check(null).is.not.null();
            }).to.throw();
        })
    });
});
