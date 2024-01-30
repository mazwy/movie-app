CREATE TABLE IF NOT EXISTS "genre" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movie" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text,
	"year" date,
	"rated" numeric,
	"released" date,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "emailVerified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "image";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie" ADD CONSTRAINT "movie_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
