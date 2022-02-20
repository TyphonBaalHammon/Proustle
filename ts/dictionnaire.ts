import ListeMotsProposables from "./mots/listeMotsProposables";
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
    return ListeMotsProposables.Dictionnaire.includes(mot) || ListeMotsATrouver.Liste.includes(mot);
  }

  public nettoyerMot(mot: string): string {
    return mot
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }
}
