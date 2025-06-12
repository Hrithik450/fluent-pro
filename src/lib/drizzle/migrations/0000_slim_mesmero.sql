CREATE TABLE "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" timestamp,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "adminReports" (
	"reportId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"schoolId" uuid,
	"generatedAt" timestamp,
	"generatedBy" uuid,
	"reportData" jsonb
);
--> statement-breakpoint
CREATE TABLE "assessments" (
	"assessmentId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assignmentName" varchar(100),
	"coverUrl" text,
	"isActive" boolean
);
--> statement-breakpoint
CREATE TABLE "bookPages" (
	"pageId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bookId" uuid,
	"pageNumber" integer,
	"content" text,
	"imagesUrl" text
);
--> statement-breakpoint
CREATE TABLE "bookSessionReport" (
	"bookSessionReportId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bookSessionId" uuid,
	"pointsEarned" integer,
	"wordsCorrect" integer,
	"wordsIncorrect" integer,
	"wordsPerMinute" integer
);
--> statement-breakpoint
CREATE TABLE "bookSessions" (
	"bookSessionId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" uuid,
	"bookId" uuid,
	"sessionType" varchar(20),
	"maxPoints" integer,
	"isCompleted" boolean
);
--> statement-breakpoint
CREATE TABLE "books" (
	"bookId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(150),
	"author" varchar(100),
	"description" text,
	"coverImageUrl" text,
	"totalPages" integer,
	"minLevelReq" integer,
	"maxPoints" integer,
	"isActive" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "chats" (
	"chatId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"title" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "levels" (
	"levelId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"levelNumber" integer,
	"levelName" varchar(100),
	"description" text,
	"minPointsReq" integer
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"messageId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid,
	"role" varchar(20),
	"content" text
);
--> statement-breakpoint
CREATE TABLE "parentStudent" (
	"relationshipId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parentId" uuid,
	"studentId" uuid,
	"isActive" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "parents" (
	"parentId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" uuid,
	"phoneNumber" varchar(15),
	"whatsappNumber" varchar(15)
);
--> statement-breakpoint
CREATE TABLE "questionOptions" (
	"optionId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"questionId" uuid,
	"optionText" text,
	"isCorrect" boolean
);
--> statement-breakpoint
CREATE TABLE "quizQuestions" (
	"questionId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quizId" uuid,
	"questionText" text,
	"questionType" varchar(20),
	"points" integer
);
--> statement-breakpoint
CREATE TABLE "quizzes" (
	"quizId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quizName" varchar(100),
	"description" text,
	"totalQuestions" integer,
	"timeLimitMinutes" integer,
	"passingScore" integer,
	"isActive" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "schoolAdmins" (
	"adminId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"schoolId" uuid,
	"assignedAt" timestamp,
	"isActive" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "schools" (
	"schoolId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"schoolName" varchar(100),
	"address" text,
	"city" varchar(50),
	"state" varchar(50),
	"country" varchar(50),
	"postalCode" varchar(10),
	"phoneNumber" varchar(15),
	"email" varchar(100),
	"website" varchar(100),
	"isActive" boolean DEFAULT true,
	CONSTRAINT "schools_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "speechAttempts" (
	"speechAttemptId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bookSessionReportId" uuid,
	"audioRecordingUrl" text,
	"transcriptText" text,
	"confidenceScore" integer,
	"wordsCorrect" integer,
	"wordsIncorrect" integer,
	"totalWords" integer,
	"accuracy" integer,
	"processedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "studentAssessments" (
	"studentAssessmentId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assignmentId" uuid,
	"studentId" uuid,
	"isCompleted" boolean
);
--> statement-breakpoint
CREATE TABLE "studentEnrollments" (
	"enrollmentId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" uuid,
	"schoolId" uuid,
	"enrolledBy" uuid,
	"enrolledAt" timestamp,
	"currentGrade" varchar(20),
	"isActive" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "studentProgressReports" (
	"reportId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" uuid,
	"generatedAt" timestamp,
	"generatedBy" uuid,
	"currentLevel" integer,
	"booksReadCount" integer,
	"averageAccuracy" integer,
	"improvementSuggestions" text
);
--> statement-breakpoint
CREATE TABLE "studentQuizAnswers" (
	"answerId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"attemptId" uuid,
	"questionId" uuid,
	"selectedOptionId" uuid,
	"answerText" text,
	"isCorrect" boolean,
	"pointsEarned" integer
);
--> statement-breakpoint
CREATE TABLE "studentQuizAttempts" (
	"attemptId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" uuid,
	"quizId" uuid,
	"score" integer,
	"pointsEarned" integer,
	"isPromoted" boolean
);
--> statement-breakpoint
CREATE TABLE "teacherAssignments" (
	"assignmentId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacherId" uuid,
	"schoolId" uuid,
	"assignedAt" timestamp,
	"assignedBy" uuid,
	"isActive" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "teacherDashboards" (
	"dashboardId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacherId" uuid,
	"students" text,
	"views" jsonb
);
--> statement-breakpoint
CREATE TABLE "trialUsers" (
	"trialUserId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(100) NOT NULL,
	"hashedPassword" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"expiresAt" timestamp,
	CONSTRAINT "trialUsers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "unlockedBooks" (
	"unlockId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" uuid,
	"bookId" uuid,
	"unlockedAt" timestamp,
	"unlockedBy" uuid
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"dateOfBirth" date,
	"lastLogin" timestamp,
	"isActive" boolean DEFAULT true,
	"userType" varchar NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) PRIMARY KEY NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adminReports" ADD CONSTRAINT "adminReports_schoolId_schools_schoolId_fk" FOREIGN KEY ("schoolId") REFERENCES "public"."schools"("schoolId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adminReports" ADD CONSTRAINT "adminReports_generatedBy_user_id_fk" FOREIGN KEY ("generatedBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookPages" ADD CONSTRAINT "bookPages_bookId_books_bookId_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("bookId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookSessionReport" ADD CONSTRAINT "bookSessionReport_bookSessionId_bookSessions_bookSessionId_fk" FOREIGN KEY ("bookSessionId") REFERENCES "public"."bookSessions"("bookSessionId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookSessions" ADD CONSTRAINT "bookSessions_studentId_user_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookSessions" ADD CONSTRAINT "bookSessions_bookId_books_bookId_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("bookId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_chats_chatId_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("chatId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parentStudent" ADD CONSTRAINT "parentStudent_parentId_user_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parentStudent" ADD CONSTRAINT "parentStudent_studentId_user_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parents" ADD CONSTRAINT "parents_studentId_user_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questionOptions" ADD CONSTRAINT "questionOptions_questionId_quizQuestions_questionId_fk" FOREIGN KEY ("questionId") REFERENCES "public"."quizQuestions"("questionId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quizQuestions" ADD CONSTRAINT "quizQuestions_quizId_quizzes_quizId_fk" FOREIGN KEY ("quizId") REFERENCES "public"."quizzes"("quizId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schoolAdmins" ADD CONSTRAINT "schoolAdmins_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schoolAdmins" ADD CONSTRAINT "schoolAdmins_schoolId_schools_schoolId_fk" FOREIGN KEY ("schoolId") REFERENCES "public"."schools"("schoolId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "speechAttempts" ADD CONSTRAINT "speechAttempts_bookSessionReportId_bookSessionReport_bookSessionReportId_fk" FOREIGN KEY ("bookSessionReportId") REFERENCES "public"."bookSessionReport"("bookSessionReportId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentAssessments" ADD CONSTRAINT "studentAssessments_assignmentId_assessments_assessmentId_fk" FOREIGN KEY ("assignmentId") REFERENCES "public"."assessments"("assessmentId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentAssessments" ADD CONSTRAINT "studentAssessments_studentId_user_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentEnrollments" ADD CONSTRAINT "studentEnrollments_studentId_user_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentEnrollments" ADD CONSTRAINT "studentEnrollments_schoolId_schools_schoolId_fk" FOREIGN KEY ("schoolId") REFERENCES "public"."schools"("schoolId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentEnrollments" ADD CONSTRAINT "studentEnrollments_enrolledBy_user_id_fk" FOREIGN KEY ("enrolledBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentProgressReports" ADD CONSTRAINT "studentProgressReports_studentId_user_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentProgressReports" ADD CONSTRAINT "studentProgressReports_generatedBy_user_id_fk" FOREIGN KEY ("generatedBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentQuizAnswers" ADD CONSTRAINT "studentQuizAnswers_attemptId_studentQuizAttempts_attemptId_fk" FOREIGN KEY ("attemptId") REFERENCES "public"."studentQuizAttempts"("attemptId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentQuizAnswers" ADD CONSTRAINT "studentQuizAnswers_questionId_quizQuestions_questionId_fk" FOREIGN KEY ("questionId") REFERENCES "public"."quizQuestions"("questionId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentQuizAnswers" ADD CONSTRAINT "studentQuizAnswers_selectedOptionId_questionOptions_optionId_fk" FOREIGN KEY ("selectedOptionId") REFERENCES "public"."questionOptions"("optionId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentQuizAttempts" ADD CONSTRAINT "studentQuizAttempts_studentId_user_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentQuizAttempts" ADD CONSTRAINT "studentQuizAttempts_quizId_quizzes_quizId_fk" FOREIGN KEY ("quizId") REFERENCES "public"."quizzes"("quizId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacherAssignments" ADD CONSTRAINT "teacherAssignments_teacherId_user_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacherAssignments" ADD CONSTRAINT "teacherAssignments_schoolId_schools_schoolId_fk" FOREIGN KEY ("schoolId") REFERENCES "public"."schools"("schoolId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacherAssignments" ADD CONSTRAINT "teacherAssignments_assignedBy_user_id_fk" FOREIGN KEY ("assignedBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacherDashboards" ADD CONSTRAINT "teacherDashboards_teacherId_user_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unlockedBooks" ADD CONSTRAINT "unlockedBooks_studentId_user_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unlockedBooks" ADD CONSTRAINT "unlockedBooks_bookId_books_bookId_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("bookId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unlockedBooks" ADD CONSTRAINT "unlockedBooks_unlockedBy_user_id_fk" FOREIGN KEY ("unlockedBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;