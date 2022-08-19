-- Deploy retrogamers:04add_user_function to pg

BEGIN;

CREATE FUNCTION new_user(json) RETURNS "user" AS $$

    INSERT INTO "user" (email, password, firstname, lastname) VALUES
    (
        $1->>'email',
        $1->>'password',
        $1->>'firstname',
        $1->>'lastname'
    ) RETURNING *

$$ LANGUAGE sql VOLATILE STRICT;

COMMIT;
