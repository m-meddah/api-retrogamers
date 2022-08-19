# Routes nécessaire pour l'API RetrOgamers

## Routes Back

routes | GET | POST | PATCH | DELETE | accès visiteur | accès user
----- | --- | --- | --- | --- | --- | ---
/systems | ✅ | x | x | x | ✅ | ✅
/systems/:id | ✅ | x | x | x | ✅ | ✅
/systems/:id/games | ✅ | x | x | x | ✅ | ✅
/systems/:id/details | ✅ | x | x | x | ✅ | ✅
/games | ✅ | x | x | x | ✅ | ✅
/games/:id | ✅ | x | x | x | ✅ | ✅
/users | ✅ | ✅ | x | x | x | ✅
/users/:id | ✅ | ✅ | ✅ | ✅ | x | ✅
/users/login | x | ✅ | x | x | ✅ | x
/users/logout | x | ✅ | x | x | x | ✅
/collections | ✅ | ✅ | ✅ | ✅ | x | ✅ (pour les futurs admins (v2 ou v3))
/collections/:id | ✅ | ✅ | ✅ | ✅ | x | ✅
/collections/:id/systems | ✅ | ✅ | x | ✅ | x | ✅
/collections/:id/games | ✅ | ✅ | x | ✅ | x | ✅
/collections/games/:id | ✅ | ✅ | x | ✅ | x | ✅
/contact | x | ✅ | x | x | ✅ | ✅
/contact | ✅ | ✅ | x | ✅ | x | ✅ (pour les futurs admins (v2 ou v3))

## Routes Front

/ (page d'acceuil)  
/profil (page de consultation du profil)  
/system/:id/games (page des jeux d'une console)  
/contact (page de contact et des membres de l'équipe)  
/404  
