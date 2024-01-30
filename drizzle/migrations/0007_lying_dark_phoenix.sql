DROP TABLE "account";--> statement-breakpoint
DROP TABLE "verificationToken";--> statement-breakpoint
ALTER TABLE "movie" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie" ADD CONSTRAINT "movie_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
