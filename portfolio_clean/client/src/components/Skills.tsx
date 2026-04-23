import { SKILLS_BY_CATEGORY } from "@/lib/constants";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: "🎨",
  "Backend & DB": "⚙️",
  Mobile: "📱",
  "Cloud & DevOps": "☁️",
  "Software Engineering": "🛠️",
};

const PROFICIENCY_COLORS = {
  Expert: "bg-primary",
  Intermediate: "bg-blue-400",
  Familiar: "bg-blue-200",
};

const PROFICIENCY_WIDTH = {
  Expert: "95%",
  Intermediate: "75%",
  Familiar: "50%",
};

export default function Skills() {
  const { ref: sectionRef, isInView } = useInViewAnimation({
    threshold: 0.1,
  });

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
    <AnimatedSection id="skills" className="py-20">
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
            Skills & Technologies
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
            A comprehensive overview of my technical expertise across different domains
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {Object.entries(SKILLS_BY_CATEGORY).map(([category, levels], categoryIndex) => (
            <motion.div
              key={category}
              className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-border card-accent"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Header */}
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className="text-3xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {CATEGORY_ICONS[category]}
                </motion.span>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {category}
                </h3>
              </motion.div>

              {/* Proficiency Levels */}
              <div className="space-y-6">
                {Object.entries(levels).map(([level, skills], levelIndex) =>
                  skills.length > 0 && (
                    <motion.div
                      key={level}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + levelIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-body text-sm font-semibold text-primary mb-3">
                        {level.toUpperCase()}
                      </p>
                      <div className="space-y-3">
                        {skills.map((skill, idx) => (
                          <motion.div
                            key={skill}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              delay:
                                categoryIndex * 0.1 + levelIndex * 0.05 + idx * 0.03,
                            }}
                            viewport={{ once: true }}
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex-1">
                              <p className="font-body text-sm font-medium text-foreground mb-1">
                                {skill}
                              </p>
                              <div className="w-full bg-secondary dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                <motion.div
                                  className={`h-full ${
                                    PROFICIENCY_COLORS[
                                      level as keyof typeof PROFICIENCY_COLORS
                                    ]
                                  } rounded-full`}
                                  initial={{ width: "0%" }}
                                  whileInView={{
                                    width:
                                      PROFICIENCY_WIDTH[
                                        level as keyof typeof PROFICIENCY_WIDTH
                                      ],
                                  }}
                                  transition={{
                                    duration: 0.8,
                                    delay:
                                      categoryIndex * 0.1 +
                                      levelIndex * 0.05 +
                                      idx * 0.05,
                                    ease: "easeOut",
                                  }}
                                  viewport={{ once: true }}
                                />
                              </div>
                            </div>
                            <span className="font-body text-xs font-semibold text-muted-foreground whitespace-nowrap">
                              {level}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { label: "Expert Skills", value: "8+" },
            { label: "Intermediate", value: "6+" },
            { label: "Familiar", value: "5+" },
            { label: "Total Technologies", value: "19+" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-6 border border-primary/20 text-center"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(30, 64, 175, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="font-display text-3xl font-bold text-primary mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="font-body text-sm text-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{
            boxShadow: "0 10px 15px -3px rgba(30, 64, 175, 0.1)",
          }}
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-4">
            💡 Continuous Learning
          </h3>
          <p className="font-body text-foreground mb-4">
            I'm constantly expanding my technical knowledge and staying updated with the latest technologies in software development. My experience spans across multiple domains, allowing me to approach problems from different perspectives.
          </p>
          <ul className="space-y-2">
            {[
              "Strong foundation in software engineering principles and design patterns",
              "Experience with both frontend and backend development",
              "Mobile development expertise with modern frameworks",
              "Database design and optimization skills",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                viewport={{ once: true }}
              >
                <span className="text-primary font-bold">→</span>
                <span className="font-body text-foreground">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
