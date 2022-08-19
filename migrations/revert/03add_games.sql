-- Revert retrogamers:03add_games from pg

BEGIN;

DELETE FROM "collection_has_system_and_game";
DELETE FROM "game";

COMMIT;
