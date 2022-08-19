-- Verify retrogamers:05create_table_contact on pg

BEGIN;

SELECT "id" FROM "contact" WHERE false;

ROLLBACK;
