-- Revert retrogamers:02add_systems from pg

BEGIN;

DELETE FROM "desc";
DELETE FROM "system" CASCADE;

COMMIT;
