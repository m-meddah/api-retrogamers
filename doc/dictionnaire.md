# Dictionnaire de données

## Les différentes Tables

### Table *user*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_user | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant de l'utilisateur
email | EMAIL | NOT NULL UNIQUE | email de l'utilisateur, fait office de login
password | TEXT | NOT NULL | mot de passe de l'utilisateur, qui sera crypté
lastname | TEXT | NOT NULL | Nom de l'utilisateur
firstname | TEXT | NOT NULL | Prénom de l'utilisateur
profile_picture | TEXT | | lien vers un site de stockage de photo (genre [Cloudinary](https://cloudinary.com/))
role | TEXT | NOT NULL DEFAULT "user" | Role de l'utilisateur (par défaut "user")
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du compte utilisateur
updated_at | TIMESTAMPTZ | | date de modification du compte utilisateur

### Table *collection*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_collection | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant de la collection
label | TEXT | | Nom de la collection
code_user | INT | NOT NULL REFERENCES user(code_user) | Mise en relation des tables User et Collection
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création de la collection
updated_at | TIMESTAMPTZ | | date de modification de la collection

### Table *system*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_system | INT | NOT NULL UNIQUE | Identifiant du système
name | TEXT | NOT NULL | Nom du système
company | TEXT | | Nom de la compagnie
type | TEXT | NOT NULL | Type du système (console, console portable, ect...)
release_date | INT | NOT NULL | Date de lancement du système
end_date | INT | | Date de fin du système
support_type | TEXT | NOT NULL | Type de support (cartouche, cd, etc...)
media | TEXT | | Lien vers la photo du système (à stocker sur Cloudinary?)
big_media | TEXT | | Lien vers la photo fullsize du système
video | TEXT |  | video d'une sélection de titres du système
logo | TEXT |  | logo du système
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du système
updated_at | TIMESTAMPTZ | | date de modification du système

### Table *game*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_game | INT | NOT NULL UNIQUE| Identifiant du jeu
title | TEXT | NOT NULL | Titre du jeu
code_system | INT | NOT NULL REFERENCES system(code_system) | Identifiant du système
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du jeu
updated_at | TIMESTAMPTZ | | date de modification du jeu

### Table d'association *collection_has_system_and_game* entre *collection*, *system* et *game*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_collection | INT | NOT NULL REFERENCES collection(code_collection) | Identifiant de la collection
code_system | INT | REFERENCES system(code_system) | Identifiant du système
code_game | INT | REFERENCES game(code_game) | Identifiant du jeu

### Table *desc*

(Cette table fera appel à une API externe (screenscraper), mais les données récoltées seront ensuite stockées en base de données)

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_game | INT | NOT NULL UNIQUE | Identifiant du jeu
code_system | INT | NOT NULL REFERENCES système (code_system) | Identifiant du système
title | TEXT | NOT NULL | Titre du jeu
publisher | TEXT | | Éditeur du jeu
developer | TEXT | | Développeur du jeu
players | TEXT | | Nombre de joueur du jeu
rating | TEXT | | Note du jeu
desc | TEXT | | Synopsis du jeu
release_date | TEXT | | Date de sortie du jeu
genre | TEXT | | Genre du jeu
media | TEXT | | Lien vers la photo descriptive du jeu (screenshot + boite + cartouche ou cd)
big_media | TEXT | | Lien vers la photo descriptive fullsize du jeu
video | TEXT |  | Lien vers la video du jeu
screen_title | TEXT |  | Lien vers l'écran titre du jeu
big_screen_title | TEXT |  | Lien vers l'écran titre fullsize du jeu
screenshot | TEXT |  | Lien vers le screenshot du jeu
big_screenshot | TEXT |  | Lien vers le screenshot fullsize du jeu
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du jeu
updated_at | TIMESTAMPTZ | | date de modification du jeu

### Table *contact*

Champ | Type | Spécificités | Description
--- | --- | --- | ---
code_contact | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | Identifiant du message
firstname | TEXT | NOT NULL | Prénom de l'utilisateur
lastname | TEXT | | Nom de l'utilisateur
email | EMAIL | NOT NULL | Email de l'utilisateur
message | TEXT | NOT NULL | Message de l'utilisateur
created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | date de création du message
updated_at | TIMESTAMPTZ | | date de modification du message
