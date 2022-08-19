-- Deploy retrogamers:08add_system_collection to pg

BEGIN;

CREATE FUNCTION new_system(json) RETURNS "collection_has_system_and_game" AS $$

    INSERT INTO "collection_has_system_and_game"
        (system_id, collection_id) 
        VALUES
            (
				($1->>'system_id')::int,
                ($1->>'collection_id')::int   
            )
        RETURNING *

$$ LANGUAGE sql VOLATILE STRICT;

COMMIT;
