import { trpc } from "@/lib/trpc";
import { Activity, Trophy, Zap, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import ChessStatsChart from "./ChessStatsChart";
import RunningStatsChart from "./RunningStatsChart";

interface RunningAchievement {
  id: number;
  eventType: string;
  time: string;
  pace?: string | null;
  date: Date;
  location?: string | null;
  notes?: string | null;
}

interface ChessRating {
  id: number;
  timeControl: string;
  currentRating: number;
  peakRating: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  winRate?: string | number | null;
  chessComUsername?: string | null;
}

type TabType = "running" | "chess" | "learning" | "other";

export default function Interests() {
  const [activeTab, setActiveTab] = useState<TabType>("running");
  const [runningData, setRunningData] = useState<RunningAchievement[]>([]);
  const [chessData, setChessData] = useState<ChessRating[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from API
  const runningQuery = trpc.interests.getRunning.useQuery();
  const chessQuery = trpc.interests.getChess.useQuery();

  useEffect(() => {
    if (runningQuery.data) {
      setRunningData(runningQuery.data);
    }
    if (chessQuery.data) {
      setChessData(chessQuery.data);
    }
    if (runningQuery.isLoading || chessQuery.isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [runningQuery.data, chessQuery.data, runningQuery.isLoading, chessQuery.isLoading]);

  // Fallback data if API is not available
  const fallbackRunning: RunningAchievement[] = [
    {
      id: 1,
      eventType: "Half Marathon",
      time: "1:29:38",
      pace: "4:16/km",
      date: new Date(),
      location: "Spain",
      notes: "Personal Best",
    },
    {
      id: 2,
      eventType: "5K",
      time: "19:18",
      pace: "3:52/km",
      date: new Date(),
      location: "Spain",
      notes: "Personal Best",
    },
  ];

  const fallbackChess: ChessRating[] = [
    {
      id: 1,
      timeControl: "Bullet",
      currentRating: 1815,
      peakRating: 1815,
      gamesPlayed: 500,
      wins: 250,
      losses: 200,
      draws: 50,
      winRate: 50,
      chessComUsername: "thewhitebishopgm",
    },
    {
      id: 2,
      timeControl: "Rapid",
      currentRating: 1785,
      peakRating: 1785,
      gamesPlayed: 300,
      wins: 150,
      losses: 120,
      draws: 30,
      winRate: 50,
      chessComUsername: "thewhitebishopgm",
    },
  ];

  const displayRunning = runningData.length > 0 ? runningData : fallbackRunning;
  const displayChess = chessData.length > 0 ? chessData : fallbackChess;

  const tabs = [
    { id: "running" as TabType, label: "🏃 Running", icon: Activity },
    { id: "chess" as TabType, label: "♟️ Chess", icon: Trophy },
    { id: "learning" as TabType, label: "📚 Learning", icon: BookOpen },
    { id: "other" as TabType, label: "⚡ Other", icon: Zap },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatedSection id="interests" className="py-20 bg-secondary/30 dark:bg-slate-900/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Interests & Hobbies
          </h2>
          <motion.div
            className="w-16 h-1 bg-primary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          />
          <motion.p
            className="font-body text-lg text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Beyond coding, I'm passionate about various activities that challenge and inspire me.
          </motion.p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="mb-12 flex flex-wrap gap-2 border-b border-border pb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-body font-semibold rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-secondary dark:bg-slate-700 text-foreground hover:bg-primary/10 dark:hover:bg-primary/20"
              }`}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div className="min-h-96">
          <AnimatePresence mode="wait">
            {/* Running Tab */}
            {activeTab === "running" && (
              <motion.div
                key="running"
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {displayRunning.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-border card-accent"
                      variants={itemVariants}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <h4 className="font-display text-2xl font-bold text-primary mb-1">
                            {achievement.eventType}
                          </h4>
                          <p className="font-body text-sm text-muted-foreground">
                            {achievement.location}
                          </p>
                        </motion.div>
                        <motion.span
                          className="px-3 py-1 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold"
                          whileHover={{ scale: 1.1 }}
                        >
                          PB
                        </motion.span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-body text-sm text-muted-foreground">Time</span>
                          <motion.span
                            className="font-display text-2xl font-bold text-foreground"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {achievement.time}
                          </motion.span>
                        </div>
                        {achievement.pace && (
                          <div className="flex items-center justify-between">
                            <span className="font-body text-sm text-muted-foreground">Pace</span>
                            <span className="font-body font-semibold text-foreground">
                              {achievement.pace}
                            </span>
                          </div>
                        )}
                        {achievement.notes && (
                          <div className="pt-3 border-t border-border">
                            <p className="font-body text-sm text-primary italic">
                              {achievement.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      <motion.a
                        href="https://www.strava.com/athletes/18121100"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-body text-primary hover:text-primary-light transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        View on Strava →
                      </motion.a>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Running Stats Chart */}
                <RunningStatsChart />

                {/* Running Stats Box */}
                <motion.div
                  className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 rounded-lg p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <h4 className="font-display text-lg font-bold text-foreground mb-4">
                    🏃 Running Philosophy
                  </h4>
                  <p className="font-body text-foreground mb-4">
                    Running is my escape and my challenge. Every kilometer is an opportunity to push my limits, improve my mental health, and discover new places. I believe in consistency over intensity, and I'm always working to beat my personal records.
                  </p>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      { label: "Half Marathon PB", value: "1:29:38" },
                      { label: "5K PB", value: "19:18" },
                      { label: "Favorite Distance", value: "Half Marathon" },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                      >
                        <p className="font-body text-xs text-muted-foreground mb-1">
                          {stat.label}
                        </p>
                        <p className="font-display text-2xl font-bold text-primary">
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Chess Tab */}
            {activeTab === "chess" && (
              <motion.div
                key="chess"
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {displayChess.map((rating) => (
                    <motion.div
                      key={rating.id}
                      className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-border card-accent"
                      variants={itemVariants}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-display text-2xl font-bold text-primary">
                          {rating.timeControl}
                        </h4>
                        <motion.span
                          className="px-3 py-1 bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-semibold"
                          whileHover={{ scale: 1.1 }}
                        >
                          Peak: {rating.peakRating}
                        </motion.span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-baseline gap-2">
                          <motion.span
                            className="font-display text-4xl font-bold text-primary"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {rating.currentRating}
                          </motion.span>
                          <span className="font-body text-sm text-muted-foreground">Elo</span>
                        </div>

                        <motion.div
                          className="grid grid-cols-3 gap-3 pt-3 border-t border-border"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {[
                            { label: "Games", value: rating.gamesPlayed },
                            { label: "Wins", value: rating.wins },
                            { label: "Losses", value: rating.losses },
                          ].map((stat, idx) => (
                            <motion.div
                              key={idx}
                              className="text-center"
                              variants={itemVariants}
                            >
                              <p className="font-body text-xs text-muted-foreground mb-1">
                                {stat.label}
                              </p>
                              <p className="font-display font-bold text-foreground">
                                {stat.value}
                              </p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>

                      <motion.a
                        href={`https://www.chess.com/member/${rating.chessComUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-body text-primary hover:text-primary-light transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        View on Chess.com →
                      </motion.a>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Chess Rating Chart */}
                <ChessStatsChart />

                {/* Chess Stats Box */}
                <motion.div
                  className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <h4 className="font-display text-lg font-bold text-foreground mb-4">
                    ♟️ Chess Philosophy
                  </h4>
                  <p className="font-body text-foreground">
                    Chess is my intellectual playground. It teaches me strategy, patience, and decision-making under pressure. I enjoy all time controls and am always working to improve my rating and understanding of the game.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Learning Tab */}
            {activeTab === "learning" && (
              <motion.div
                key="learning"
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <h4 className="font-display text-lg font-bold text-foreground mb-4">
                    📚 Continuous Learning
                  </h4>
                  <p className="font-body text-foreground mb-4">
                    I'm passionate about expanding my knowledge through courses, books, and hands-on projects. Currently exploring advanced topics in software architecture, cloud computing, and emerging technologies.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Other Tab */}
            {activeTab === "other" && (
              <motion.div
                key="other"
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <h4 className="font-display text-lg font-bold text-foreground mb-4">
                    ⚡ Other Interests
                  </h4>
                  <p className="font-body text-foreground">
                    Beyond my main hobbies, I enjoy exploring new technologies, contributing to open-source projects, and connecting with the tech community. I'm always open to new experiences and learning opportunities.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
