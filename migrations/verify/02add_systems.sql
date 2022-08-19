-- Verify retrogamers:02add_systems on pg

BEGIN;

SELECT * FROM "system" WHERE false;

ROLLBACK;
