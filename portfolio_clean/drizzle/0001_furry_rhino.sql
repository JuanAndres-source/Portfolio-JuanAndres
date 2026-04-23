CREATE TABLE `chess_ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`timeControl` varchar(50) NOT NULL,
	`currentRating` int NOT NULL,
	`peakRating` int NOT NULL,
	`gamesPlayed` int NOT NULL,
	`wins` int NOT NULL,
	`losses` int NOT NULL,
	`draws` int NOT NULL,
	`winRate` decimal(5,2),
	`chessComUsername` varchar(255),
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chess_ratings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `interests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`isActive` boolean NOT NULL DEFAULT true,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `interests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `running_achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` varchar(50) NOT NULL,
	`time` varchar(20) NOT NULL,
	`pace` varchar(20),
	`date` timestamp NOT NULL DEFAULT (now()),
	`location` varchar(255),
	`notes` text,
	`stravaActivityId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `running_achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `social_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`platform` varchar(50) NOT NULL,
	`username` varchar(255) NOT NULL,
	`profileUrl` varchar(500) NOT NULL,
	`isPublic` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `social_profiles_id` PRIMARY KEY(`id`)
);
