-- Deploy retrogamers:09add_game_collection to pg

BEGIN;

CREATE FUNCTION new_game(json) RETURNS "collection_has_system_and_game" AS $$

    INSERT INTO "collection_has_system_and_game"
        (game_id, collection_id) 
        VALUES
            (
				($1->>'game_id')::int,
                ($1->>'collection_id')::int   
            )
        RETURNING *

$$ LANGUAGE sql VOLATILE STRICT;

COMMIT;
