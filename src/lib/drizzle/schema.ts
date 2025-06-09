import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  jsonb,
  date,
} from "drizzle-orm/pg-core";

// TRAIL
export const trialUsers = pgTable("trialUsers", {
  trialUserId: uuid("trialUserId").primaryKey().defaultRandom(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  hashedPassword: text("hashedPassword").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  expiresAt: timestamp("expiresAt"),
});

// USERS & PARENTS
export const users = pgTable("users", {
  userId: uuid("userId").primaryKey().defaultRandom(),
  username: varchar("username", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  firstName: varchar("firstName", { length: 50 }),
  lastName: varchar("lastName", { length: 50 }),
  dateOfBirth: date("dateOfBirth"),
  lastLogin: timestamp("lastLogin"),
  isActive: boolean("isActive").default(true),
  userType: varchar("userType", {
    enum: ["superAdmin", "schoolAdmin", "teacher", "student"],
  }).notNull(),
});

export const parents = pgTable("parents", {
  parentId: uuid("parentId").primaryKey().defaultRandom(),
  studentId: uuid("studentId").references(() => users.userId),
  phoneNumber: varchar("phoneNumber", { length: 15 }),
  whatsappNumber: varchar("whatsappNumber", { length: 15 }),
});

export const parentStudent = pgTable("parentStudent", {
  relationshipId: uuid("relationshipId").primaryKey().defaultRandom(),
  parentId: uuid("parentId").references(() => users.userId),
  studentId: uuid("studentId").references(() => users.userId),
  isActive: boolean("isActive").default(true),
});

// SCHOOLS & ADMINS
export const schools = pgTable("schools", {
  schoolId: uuid("schoolId").primaryKey().defaultRandom(),
  schoolName: varchar("schoolName", { length: 100 }),
  address: text("address"),
  city: varchar("city", { length: 50 }),
  state: varchar("state", { length: 50 }),
  country: varchar("country", { length: 50 }),
  postalCode: varchar("postalCode", { length: 10 }),
  phoneNumber: varchar("phoneNumber", { length: 15 }),
  email: varchar("email", { length: 100 }).unique(),
  website: varchar("website", { length: 100 }),
  isActive: boolean("isActive").default(true),
});

export const schoolAdmins = pgTable("schoolAdmins", {
  adminId: uuid("adminId").primaryKey().defaultRandom(),
  userId: uuid("userId").references(() => users.userId),
  schoolId: uuid("schoolId").references(() => schools.schoolId),
  assignedAt: timestamp("assignedAt"),
  isActive: boolean("isActive").default(true),
});

export const teacherAssignments = pgTable("teacherAssignments", {
  assignmentId: uuid("assignmentId").primaryKey().defaultRandom(),
  teacherId: uuid("teacherId").references(() => users.userId),
  schoolId: uuid("schoolId").references(() => schools.schoolId),
  assignedAt: timestamp("assignedAt"),
  assignedBy: uuid("assignedBy").references(() => users.userId),
  isActive: boolean("isActive").default(true),
});

export const studentEnrollments = pgTable("studentEnrollments", {
  enrollmentId: uuid("enrollmentId").primaryKey().defaultRandom(),
  studentId: uuid("studentId").references(() => users.userId),
  schoolId: uuid("schoolId").references(() => schools.schoolId),
  enrolledBy: uuid("enrolledBy").references(() => users.userId),
  enrolledAt: timestamp("enrolledAt"),
  currentGrade: varchar("currentGrade", { length: 20 }),
  isActive: boolean("isActive").default(true),
});

// BOOKS & LEVELS
export const levels = pgTable("levels", {
  levelId: uuid("levelId").primaryKey().defaultRandom(),
  levelNumber: integer("levelNumber"),
  levelName: varchar("levelName", { length: 100 }),
  description: text("description"),
  minPointsReq: integer("minPointsReq"),
});

export const books = pgTable("books", {
  bookId: uuid("bookId").primaryKey().defaultRandom(),
  title: varchar("title", { length: 150 }),
  author: varchar("author", { length: 100 }),
  description: text("description"),
  coverImageUrl: text("coverImageUrl"),
  totalPages: integer("totalPages"),
  minLevelReq: integer("minLevelReq"),
  maxPoints: integer("maxPoints"),
  isActive: boolean("isActive").default(true),
});

export const bookPages = pgTable("bookPages", {
  pageId: uuid("pageId").primaryKey().defaultRandom(),
  bookId: uuid("bookId").references(() => books.bookId),
  pageNumber: integer("pageNumber"),
  content: text("content"),
  imagesUrl: text("imagesUrl"),
});

export const unlockedBooks = pgTable("unlockedBooks", {
  unlockId: uuid("unlockId").primaryKey().defaultRandom(),
  studentId: uuid("studentId").references(() => users.userId),
  bookId: uuid("bookId").references(() => books.bookId),
  unlockedAt: timestamp("unlockedAt"),
  unlockedBy: uuid("unlockedBy").references(() => users.userId),
});

// BOOK SESSION
export const bookSessions = pgTable("bookSessions", {
  bookSessionId: uuid("bookSessionId").primaryKey().defaultRandom(),
  studentId: uuid("studentId").references(() => users.userId),
  bookId: uuid("bookId").references(() => books.bookId),
  sessionType: varchar("sessionType", { length: 20 }),
  maxPoints: integer("maxPoints"),
  isCompleted: boolean("isCompleted"),
});

export const bookSessionReport = pgTable("bookSessionReport", {
  bookSessionReportId: uuid("bookSessionReportId").primaryKey().defaultRandom(),
  bookSessionId: uuid("bookSessionId").references(
    () => bookSessions.bookSessionId
  ),
  pointsEarned: integer("pointsEarned"),
  wordsCorrect: integer("wordsCorrect"),
  wordsIncorrect: integer("wordsIncorrect"),
  wordsPerMinute: integer("wordsPerMinute"),
});

export const speechAttempts = pgTable("speechAttempts", {
  speechAttemptId: uuid("speechAttemptId").primaryKey().defaultRandom(),
  bookSessionReportId: uuid("bookSessionReportId").references(
    () => bookSessionReport.bookSessionReportId
  ),
  audioRecordingUrl: text("audioRecordingUrl"),
  transcriptText: text("transcriptText"),
  confidenceScore: integer("confidenceScore"),
  wordsCorrect: integer("wordsCorrect"),
  wordsIncorrect: integer("wordsIncorrect"),
  totalWords: integer("totalWords"),
  accuracy: integer("accuracy"),
  processedAt: timestamp("processedAt"),
});

// QUIZZES
export const quizzes = pgTable("quizzes", {
  quizId: uuid("quizId").primaryKey().defaultRandom(),
  quizName: varchar("quizName", { length: 100 }),
  description: text("description"),
  totalQuestions: integer("totalQuestions"),
  timeLimitMinutes: integer("timeLimitMinutes"),
  passingScore: integer("passingScore"),
  isActive: boolean("isActive").default(true),
});

export const quizQuestions = pgTable("quizQuestions", {
  questionId: uuid("questionId").primaryKey().defaultRandom(),
  quizId: uuid("quizId").references(() => quizzes.quizId),
  questionText: text("questionText"),
  questionType: varchar("questionType", { length: 20 }),
  points: integer("points"),
});

export const questionOptions = pgTable("questionOptions", {
  optionId: uuid("optionId").primaryKey().defaultRandom(),
  questionId: uuid("questionId").references(() => quizQuestions.questionId),
  optionText: text("optionText"),
  isCorrect: boolean("isCorrect"),
});

export const studentQuizAttempts = pgTable("studentQuizAttempts", {
  attemptId: uuid("attemptId").primaryKey().defaultRandom(),
  studentId: uuid("studentId").references(() => users.userId),
  quizId: uuid("quizId").references(() => quizzes.quizId),
  score: integer("score"),
  pointsEarned: integer("pointsEarned"),
  isPromoted: boolean("isPromoted"),
});

export const studentQuizAnswers = pgTable("studentQuizAnswers", {
  answerId: uuid("answerId").primaryKey().defaultRandom(),
  attemptId: uuid("attemptId").references(() => studentQuizAttempts.attemptId),
  questionId: uuid("questionId").references(() => quizQuestions.questionId),
  selectedOptionId: uuid("selectedOptionId").references(
    () => questionOptions.optionId
  ),
  answerText: text("answerText"),
  isCorrect: boolean("isCorrect"),
  pointsEarned: integer("pointsEarned"),
});

// STUDENT PROGRESS
export const studentProgressReports = pgTable("studentProgressReports", {
  reportId: uuid("reportId").primaryKey().defaultRandom(),
  studentId: uuid("studentId").references(() => users.userId),
  generatedAt: timestamp("generatedAt"),
  generatedBy: uuid("generatedBy").references(() => users.userId),
  currentLevel: integer("currentLevel"),
  booksReadCount: integer("booksReadCount"),
  averageAccuracy: integer("averageAccuracy"),
  improvementSuggestions: text("improvementSuggestions"),
});

export const teacherDashboards = pgTable("teacherDashboards", {
  dashboardId: uuid("dashboardId").primaryKey().defaultRandom(),
  teacherId: uuid("teacherId").references(() => users.userId),
  students: text("students"),
  views: jsonb("views"),
});

export const adminReports = pgTable("adminReports", {
  reportId: uuid("reportId").primaryKey().defaultRandom(),
  schoolId: uuid("schoolId").references(() => schools.schoolId),
  generatedAt: timestamp("generatedAt"),
  generatedBy: uuid("generatedBy").references(() => users.userId),
  reportData: jsonb("reportData"),
});

export const assessments = pgTable("assessments", {
  assessmentId: uuid("assessmentId").primaryKey().defaultRandom(),
  assignmentName: varchar("assignmentName", { length: 100 }),
  coverUrl: text("coverUrl"),
  isActive: boolean("isActive"),
});

export const studentAssessments = pgTable("studentAssessments", {
  studentAssessmentId: uuid("studentAssessmentId").primaryKey().defaultRandom(),
  assignmentId: uuid("assignmentId").references(() => assessments.assessmentId),
  studentId: uuid("studentId").references(() => users.userId),
  isCompleted: boolean("isCompleted"),
});

// CHATBOT
export const chats = pgTable("chats", {
  chatId: uuid("chatId").primaryKey().defaultRandom(),
  userId: uuid("userId").references(() => users.userId),
  title: varchar("title", { length: 100 }),
});

export const messages = pgTable("messages", {
  messageId: uuid("messageId").primaryKey().defaultRandom(),
  chatId: uuid("chatId").references(() => chats.chatId),
  role: varchar("role", { length: 20 }),
  content: text("content"),
});
