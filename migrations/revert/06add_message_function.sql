-- Revert retrogamers:06ass_message_function from pg

BEGIN;

DROP FUNCTION new_message;

COMMIT;
