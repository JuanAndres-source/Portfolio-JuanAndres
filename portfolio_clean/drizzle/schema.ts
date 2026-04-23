import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Running achievements table
 * Stores personal running records and achievements
 */
export const runningAchievements = mysqlTable("running_achievements", {
  id: int("id").autoincrement().primaryKey(),
  eventType: varchar("eventType", { length: 50 }).notNull(), // "5K", "Half Marathon", "Marathon", etc.
  time: varchar("time", { length: 20 }).notNull(), // "1:29:38" format
  pace: varchar("pace", { length: 20 }), // "4:45/km" format
  date: timestamp("date").defaultNow().notNull(),
  location: varchar("location", { length: 255 }),
  notes: text("notes"),
  stravaActivityId: varchar("stravaActivityId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RunningAchievement = typeof runningAchievements.$inferSelect;
export type InsertRunningAchievement = typeof runningAchievements.$inferInsert;

/**
 * Chess ratings table
 * Stores chess ratings across different time controls
 */
export const chessRatings = mysqlTable("chess_ratings", {
  id: int("id").autoincrement().primaryKey(),
  timeControl: varchar("timeControl", { length: 50 }).notNull(), // "Bullet", "Rapid", "Classical", etc.
  currentRating: int("currentRating").notNull(),
  peakRating: int("peakRating").notNull(),
  gamesPlayed: int("gamesPlayed").notNull(),
  wins: int("wins").notNull(),
  losses: int("losses").notNull(),
  draws: int("draws").notNull(),
  winRate: decimal("winRate", { precision: 5, scale: 2 }), // percentage
  chessComUsername: varchar("chessComUsername", { length: 255 }),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChessRating = typeof chessRatings.$inferSelect;
export type InsertChessRating = typeof chessRatings.$inferInsert;

/**
 * Interests section table
 * Stores information about personal interests and hobbies
 */
export const interests = mysqlTable("interests", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 50 }).notNull(), // "Running", "Chess", etc.
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }), // emoji or icon name
  isActive: boolean("isActive").default(true).notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Interest = typeof interests.$inferSelect;
export type InsertInterest = typeof interests.$inferInsert;

/**
 * Social profiles table
 * Stores links to external profiles (Strava, Chess.com, etc.)
 */
export const socialProfiles = mysqlTable("social_profiles", {
  id: int("id").autoincrement().primaryKey(),
  platform: varchar("platform", { length: 50 }).notNull(), // "Strava", "Chess.com", "GitHub", etc.
  username: varchar("username", { length: 255 }).notNull(),
  profileUrl: varchar("profileUrl", { length: 500 }).notNull(),
  isPublic: boolean("isPublic").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SocialProfile = typeof socialProfiles.$inferSelect;
export type InsertSocialProfile = typeof socialProfiles.$inferInsert;