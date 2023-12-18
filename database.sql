DROP TABLE IF EXISTS "users", "session", "session_settings", "session_intervals";

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(200),
    "password" TEXT,
    "created_at" TIMESTAMPTZ
);

CREATE TABLE "session" (
    "id" SERIAL PRIMARY KEY,
    "session_number" INTEGER,
    "session_date" TIMESTAMPTZ,
    "comments" TEXT,
    "user_id" INT
    	REFERENCES "users"
);

CREATE TABLE "session_settings" (
	"id" SERIAL PRIMARY KEY,
	"playback_type" VARCHAR(100),
	"sound_type" VARCHAR (200),
	"session_id" INT REFERENCES "session"
);

CREATE TABLE "session_intervals" (
	"id" SERIAL PRIMARY KEY,
	"interval_type" VARCHAR(50),
	"is_correct" BOOLEAN,
	"session_id" INT REFERENCES "session"
);
