-- Revert retrogamers:05create_table_contact from pg

BEGIN;

DROP TABLE IF EXISTS "contact";

COMMIT;
