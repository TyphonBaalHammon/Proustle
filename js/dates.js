(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dateOrigine = void 0;
    var dateOrigine = new Date(2022, 1, 23);
    exports.dateOrigine = dateOrigine;
});
//# sourceMappingURL=dates.js.map