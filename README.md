# Disclaimer

Ce projet n’a pas été conçu avec une architecture propre ou une structure de code optimisée. Certaines données sont écrites en brut dans les fichiers, et plusieurs pratiques ne suivent pas les standards habituels du développement.

Cela s’explique simplement : l’objectif initial était de créer une solution **rapidement fonctionnelle**, destinée à une utilisation interne immédiate et sans ambition de déploiement dans d’autres agences.

---

# PUM Help – Présentation générale

PUM Help est une application destinée à faciliter le travail au comptoir. Elle centralise plusieurs outils pratiques pour accélérer la recherche d’informations, éviter les erreurs et améliorer le service client.

L’application propose trois menus principaux :

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

# Stack et fonctionnement technique

Le projet est une application **front-end uniquement**, développée avec :

- **React**
- **TypeScript**
- **Vite** (outil de développement permettant un démarrage très rapide et un build optimisé)

L’application ne réalise qu’un seul appel réseau :  
un `fetch` vers une **API Google Sheet**, où est stocké un export du portail PDA contenant :

- les codes articles,
- leurs zones respectives.

Cette source de données sert à :

- faire fonctionner la recherche du module **“Ça va où ?”**,
- auto-compléter la génération d’étiquettes dans le menu **“Étiquettes”**.

---
