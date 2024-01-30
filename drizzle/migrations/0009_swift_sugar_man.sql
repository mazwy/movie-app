CREATE TABLE IF NOT EXISTS "favoritemovie" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer,
	"movie_id" integer
);
--> statement-breakpoint
ALTER TABLE "movie" ADD COLUMN "genre_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie" ADD CONSTRAINT "movie_genre_id_genre_id_fk" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favoritemovie" ADD CONSTRAINT "favoritemovie_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favoritemovie" ADD CONSTRAINT "favoritemovie_movie_id_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
