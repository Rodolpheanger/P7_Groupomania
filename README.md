<p align="center">
 <img src="https://user.oc-static.com/upload/2022/05/25/1653474647318_icon-left-font.png" alt="logo Groupomania" style="border-radius: 25px"></a>
</p>

<br/>

<p align="center" style="font-size: 60px">Projet Groupomania</p>

---

# 📝 Sommaire :

- [A propos du projet](#about)
- [Installation en local](#install)
  - [Base de donnée](#database)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Présentation des fonctionnalités](#features)
- [Technologies utilisées](#built_using)
- [Auteur](#author)

<br/>

---

# 🧐 A propos du projet : <a name = "about"></a>

Dernier projet de la formation [**Développeur Web**](https://openclassrooms.com/fr/paths/556-developpeur-web) dispensé par [Openclassrooms](https://openclassrooms.com/) (version précédente à la mise à jour du _26/05/2022_)

Le but de ce projet est la réalisation d'un réseau social d'entreprise avec diverses fonctionnalités à implémenter.

Les contraintes techniques pour ce projet sont les suivantes :

- utilisation obligatoire d'une base de donnée SQL
- utilisation obligatoire d'un framework Frontend
- dévellopement du projet en javascript uniquement (y compris pour le backend)

<br/>

---

# 🔧 Installation (en local) : <a name = "install"></a>

## 1. Commencer par cloner ce repository

<br/>

## 2. Base de données : <a name = "database"></a>

- un [**export**](groupomania.sql) de la base de donnée est présent à la racine.
- La base de donnée SQL fournie contient un utilisateur ayant le role d'administrateur.

- Pour se connecter avec ce compte, utilser les identifiants suivants :

  - _Email:_ **`admin@test.fr`**
  - _Mot de passe:_ **`123456789`**

_note: seul **l'administrateur de la base de donnée** peut attribuer et modifier les droits des utilisateurs, cette action n'est pas possible via l'application, y compris avec le compte administrateur_

<br/>

## 3. Backend : <a name = "backend"></a>

- ### Dans le dossier **`backend`** :

  - Créer un dossier nommé **`uploads`** à la racine puis y créer 2 sous-dossiers: **`avatars`** et **`posts_images`**

  - Créer un fichier **`.env`** **à la racine de `backend`**, et le compléter suivant le modèle fourni (**`.env.example`**)

- ### Dans le terminal :

  - Se placer sur le dossier **`backend`** _(avec la commande **cd backend**)_, éxécuter la commande **`npm install`** et attendre la fin de l'installation des dépendances.

  - Exécuter la commande **`npm run dev`** pour lancer le serveur en local

<br/>

## 4. Frontend : <a name = "frontend"></a>

- ### Dans un nouveau terminal :

  - Se placer sur le dossier **`frontend`** _(avec la commande **cd frontend**)_, éxécuter la commande **`npm install`** et attendre la fin de l'installation des dépendances.

  - Lancer la commande **`npm start`** pour lancer le serveur client en local

<br/>

## 5. Enjoy !!! 😉

<br/>

---

# 🎈 Présentation des fonctionnalités : <a name = "features"></a>

1. Utilisateurs :

   - Inscription (création d'un compte)
   - Connexion (avec authentification active jusqu'à déconnexion par l'utilisateur)
   - Déconnexion (avec suppression de l'authentification)
   - Ajout d'un post contenant ou non une image avec édition et suppression possible
   - Edition des posts leur appartenant
   - Like des posts de tous les utilisateurs (3 "niveaux" de like disponibles avec 1 seul like par post possible)
   - Ajout de commentaires sur tous les posts avec édition et suppression possibles
   - Visualisation de tous les utilisateurs enregistrés
   - Accés à une page profil comprenant:
     - l'avatar (modifiable)
     - le pseudo (modifiable / doit être unique)
     - l'email (modifiable / doit être unique)
     - le prénom (modifiable)
     - le nom (modifiable)
     - une courte biographie (modifiable)
     - la date d'inscription (non modifiable)
     - le role de l'utilisateur (non modifiable)
   - Possibilité de modifier le mot de passe (page profil)
   - Possibilité de supprimer le compte, y compris les posts, likes et commentaires (page profil / non réversible)

<br/>

2. Administrateur :

   - Possibilité de supprimer les posts de tous les utilisateurs
   - Possibilité de supprimer les commentaires de tous les utilisateurs
   - Possibilité de supprimer le compte de tous les utilisateurs, y compris les posts, likes et commentaires (page profil de l'utilisateur / non-reversible)

<br/>

---

# ⛏️ Technologies utilisées: <a name = "built_using"></a>

- [MySQL](https://www.mysql.com/) - Base de donnée
- [NodeJs](https://nodejs.org/en/) + [Express](https://expressjs.com/) + [TypeScript](https://www.typescriptlang.org/) - Backend
- [React](https://reactjs.org/) - Framework Frontend

<br/>

---

# ✍️ Auteur: <a name = "author"></a>

- [@Rodolpheanger](https://github.com/Rodolpheanger)
