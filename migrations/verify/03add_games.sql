-- Verify retrogamers:03add_games on pg

BEGIN;

SELECT * FROM "game" WHERE false;

ROLLBACK;
