ALTER TABLE "movie" DROP CONSTRAINT "movie_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "movie" DROP COLUMN IF EXISTS "userId";