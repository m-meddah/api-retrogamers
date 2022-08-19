-- Deploy retrogamers:05create_table_contact to pg

BEGIN;

CREATE TABLE "contact" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "email" EMAIL NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
