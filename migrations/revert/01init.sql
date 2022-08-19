-- Revert retrogamers:01init from pg

BEGIN;

DROP TABLE IF EXISTS "user", "collection", "system", "collection_has_system_and_game", "game", "desc" CASCADE;

DROP DOMAIN "email";

COMMIT;
