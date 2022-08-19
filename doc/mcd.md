# MCD (v1)

DESCRIPTIF: code_jeu, titre, code_systeme, éditeur, développeur, nb joueur, note, synopsis, date de sortie, genre, média, media_fullsize, video, ecran_titre, ecran_titre_fullsize, screenshot, screenshot_fullsize  
POSSEDE, 0N SYSTEME, 11 JEU  
SYSTEME: code_systeme, nom, compagnie, type, support, date de lancement, date d'arrêt, média, big_media, video, logo  

DECRIT, 01 JEU, 11 DESCRIPTIF  
JEU: code_jeu, titre  
DETIENT, 0N COLLECTION, 0N SYSTEME, 0N JEU  

USER: code_user, email, password, nom, prénom, photo de profil, role  
CREE, 0N USER, 11 COLLECTION  
COLLECTION: code_collection, label  
