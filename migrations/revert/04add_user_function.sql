-- Revert retrogamers:04add_user_function from pg

BEGIN;

DROP FUNCTION new_user;

COMMIT;
