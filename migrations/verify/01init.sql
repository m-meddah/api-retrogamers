-- Verify retrogamers:01init on pg

BEGIN;

SELECT "id" FROM "user" WHERE false;
SELECT "id" FROM "collection" WHERE false;
SELECT "id" FROM "system" WHERE false;
SELECT "id" FROM "collection_has_system_and_game" WHERE false;
SELECT "id" FROM "game" WHERE false;
SELECT "id" FROM "desc" WHERE false;

ROLLBACK;
