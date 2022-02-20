# SUTOM

Jeu de lettres en ligne (et en français) basé sur SUTOM par @Jonamaths, lui-même basé sur Wordle.

ATTENTION : la configuration de ce jeu a été modifiée par un non-expert. J'incite toute personne qui voudrait faire sa propre version de SUTOM à faire ce que j'ai fait, c'est à dire partir d'une version stable depuis le [dépot de Jonathan](https://framagit.org/JonathanMM/sutom), et PAS à partir de ma version, dont j'ai changé des bouts de configuration de façon probablement très sous-optimale, et que je ne garantis pas du tout de maintenir. Caveat emptor. 


## Développement

### Avec npm

Pour pouvoir travailler en local, il faut commencer par installer ce qu'il faut à node :

```sh
npm i
```

Puis, on lance le serveur :

```sh
npm start
```

### Accès au site

Une fois démarré, le site sera dispo sur http://localhost:4000 et le typescript va se recompiler tout seul à chaque modification de fichier.

## Autres infos et remerciements

- Le dictionnaire utilisé est le GLàFF, développé par Franck Sajous et compagnie à l'université de Toulouse.
