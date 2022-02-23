#!/usr/bin/python

import unidecode
import random

reponses_brutes_b = ["Lecteur", "Narrateur", "Figaro", "Ponctuation", "Recherche", "Temps", "Inverti", "Inversion", "Guermantes", "Reynaldo", "Swann", "Jalousie", "Intermittence", "Asperges", "Balbec", "Princesse", "Comtesse", "Albertine", "Phrase", "Bathilde", "Combray", "Illiers", "Sodome", "Gomorrhe", "Andrée", "Bloch", "Goncourt", "Brichot", "Théâtre", "Berma", "Condorcet", "Daudet", "Maman", "Madeleine", "Tilleul", "Aubépine", "Eglise", "Legrandin", "Bicyclette", "Téléphone", "Caserne", "Boulogne", "Faubourg", "Tortillard", "Elegance", "Ruskin", "Giotto", "Botticelli", "Odette", "Parfum", "Forcheville", "Gilberte", "Verdurin", "Morel", "Charlus", "Auteuil", "Asthme", "Bottines", "Pelisse", "Cambremer", "Déception", "Oriane", "Jupien", "Promenade", "Fugitive", "Prisonnière", "Venise", "Paris", "Cruauté", "Violon", "Sonate", "Françoise", "Champi", "Dissertation", "Cathédrale", "Amiens", "Bergotte", "Rachel", "Saintloup", "Robert", "Maladie", "Mondain", "Agrigente", "Babal", "Arbres", "Tansonville", "Simonet", "Télégraphe", "Obstacle", "Intelligence", "Matinée", "Mémoire", "Longtemps", "Sommeil", "Lanterne", "Brabant", "Wagner", "Lohengrin", "Angoisse", "Plage", "Cottard", "Médecins", "Norpois", "Elstir", "Bontemps", "Giletier", "Leitmotiv", "Phèdre", "Debussy", "Dilettante", "Snobisme", "Montesquiou", "Touraine", "Doncières", "Amour", "Paperolles", "Dactylo", "Albaret", "Redingote", "Gallimard", "Grasset", "Léonie", "Flaubert", "Pastiche", "Disparue", "Photographie", "Indifférence", "Judaisme", "Dreyfus", "Montjouvain", "Méséglise", "Lassitude", "Marcel", "Proust", "Orangeade", "Duchesse", "Arpajon", "Adolphe", "Basin", "Villeparisis", "Santeuil", "Bourdon", "Fortuny", "Retrouvé", "Pavés", "Sévigné", "Liftier", "Tante", "Parme", "Marquise", "Vitrail", "Laumes", "Tisane", "Automobile", "Aéroplane", "vivonne", "rivebelle", "Balzac", "Biche", "cocotte", "actrice", "amitié", "aristocratie", "bibliothèque", "catleyas", "chambre", "chardin", "correspondance", "culpabilité", "domestiques", "écriture", "lecture", "esthétique", "étymologie", "habitude", "impression", "inachèvement", "inconscient", "instinct", "lilas", "médecine", "modernité", "névrose", "profanation", "réminiscence", "sensations", "style", "Raspelière", "théatrophone", "villebon", "vinteuil", "Aimé", "volonté", "Palamède", "Jeunesse" ]

reponses_brutes = []

for x in reponses_brutes_b:
	if not x in reponses_brutes:
		reponses_brutes.append(x)

def unaccentize(xs):
	return unidecode.unidecode(xs).upper()
	

reponses = list(map(unaccentize,reponses_brutes))

#random.shuffle(reponses)

MAX_LENGTH = len(max(reponses,key=len))
MIN_LENGTH = len(min(reponses,key=len))

if __name__=="__main__":
	import fileinput
	import sys
	from collections import defaultdict
	
	header_liste_reponses = """export default class ListeMotsATrouver { \n    public static readonly Liste: Array<string> = """
	
	with open("ts/mots/listeMotsATrouver.ts","w") as outfile_reponse:
		outfile_reponse.write(header_liste_reponses)
		outfile_reponse.write(str(reponses))
		outfile_reponse.write("; }")
	
	letterz = defaultdict(set)
	
	for line in fileinput.input(encoding="utf-8"):
		line=line.strip()
		mot = unaccentize(line)
		l = len(mot)
		
		if MIN_LENGTH < l < MAX_LENGTH and not (set(mot) & set("'- ")):
			letter = mot[0]
				
			letterz[letter].add(mot)
		
		

	
	footer = """      ]; }"""
	
	for l in letterz:
		header="""export default class ListeMotsProposables"""+l+""" { \n public static readonly Dictionnaire: Array<string> = ["""
		lmp = f"ts/mots/listeMotsProposables{l}.ts"
		with open(lmp,"w") as outfile:
			outfile.write(header)
			for m in sorted(letterz[l]):
				outfile.write(f"\"{m}\",\n")
			
			outfile.write(footer)
			
			print("import","ListeMotsProposables"+l, "from \"", lmp[:-2]+"\"")
	
			
	
	sys.exit(0)
