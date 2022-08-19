-- Deploy retrogamers:01init to pg

BEGIN;

CREATE DOMAIN "email" AS text CHECK (
    value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
);

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" EMAIL NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "profile_picture" TEXT,
    "role" BOOLEAN NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "collection" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT,
    "user_id" INT NOT NULL REFERENCES "user" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "system" (
    "id" INT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "type" TEXT NOT NULL,
    "release_date" INT NOT NULL,
    "end_date" INT,
    "support_type" TEXT NOT NULL,
    "media" TEXT,
    "big_media" TEXT,
    "video" TEXT,
    "logo" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "game" (
    "id" INT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "system_id" INT NOT NULL REFERENCES "system" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "collection_has_system_and_game" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "collection_id" INT NOT NULL REFERENCES "collection" ("id"),
    "system_id" INT NOT NULL REFERENCES "system" ("id"),
    "game_id" INT REFERENCES "game" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);


CREATE TABLE "desc" (
    "id" INT NOT NULL UNIQUE REFERENCES "game" ("id"),
    "system_id" INT NOT NULL REFERENCES "system" ("id"),
    "title" TEXT NOT NULL,
    "publisher" TEXT,
    "developer" TEXT,
    "players" TEXT,
    "rating" TEXT,
    "desc" TEXT,
    "release_date" TEXT,
    "genre" TEXT,
    "media" TEXT,
    "big_media" TEXT,
    "video" TEXT,
    "screen_title" TEXT,
    "big_screen_title" TEXT,
    "screenshot" TEXT,
    "big_screenshot" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE INDEX "login" ON "user" USING hash (email);

COMMIT;
