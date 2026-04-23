import { LANGUAGES } from "@/lib/constants";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

const languageDetails: Record<string, string> = {
  es: "Native Spanish speaker from Almería",
  en: "Cambridge C1 English certification",
  fr: "Intermediate French B1/B2 with exchange experience in (Toulon,France)",
};

export default function Languages() {
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
    <AnimatedSection id="languages" className="py-20 bg-secondary/30 dark:bg-slate-900/50">
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
            Languages
          </h2>
          <motion.div
            className="w-16 h-1 bg-primary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          />
        </motion.div>

        {/* Languages Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {LANGUAGES.map((lang, index) => (
            <motion.div
              key={lang.code}
              className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-border card-accent"
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Flag and Name */}
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-12 h-8 object-cover rounded shadow-sm"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {lang.name}
                  </h3>
                  <p className="font-body text-sm text-primary font-semibold">
                    {lang.level}
                  </p>
                </div>
              </motion.div>

              {/* Proficiency Bar */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-xs font-semibold text-muted-foreground">
                    PROFICIENCY
                  </span>
                  <span className="font-body text-sm font-bold text-primary">
                    {lang.proficiency}/5
                  </span>
                </div>
                <div className="w-full bg-secondary dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{
                      width: `${(lang.proficiency / 5) * 100}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1 + 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>

              {/* Stars */}
              <motion.div
                className="flex gap-1 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.15 }}
                viewport={{ once: true }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className={`text-xl ${
                      i < lang.proficiency ? "text-yellow-400" : "text-gray-300"
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.2 + i * 0.05,
                    }}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    viewport={{ once: true }}
                  >
                    ★
                  </motion.span>
                ))}
              </motion.div>

              {/* Detail */}
              {languageDetails[lang.code] && (
                <motion.div
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.25 }}
                  viewport={{ once: true }}
                >
                  <span className="text-primary font-bold">✓</span>
                  <span className="font-body text-sm text-foreground">
                    {languageDetails[lang.code]}
                  </span>
                </motion.div>
              )}

              {/* Certification */}
              {lang.certification && (
                <motion.div
                  className="mt-6 pt-6 border-t border-border"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <p className="font-body text-xs font-semibold text-muted-foreground mb-2">
                    CERTIFICATION
                  </p>
                  <p className="font-body text-sm text-foreground">
                    {lang.certification}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
