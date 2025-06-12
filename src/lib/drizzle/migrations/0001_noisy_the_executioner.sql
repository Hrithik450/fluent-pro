ALTER TABLE "user" ALTER COLUMN "userType" SET DEFAULT 'student';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "hashedPassword" text;