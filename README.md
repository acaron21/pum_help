# Disclaimer

Ce projet n’a pas été conçu avec une architecture logicielle industrielle ni une structure de code optimisée pour un déploiement à grande échelle.

Certaines données sont écrites en dur, certaines parties du code ne suivent pas les standards habituels du développement logiciel, et l’ensemble doit être considéré comme un prototype fonctionnel (PoC).

Ce choix est volontaire :
l’objectif a toujours été de valider rapidement des idées métier, de tester des usages concrets sur le terrain, et d’illustrer des concepts, sans viser à ce stade une industrialisation ou une intégration au SI existant.

---

# PUM Help – Présentation générale

PUM Help est une application d’aide au comptoir conçue pour faciliter l’accès à l’information produit, limiter les erreurs et illustrer de nouveaux usages possibles autour du catalogue PUM.

Le projet a progressivement évolué d’un outil utilitaire vers un support de démonstration de concepts, notamment autour de la notion de connexions entre articles et de compatibilité produit.

L’application regroupe aujourd’hui plusieurs modules, dont certains sont purement opérationnels et d’autres explicitement dédiés à la démonstration (PoC).

---

## 1. Ça va où ?

Module permettant de rechercher rapidement la zone d’un article :

- Recherche par **code article**
- Recherche par **zone** (ex : L24, M20…)
- Affichage interactif sur un **plan SVG**
- Localisation rapide des produits dans l’agence

---

## 2. Code IC ?

Initialement conçu pour rechercher les **codes IC** des produits PUM, ce module a évolué en un ensemble de **sélecteurs de produits personnalisés**, adaptés à certaines catégories d’articles.

Il permet notamment :

- de trouver les bons produits plus rapidement,
- de limiter les erreurs,
- de fluidifier le travail au comptoir.

C’est aujourd’hui la partie la plus importante de l’application.

---

## 3. Étiquettes

Outil permettant de générer des étiquettes avec **code-barres lisibles par les PDA**.

Ce module contourne notamment un bug de Sage X3, où les codes TR sortent habituellement avec des code-barres non reconnus.

---

# Onglet PoC – Démonstration des concepts
**L’onglet “PoC” regroupe les fonctionnalités destinées à illustrer des pistes d’évolution possibles autour du catalogue produit et de la compatibilité entre articles.

Ces fonctionnalités ne couvrent volontairement qu’un périmètre très limité d’articles, le strict minimum nécessaire pour démontrer les concepts.**

---

## Connexions

Ce module permet d’explorer les connexions d’un article.

Deux modes sont disponibles :

- saisie directe d’un code article,
- navigation via la loupe, permettant de parcourir les quelques articles importés.

Pour chaque article, les connexions sont affichées (diamètre, type de raccordement, matériau, etc.).
Il est ensuite possible, pour une connexion donnée, d’afficher les articles compatibles.

L’objectif est d’illustrer comment une modélisation des connexions permet :

- de retrouver automatiquement des raccords compatibles,
- d’éviter certaines incohérences,
- de raisonner autrement que par simple liste de références.

---

# Montage

Ce module permet de générer des montages en sélectionnant :

- soit deux codes articles,
- soit deux connexions.

L’objectif est d’illustrer comment, à partir d’un graphe de compatibilité, il devient possible de :

- vérifier qu’un assemblage est cohérent,
- identifier les interfaces de liaison,
- raisonner en termes de montage plutôt qu’en liste d’articles.



# Stack et fonctionnement technique

Le projet repose aujourd’hui sur plusieurs briques distinctes :

Front-end

- React
- TypeScript
- Vite

Le front sert principalement de support d’interface et de démonstration.

---
Données et API

En complément du front :
- un graphe de données a été construit pour modéliser les articles, leurs connexions et leurs compatibilités,
- une API permet d’interroger ce graphe afin de récupérer :
  - les connexions d’un article,
  - les compatibilités entre connexions,
  - les montages possibles.

Ces éléments sont utilisés uniquement dans le cadre des démonstrations présentes dans l’onglet PoC.
---
