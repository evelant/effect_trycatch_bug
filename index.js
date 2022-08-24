"use strict";
exports.__esModule = true;
var T = require("@effect/core/io/Effect");
var Function_1 = require("@tsplus/stdlib/data/Function");
var test = (0, Function_1.pipe)(T.tryCatch(function () {
    console.log("about to throw");
    throw new Error("ERROR");
}, function (err) {
    console.log("caught the error", err);
    return err;
}));
T.unsafeRunSync(test);
