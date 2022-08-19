-- Revert retrogamers:09add_game_collection from pg

BEGIN;

DROP FUNCTION new_game;

COMMIT;
