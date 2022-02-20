#!/usr/bin/python

import unidecode


def unaccentize(xs):
	return unidecode.unidecode(xs).upper()
	
	

if __name__=="__main__":
	import fileinput
	import sys
	from collections import defaultdict
	
	
	
	letterz = defaultdict(set)
	
	for line in fileinput.input(encoding="utf-8"):
		line=line.strip()
		mot = unaccentize(line)
		
		letter = mot[0]
			
		letterz[letter].add(mot)

	
	footer = """      ]; }"""
	
	for l in letterz:
		header="""export default class ListeMotsProposables"""+l+""" { \n public static readonly Dictionnaire: Array<string> = ["""
		lmp = f"ts/mots/listeMotsProposables{l}.ts"
		with open(lmp,"w") as outfile:
			outfile.write(header)
			for m in letterz[l]:
				outfile.write(f"\"{m}\",\n")
			
			outfile.write(footer)
			
			print("import","ListeMotsProposables"+l, "from \"", lmp[:-2]+"\"")
	
			
	
	sys.exit(0)
