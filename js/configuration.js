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
    var Configuration = /** @class */ (function () {
        function Configuration() {
            this.hasAudio = false;
        }
        Configuration.Default = { hasAudio: false };
        return Configuration;
    }());
    exports.default = Configuration;
});
//# sourceMappingURL=configuration.js.map