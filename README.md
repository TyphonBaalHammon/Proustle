# SUTOM

Jeu de lettres en ligne (et en français) basé sur SUTOM par @Jonamaths, lui-même basé sur Wordle.

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

### Avec Docker

Un Dockerfile est disponible pour pouvoir démarrer le site en local sans `npm`.

```sh
docker build -t sutom .

docker run -it --rm -p 4000:4000 sutom
```

### Accès au site

Une fois démarré, le site sera dispo sur http://localhost:4000 et le typescript va se recompiler tout seul à chaque modification de fichier.

## Autres infos et remerciements

- Le dictionnaire utilisé est le GLàFF
