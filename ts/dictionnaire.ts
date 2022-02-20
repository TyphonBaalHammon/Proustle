import ListeMotsProposablesU from "./mots/listeMotsProposablesU";
import ListeMotsProposablesT from "./mots/listeMotsProposablesT";
import ListeMotsProposablesA from "./mots/listeMotsProposablesA";
import ListeMotsProposablesC from "./mots/listeMotsProposablesC";
import ListeMotsProposablesI from "./mots/listeMotsProposablesI";
import ListeMotsProposablesE from "./mots/listeMotsProposablesE";
import ListeMotsProposablesH from "./mots/listeMotsProposablesH";
import ListeMotsProposablesS from "./mots/listeMotsProposablesS";
import ListeMotsProposablesO from "./mots/listeMotsProposablesO";
import ListeMotsProposablesB from "./mots/listeMotsProposablesB";
import ListeMotsProposablesD from "./mots/listeMotsProposablesD";
import ListeMotsProposablesF from "./mots/listeMotsProposablesF";
import ListeMotsProposablesG from "./mots/listeMotsProposablesG";
import ListeMotsProposablesJ from "./mots/listeMotsProposablesJ";
import ListeMotsProposablesK from "./mots/listeMotsProposablesK";
import ListeMotsProposablesL from "./mots/listeMotsProposablesL";
import ListeMotsProposablesM from "./mots/listeMotsProposablesM";
import ListeMotsProposablesN from "./mots/listeMotsProposablesN";
import ListeMotsProposablesP from "./mots/listeMotsProposablesP";
import ListeMotsProposablesQ from "./mots/listeMotsProposablesQ";
import ListeMotsProposablesR from "./mots/listeMotsProposablesR";
import ListeMotsProposablesV from "./mots/listeMotsProposablesV";
import ListeMotsProposablesW from "./mots/listeMotsProposablesW";
import ListeMotsProposablesX from "./mots/listeMotsProposablesX";
import ListeMotsProposablesY from "./mots/listeMotsProposablesY";
import ListeMotsProposablesZ from "./mots/listeMotsProposablesZ";
import ListeMotsATrouver from "./mots/listeMotsATrouver";
export default class Dictionnaire {
  public constructor() {}

  public getMot(datePartie: Date): string {
    let aujourdhui = datePartie.getTime();
    let origine = new Date(2022, 1, 20).getTime();
    
    console.log(aujourdhui)
    console.log(origine)

    let numeroGrille = Math.floor((aujourdhui - origine) / (24 * 3600 * 1000));
    
    console.log(numeroGrille)
    
    let mot = ListeMotsATrouver.Liste[numeroGrille % ListeMotsATrouver.Liste.length]
    console.log("REPONSE :"+mot)

    return mot;
  }

  public estMotValide(mot: string): boolean {
    mot = this.nettoyerMot(mot);
    return ListeMotsATrouver.Liste.includes(mot) || ListeMotsProposablesU.Dictionnaire.includes(mot) || ListeMotsProposablesT.Dictionnaire.includes(mot) || ListeMotsProposablesA.Dictionnaire.includes(mot) || ListeMotsProposablesC.Dictionnaire.includes(mot) || ListeMotsProposablesI.Dictionnaire.includes(mot) || ListeMotsProposablesE.Dictionnaire.includes(mot) || ListeMotsProposablesH.Dictionnaire.includes(mot) || ListeMotsProposablesS.Dictionnaire.includes(mot) || ListeMotsProposablesO.Dictionnaire.includes(mot) || ListeMotsProposablesB.Dictionnaire.includes(mot) || ListeMotsProposablesD.Dictionnaire.includes(mot) || ListeMotsProposablesF.Dictionnaire.includes(mot) || ListeMotsProposablesG.Dictionnaire.includes(mot) || ListeMotsProposablesJ.Dictionnaire.includes(mot) || ListeMotsProposablesK.Dictionnaire.includes(mot) || ListeMotsProposablesL.Dictionnaire.includes(mot) || ListeMotsProposablesM.Dictionnaire.includes(mot) || ListeMotsProposablesN.Dictionnaire.includes(mot) || ListeMotsProposablesP.Dictionnaire.includes(mot) || ListeMotsProposablesQ.Dictionnaire.includes(mot) || ListeMotsProposablesR.Dictionnaire.includes(mot) || ListeMotsProposablesV.Dictionnaire.includes(mot) || ListeMotsProposablesW.Dictionnaire.includes(mot) || ListeMotsProposablesX.Dictionnaire.includes(mot) || ListeMotsProposablesY.Dictionnaire.includes(mot) || ListeMotsProposablesZ.Dictionnaire.includes(mot);
  }

  public nettoyerMot(mot: string): string {
    return mot
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }
}
