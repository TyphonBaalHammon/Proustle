var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./lettreStatut", "./notificationMessage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lettreStatut_1 = require("./lettreStatut");
    var notificationMessage_1 = __importDefault(require("./notificationMessage"));
    var FinDePartiePanel = /** @class */ (function () {
        function FinDePartiePanel(datePartie) {
            var _this = this;
            this._resumeTexte = "";
            this._finDePartiePanel = document.getElementById("fin-de-partie-panel");
            this._victoirePanel = document.getElementById("victoire-panel");
            this._defaitePanel = document.getElementById("defaite-panel");
            this._defaitePanelMot = document.getElementById("defaite-panel-mot");
            this._resume = document.getElementById("fin-de-partie-panel-resume");
            this._resumeBouton = document.getElementById("fin-de-partie-panel-resume-bouton");
            this._datePartie = datePartie;
            this._resumeBouton.addEventListener("click", function (event) {
                event.stopPropagation();
                if (!navigator.clipboard) {
                    notificationMessage_1.default.ajouterNotification("Votre navigateur n'est pas compatible");
                }
                navigator.clipboard
                    .writeText(_this._resumeTexte + "\n\n")
                    .then(function () {
                    notificationMessage_1.default.ajouterNotification("Résumé copié dans le presse papier");
                })
                    .catch(function (raison) {
                    notificationMessage_1.default.ajouterNotification("Votre navigateur n'est pas compatible");
                });
            });
        }
        FinDePartiePanel.prototype.genererResume = function (estBonneReponse, resultats) {
            var resultatsEmojis = resultats.map(function (mot) {
                return mot
                    .map(function (resultat) { return resultat.statut; })
                    .reduce(function (ligne, statut) {
                    switch (statut) {
                        case lettreStatut_1.LettreStatut.BienPlace:
                            return ligne + "🟥";
                        case lettreStatut_1.LettreStatut.MalPlace:
                            return ligne + "🟡";
                        default:
                            return ligne + "🟦";
                    }
                }, "");
            });
            var dateGrille = this._datePartie.getTime();
            var origine = new Date(2022, 0, 8).getTime();
            var numeroGrille = Math.floor((dateGrille - origine) / (24 * 3600 * 1000)) + 1;
            this._resumeTexte = "PROUSTLE #" + numeroGrille + " " + (estBonneReponse ? resultats.length : "-") + "/6\n\n" + resultatsEmojis.join("\n");
            this._resume.innerText = this._resumeTexte;
        };
        FinDePartiePanel.prototype.afficher = function (estVictoire, motATrouver) {
            this._finDePartiePanel.style.display = "block";
            if (estVictoire)
                this._victoirePanel.style.display = "block";
            else {
                this._defaitePanelMot.innerText = motATrouver;
                this._defaitePanel.style.display = "block";
            }
        };
        return FinDePartiePanel;
    }());
    exports.default = FinDePartiePanel;
});
//# sourceMappingURL=finDePartiePanel.js.map