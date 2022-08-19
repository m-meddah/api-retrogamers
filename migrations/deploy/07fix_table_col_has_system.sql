-- Deploy retrogamers:07fix_table_col_has_system to pg

BEGIN;

ALTER TABLE "collection_has_system_and_game"
ALTER COLUMN "system_id" DROP NOT NULL;

COMMIT;
