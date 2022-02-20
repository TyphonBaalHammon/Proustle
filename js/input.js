(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./lettreStatut"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lettreStatut_1 = require("./lettreStatut");
    var Input = /** @class */ (function () {
        function Input(gestionnaire, longueurMot, premiereLettre) {
            var _this = this;
            this._grille = document.getElementById("grille");
            this._inputArea = document.getElementById("input-area");
            this._premiereLettre = premiereLettre;
            this._longueurMot = longueurMot;
            this._gestionnaire = gestionnaire;
            this._motSaisi = "";
            this._estBloque = false;
            document.addEventListener("keypress", (function (event) {
                event.stopPropagation();
                var touche = event.key;
                if (touche === "Enter") {
                    _this.validerMot();
                }
                else if (touche !== "Backspace") {
                    _this.saisirLettre(touche);
                }
            }).bind(this));
            // Le retour arrière n'est détecté que par keydown
            document.addEventListener("keydown", (function (event) {
                event.stopPropagation();
                var touche = event.key;
                if (touche === "Backspace") {
                    _this.effacerLettre();
                }
            }).bind(this));
            this._inputArea.querySelectorAll(".input-lettre").forEach(function (lettreDiv) {
                return lettreDiv.addEventListener("click", function (event) {
                    event.stopPropagation();
                    var div = event.currentTarget;
                    if (!div)
                        return;
                    var lettre = div.dataset["lettre"];
                    if (lettre === undefined) {
                        return;
                    }
                    else if (lettre === "_effacer") {
                        _this.effacerLettre();
                    }
                    else if (lettre === "_entree") {
                        _this.validerMot();
                    }
                    else {
                        _this.saisirLettre(lettre);
                    }
                });
            });
        }
        Input.prototype.effacerLettre = function () {
            if (this._estBloque)
                return;
            if (this._motSaisi.length !== 0) {
                this._motSaisi = this._motSaisi.substring(0, this._motSaisi.length - 1);
            }
            this._gestionnaire.actualiserAffichage(this._motSaisi);
        };
        Input.prototype.validerMot = function () {
            if (this._estBloque)
                return;
            var mot = this._motSaisi;
            this._gestionnaire.verifierMot(mot);
            if (mot.length === this._longueurMot) {
                this._motSaisi = "";
            }
        };
        Input.prototype.saisirLettre = function (lettre) {
            if (this._estBloque)
                return;
            if (this._motSaisi.length >= this._longueurMot)
                return;
            if (this._motSaisi.length === 0 && lettre.toUpperCase() !== this._premiereLettre)
                this._motSaisi += this._premiereLettre;
            this._motSaisi += lettre;
            this._gestionnaire.actualiserAffichage(this._motSaisi);
        };
        Input.prototype.bloquer = function () {
            this._estBloque = true;
        };
        Input.prototype.updateClavier = function (resultats) {
            if (this._estBloque)
                return;
            var statutLettres = {};
            // console.log(statutLettres);
            for (var _i = 0, resultats_1 = resultats; _i < resultats_1.length; _i++) {
                var resultat = resultats_1[_i];
                if (!statutLettres[resultat.lettre])
                    statutLettres[resultat.lettre] = resultat.statut;
                else {
                    switch (resultat.statut) {
                        case lettreStatut_1.LettreStatut.BienPlace:
                            statutLettres[resultat.lettre] = lettreStatut_1.LettreStatut.BienPlace;
                            break;
                        case lettreStatut_1.LettreStatut.MalPlace:
                            if (statutLettres[resultat.lettre] !== lettreStatut_1.LettreStatut.BienPlace) {
                                statutLettres[resultat.lettre] = lettreStatut_1.LettreStatut.MalPlace;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            // console.log(statutLettres);
            var touches = this._inputArea.querySelectorAll(".input-lettre");
            for (var lettre in statutLettres) {
                var statut = statutLettres[lettre];
                for (var numTouche = 0; numTouche < touches.length; numTouche++) {
                    var touche = touches.item(numTouche);
                    if (touche === undefined || touche === null)
                        continue;
                    if (touche.dataset["lettre"] === lettre) {
                        // console.log(lettre + " => " + statut);
                        switch (statut) {
                            case lettreStatut_1.LettreStatut.BienPlace:
                                touche.className = "";
                                touche.classList.add("input-lettre");
                                touche.classList.add("lettre-bien-place");
                                break;
                            case lettreStatut_1.LettreStatut.MalPlace:
                                if (touche.classList.contains("lettre-bien-place"))
                                    break;
                                touche.className = "";
                                touche.classList.add("input-lettre");
                                touche.classList.add("lettre-mal-place");
                                break;
                            default:
                                if (touche.classList.contains("lettre-bien-place"))
                                    break;
                                if (touche.classList.contains("lettre-mal-place"))
                                    break;
                                touche.className = "";
                                touche.classList.add("input-lettre");
                                touche.classList.add("lettre-non-trouve");
                                break;
                        }
                        break;
                    }
                }
            }
        };
        return Input;
    }());
    exports.default = Input;
});
//# sourceMappingURL=input.js.map