-- Revert retrogamers:08add_system_collection from pg

BEGIN;

DROP FUNCTION new_system;

COMMIT;
