
# Portfolio de Maramata Diop

Ce projet est un portfolio personnel qui présente mes compétences en tant que Douanier et Data Scientist. Il se compose d'une application backend en Flask et d'une application frontend en React, le tout conteneurisé avec Docker pour faciliter le déploiement.

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Architecture du Projet](#architecture-du-projet)
- [Installation et Exécution en Local](#installation-et-exécution-en-local)
- [Configuration de l&#39;Environnement](#configuration-de-lenvironnement)
- [Déploiement](#déploiement)
- [Mise à Jour et Maintenance](#mise-à-jour-et-maintenance)
- [Licence](#licence)

---

## Fonctionnalités

- **Présentation** : Page d'accueil dynamique avec animations, présentation personnelle et lien vers mon CV.
- **À propos** : Informations détaillées sur mon profil, mes compétences et mon expérience.
- **Projets** : Affichage et gestion des projets avec possibilité d'ajouter, modifier et supprimer (via l'interface administrateur).
- **Contact** : Formulaire de contact avec envoi d'email.
- **Authentification** : Inscription et connexion des utilisateurs avec gestion des rôles (admin / utilisateur).
- **Dashboard** : Espace dédié pour les administrateurs (gestion des projets et des messages de contact) et pour les utilisateurs.

---

## Technologies Utilisées

- **Backend** : Python, Flask, Flask-JWT-Extended, Flask-SQLAlchemy, PostgreSQL, Gunicorn
- **Frontend** : React, Redux, Axios, Bootstrap, AOS (animations), Framer Motion
- **Conteneurisation** : Docker, Docker Compose
- **Outils** : Git, GitHub

---

## Architecture du Projet

La structure du projet est la suivante :


mon-portfolio/

├── backend/

│ **  **├── app.py

│ **  **├── config.py

│ **  **├── controllers/

│ **  **│ **  **├── auth_controller.py

│ **  **│ **  **├── contact_controller.py

│ **  **│ **  **├── project_controller.py

│ **  **│ **  **└── admin_controller.py

│ **  **├── models.py

│ **  **├── migrations/ **        **# Gestion des migrations Alembic

│ **  **├── requirements.txt

│ **  **├── Dockerfile

│ **  **└── services/

│ **      **└── email_service.py

├── frontend/

│ **  **├── public/

│ **  **│ **  **├── index.html

│ **  **│ **  **├── assets/

│ **  **│ **  **│ **  **├── profile.jpg

│ **  **│ **  **│ **  **└── cv.pdf

│ **  **├── src/

│ **  **│ **  **├── components/

│ **  **│ **  **│ **  **├── Navbar.jsx

│ **  **│ **  **│ **  **├── Footer.jsx

│ **  **│ **  **│ **  **├── ProjectCard.jsx

│ **  **│ **  **│ **  **└── ProtectedRoute.jsx

│ **  **│ **  **├── pages/

│ **  **│ **  **│ **  **├── Home.jsx

│ **  **│ **  **│ **  **├── About.jsx

│ **  **│ **  **│ **  **├── Projects.jsx

│ **  **│ **  **│ **  **├── Contact.jsx

│ **  **│ **  **│ **  **├── Login.jsx

│ **  **│ **  **│ **  **├── AdminDashboard.jsx

│ **  **│ **  **│ **  **└── UserDashboard.jsx

│ **  **│ **  **├── redux/

│ **  **│ **  **│ **  **├── actions.js

│ **  **│ **  **│ **  **├── reducers.js

│ **  **│ **  **│ **  **└── store.js

│ **  **│ **  **├── services/

│ **  **│ **  **│ **  **└── api.js

│ **  **│ **  **├── App.jsx

│ **  **│ **  **└── index.js

│ **  **├── package.json

│ **  **├── package-lock.json

│ **  **└── Dockerfile

├── docker-compose.yml

├── .env**            **# Ce fichier n’est pas inclus dans le dépôt. Veuillez le créer manuellement.

├── .gitignore

└── README.md




---
## Installation et Exécution en Local

### Prérequis

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- (Optionnel) Git pour cloner le dépôt

### Étapes

1. **Cloner le dépôt (si ce n'est pas déjà fait)** :

   ```bash
   git clone https://github.com/MARAMATA/PORTFOLIO.git
   cd PORTFOLIO
---
**	**3.**	****Construire et démarrer les conteneurs** :


docker-compose up --build

L’application backend sera accessible sur [http://localhost:5001](http://localhost:5001) et le frontend sur [http://localhost](http://localhost).

© 2025 Maramata Diop
