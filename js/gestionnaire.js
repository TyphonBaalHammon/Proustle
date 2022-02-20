var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./dictionnaire", "./grille", "./input", "./lettreResultat", "./lettreStatut", "./finDePartiePanel", "./notificationMessage", "./sauvegardeur", "./configuration", "./partieEnCours"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dictionnaire_1 = __importDefault(require("./dictionnaire"));
    var grille_1 = __importDefault(require("./grille"));
    var input_1 = __importDefault(require("./input"));
    var lettreResultat_1 = __importDefault(require("./lettreResultat"));
    var lettreStatut_1 = require("./lettreStatut");
    var finDePartiePanel_1 = __importDefault(require("./finDePartiePanel"));
    var notificationMessage_1 = __importDefault(require("./notificationMessage"));
    var sauvegardeur_1 = __importDefault(require("./sauvegardeur"));
    var configuration_1 = __importDefault(require("./configuration"));
    var partieEnCours_1 = __importDefault(require("./partieEnCours"));
    var Gestionnaire = /** @class */ (function () {
        function Gestionnaire() {
            var _a;
            this._maxNbPropositions = 6;
            this._stats = { partiesJouees: 0, partiesGagnees: 0 };
            this._config = configuration_1.default.Default;
            this._config = (_a = sauvegardeur_1.default.chargerConfig()) !== null && _a !== void 0 ? _a : this._config;
            var partieEnCours = this.chargerPartieEnCours();
            if (partieEnCours.datePartie) {
                this._datePartieEnCours = partieEnCours.datePartie;
            }
            else {
                this._datePartieEnCours = new Date();
            }
            this._dictionnaire = new dictionnaire_1.default();
            this._motATrouver = this.choisirMot(this._datePartieEnCours);
            this._grille = new grille_1.default(this._motATrouver.length, this._maxNbPropositions, this._motATrouver[0], this._config);
            this._input = new input_1.default(this, this._motATrouver.length, this._motATrouver[0]);
            this._propositions = new Array();
            this._resultats = new Array();
            this._compositionMotATrouver = this.decompose(this._motATrouver);
            this._victoirePanel = new finDePartiePanel_1.default(this._datePartieEnCours);
            this.chargerPropositions(partieEnCours.propositions);
        }
        Gestionnaire.prototype.chargerPartieEnCours = function () {
            var _a;
            this._stats = (_a = sauvegardeur_1.default.chargerSauvegardeStats()) !== null && _a !== void 0 ? _a : { partiesJouees: 0, partiesGagnees: 0 };
            var sauvegardePartieEnCours = sauvegardeur_1.default.chargerSauvegardePartieEnCours();
            if (sauvegardePartieEnCours)
                return sauvegardePartieEnCours;
            return new partieEnCours_1.default();
        };
        Gestionnaire.prototype.chargerPropositions = function (propositions) {
            if (!propositions || propositions.length === 0)
                return;
            for (var _i = 0, propositions_1 = propositions; _i < propositions_1.length; _i++) {
                var mot = propositions_1[_i];
                this.verifierMot(mot, true);
            }
        };
        Gestionnaire.prototype.enregistrerPartieDansStats = function () {
            this._stats.partiesJouees++;
            if (this._resultats.some(function (resultat) { return resultat.every(function (item) { return item.statut === lettreStatut_1.LettreStatut.BienPlace; }); }))
                this._stats.partiesGagnees++;
            this._stats.dernierePartie = this._datePartieEnCours;
            sauvegardeur_1.default.sauvegarderStats(this._stats);
        };
        Gestionnaire.prototype.sauvegarderPartieEnCours = function () {
            sauvegardeur_1.default.sauvegarderPartieEnCours(this._propositions, this._datePartieEnCours);
        };
        Gestionnaire.prototype.choisirMot = function (datePartie) {
            return this._dictionnaire.nettoyerMot(this._dictionnaire.getMot(datePartie));
        };
        Gestionnaire.prototype.decompose = function (mot) {
            var composition = {};
            for (var position = 0; position < mot.length; position++) {
                var lettre = mot[position];
                if (composition[lettre])
                    composition[lettre]++;
                else
                    composition[lettre] = 1;
            }
            return composition;
        };
        Gestionnaire.prototype.verifierMot = function (mot, skipAnimation) {
            var _this = this;
            if (skipAnimation === void 0) { skipAnimation = false; }
            mot = this._dictionnaire.nettoyerMot(mot);
            //console.debug(mot + " => " + (this._dictionnaire.estMotValide(mot) ? "Oui" : "non"));
            if (mot.length !== this._motATrouver.length) {
                notificationMessage_1.default.ajouterNotification("Le mot proposé est trop court");
                return;
            }
            if (mot[0] !== this._motATrouver[0]) {
                notificationMessage_1.default.ajouterNotification("Le mot proposé doit commencer par la même lettre que le mot recherché");
                return;
            }
            if (!this._dictionnaire.estMotValide(mot)) {
                notificationMessage_1.default.ajouterNotification("Ce mot n'est pas dans notre dictionnaire");
                return;
            }
            if (!this._datePartieEnCours)
                this._datePartieEnCours = new Date();
            var resultats = this.analyserMot(mot);
            var isBonneReponse = resultats.every(function (item) { return item.statut === lettreStatut_1.LettreStatut.BienPlace; });
            this._propositions.push(mot);
            this._resultats.push(resultats);
            this._grille.validerMot(mot, resultats, isBonneReponse, skipAnimation, function () {
                _this._input.updateClavier(resultats);
                if (isBonneReponse || _this._propositions.length === _this._maxNbPropositions) {
                    _this._input.bloquer();
                    _this._victoirePanel.afficher(isBonneReponse, _this._motATrouver);
                }
            });
            if (isBonneReponse || this._propositions.length === this._maxNbPropositions) {
                this._victoirePanel.genererResume(isBonneReponse, this._resultats);
                this.enregistrerPartieDansStats();
            }
            this.sauvegarderPartieEnCours();
        };
        Gestionnaire.prototype.actualiserAffichage = function (mot) {
            this._grille.actualiserAffichage(this._dictionnaire.nettoyerMot(mot));
        };
        Gestionnaire.prototype.analyserMot = function (mot) {
            var resultats = new Array();
            mot = mot.toUpperCase();
            var composition = __assign({}, this._compositionMotATrouver);
            for (var position = 0; position < this._motATrouver.length; position++) {
                var lettreATrouve = this._motATrouver[position];
                var lettreProposee = mot[position];
                if (lettreATrouve === lettreProposee) {
                    composition[lettreProposee]--;
                }
            }
            for (var position = 0; position < this._motATrouver.length; position++) {
                var lettreATrouve = this._motATrouver[position];
                var lettreProposee = mot[position];
                var resultat = new lettreResultat_1.default();
                resultat.lettre = lettreProposee;
                if (lettreATrouve === lettreProposee) {
                    resultat.statut = lettreStatut_1.LettreStatut.BienPlace;
                }
                else if (this._motATrouver.includes(lettreProposee)) {
                    if (composition[lettreProposee] > 0) {
                        resultat.statut = lettreStatut_1.LettreStatut.MalPlace;
                        composition[lettreProposee]--;
                    }
                    else {
                        resultat.statut = lettreStatut_1.LettreStatut.NonTrouve;
                    }
                }
                else {
                    resultat.statut = lettreStatut_1.LettreStatut.NonTrouve;
                }
                resultats.push(resultat);
            }
            return resultats;
        };
        return Gestionnaire;
    }());
    exports.default = Gestionnaire;
});
//# sourceMappingURL=gestionnaire.js.map