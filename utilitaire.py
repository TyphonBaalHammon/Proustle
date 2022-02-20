#!/usr/bin/python

import unidecode


def unaccentize(xs):
	return unidecode.unidecode(xs).upper()
	
	

if __name__=="__main__":
	import fileinput
	import sys
	
	header="""export default class ListeMotsProposables { 
	public static readonly Dictionnaire: Array<string> = ["""
	
	print(header)
	
	for line in fileinput.input(encoding="utf-8"):
		line=line.strip()
		print(f"\"{unaccentize(line)}\",")
	
	footer = """      ]; }"""
	print(footer)
	sys.exit(0)
