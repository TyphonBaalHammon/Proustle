var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./mots/listeMotsProposablesU", "./mots/listeMotsProposablesT", "./mots/listeMotsProposablesA", "./mots/listeMotsProposablesC", "./mots/listeMotsProposablesI", "./mots/listeMotsProposablesE", "./mots/listeMotsProposablesH", "./mots/listeMotsProposablesS", "./mots/listeMotsProposablesO", "./mots/listeMotsProposablesB", "./mots/listeMotsProposablesD", "./mots/listeMotsProposablesF", "./mots/listeMotsProposablesG", "./mots/listeMotsProposablesJ", "./mots/listeMotsProposablesK", "./mots/listeMotsProposablesL", "./mots/listeMotsProposablesM", "./mots/listeMotsProposablesN", "./mots/listeMotsProposablesP", "./mots/listeMotsProposablesQ", "./mots/listeMotsProposablesR", "./mots/listeMotsProposablesV", "./mots/listeMotsProposablesW", "./mots/listeMotsProposablesX", "./mots/listeMotsProposablesY", "./mots/listeMotsProposablesZ", "./mots/listeMotsATrouver"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var listeMotsProposablesU_1 = __importDefault(require("./mots/listeMotsProposablesU"));
    var listeMotsProposablesT_1 = __importDefault(require("./mots/listeMotsProposablesT"));
    var listeMotsProposablesA_1 = __importDefault(require("./mots/listeMotsProposablesA"));
    var listeMotsProposablesC_1 = __importDefault(require("./mots/listeMotsProposablesC"));
    var listeMotsProposablesI_1 = __importDefault(require("./mots/listeMotsProposablesI"));
    var listeMotsProposablesE_1 = __importDefault(require("./mots/listeMotsProposablesE"));
    var listeMotsProposablesH_1 = __importDefault(require("./mots/listeMotsProposablesH"));
    var listeMotsProposablesS_1 = __importDefault(require("./mots/listeMotsProposablesS"));
    var listeMotsProposablesO_1 = __importDefault(require("./mots/listeMotsProposablesO"));
    var listeMotsProposablesB_1 = __importDefault(require("./mots/listeMotsProposablesB"));
    var listeMotsProposablesD_1 = __importDefault(require("./mots/listeMotsProposablesD"));
    var listeMotsProposablesF_1 = __importDefault(require("./mots/listeMotsProposablesF"));
    var listeMotsProposablesG_1 = __importDefault(require("./mots/listeMotsProposablesG"));
    var listeMotsProposablesJ_1 = __importDefault(require("./mots/listeMotsProposablesJ"));
    var listeMotsProposablesK_1 = __importDefault(require("./mots/listeMotsProposablesK"));
    var listeMotsProposablesL_1 = __importDefault(require("./mots/listeMotsProposablesL"));
    var listeMotsProposablesM_1 = __importDefault(require("./mots/listeMotsProposablesM"));
    var listeMotsProposablesN_1 = __importDefault(require("./mots/listeMotsProposablesN"));
    var listeMotsProposablesP_1 = __importDefault(require("./mots/listeMotsProposablesP"));
    var listeMotsProposablesQ_1 = __importDefault(require("./mots/listeMotsProposablesQ"));
    var listeMotsProposablesR_1 = __importDefault(require("./mots/listeMotsProposablesR"));
    var listeMotsProposablesV_1 = __importDefault(require("./mots/listeMotsProposablesV"));
    var listeMotsProposablesW_1 = __importDefault(require("./mots/listeMotsProposablesW"));
    var listeMotsProposablesX_1 = __importDefault(require("./mots/listeMotsProposablesX"));
    var listeMotsProposablesY_1 = __importDefault(require("./mots/listeMotsProposablesY"));
    var listeMotsProposablesZ_1 = __importDefault(require("./mots/listeMotsProposablesZ"));
    var listeMotsATrouver_1 = __importDefault(require("./mots/listeMotsATrouver"));
    var Dictionnaire = /** @class */ (function () {
        function Dictionnaire() {
        }
        Dictionnaire.prototype.getMot = function (datePartie) {
            var aujourdhui = datePartie.getTime();
            var dateOrigine = new Date(2022, 1, 20);
            var origine = dateOrigine.getTime();
            console.log(datePartie);
            console.log(dateOrigine);
            var numeroGrille = Math.floor((aujourdhui - origine) / (24 * 3600 * 1000));
            console.log(numeroGrille);
            var mot = listeMotsATrouver_1.default.Liste[numeroGrille % listeMotsATrouver_1.default.Liste.length];
            console.log("REPONSE :" + mot);
            return mot;
        };
        Dictionnaire.prototype.estMotValide = function (mot) {
            mot = this.nettoyerMot(mot);
            return listeMotsATrouver_1.default.Liste.includes(mot) || listeMotsProposablesU_1.default.Dictionnaire.includes(mot) || listeMotsProposablesT_1.default.Dictionnaire.includes(mot) || listeMotsProposablesA_1.default.Dictionnaire.includes(mot) || listeMotsProposablesC_1.default.Dictionnaire.includes(mot) || listeMotsProposablesI_1.default.Dictionnaire.includes(mot) || listeMotsProposablesE_1.default.Dictionnaire.includes(mot) || listeMotsProposablesH_1.default.Dictionnaire.includes(mot) || listeMotsProposablesS_1.default.Dictionnaire.includes(mot) || listeMotsProposablesO_1.default.Dictionnaire.includes(mot) || listeMotsProposablesB_1.default.Dictionnaire.includes(mot) || listeMotsProposablesD_1.default.Dictionnaire.includes(mot) || listeMotsProposablesF_1.default.Dictionnaire.includes(mot) || listeMotsProposablesG_1.default.Dictionnaire.includes(mot) || listeMotsProposablesJ_1.default.Dictionnaire.includes(mot) || listeMotsProposablesK_1.default.Dictionnaire.includes(mot) || listeMotsProposablesL_1.default.Dictionnaire.includes(mot) || listeMotsProposablesM_1.default.Dictionnaire.includes(mot) || listeMotsProposablesN_1.default.Dictionnaire.includes(mot) || listeMotsProposablesP_1.default.Dictionnaire.includes(mot) || listeMotsProposablesQ_1.default.Dictionnaire.includes(mot) || listeMotsProposablesR_1.default.Dictionnaire.includes(mot) || listeMotsProposablesV_1.default.Dictionnaire.includes(mot) || listeMotsProposablesW_1.default.Dictionnaire.includes(mot) || listeMotsProposablesX_1.default.Dictionnaire.includes(mot) || listeMotsProposablesY_1.default.Dictionnaire.includes(mot) || listeMotsProposablesZ_1.default.Dictionnaire.includes(mot);
        };
        Dictionnaire.prototype.nettoyerMot = function (mot) {
            return mot
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase();
        };
        return Dictionnaire;
    }());
    exports.default = Dictionnaire;
});
//# sourceMappingURL=dictionnaire.js.map