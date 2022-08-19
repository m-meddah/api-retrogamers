-- Deploy retrogamers:06ass_message_function to pg

BEGIN;

CREATE FUNCTION new_message(json) RETURNS "contact" AS $$

    INSERT INTO "contact"
        (firstname, lastname, email, message) 
        VALUES
            (
                $1->>'firstname',
                $1->>'lastname',
                $1->>'email',
                $1->>'message'
            )
        RETURNING *

$$ LANGUAGE sql VOLATILE STRICT;

COMMIT;
