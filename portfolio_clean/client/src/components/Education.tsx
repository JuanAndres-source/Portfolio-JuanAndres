import { EDUCATION } from "@/lib/constants";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  } as any;

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  } as any;

  return (
    <AnimatedSection id="education" className="py-20">
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
            Education
          </h2>
          <motion.div
            className="w-16 h-1 bg-primary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          />
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {EDUCATION.map((edu, index) => (
            <motion.div key={edu.id} className="relative" variants={itemVariants}>
              {/* Timeline line */}
              {index !== EDUCATION.length - 1 && (
                <motion.div
                  className="absolute left-8 top-24 bottom-0 w-0.5 bg-border"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                  viewport={{ once: true }}
                />
              )}

              {/* Timeline item */}
              <div className="flex gap-8 mb-12">
                {/* Timeline dot */}
                <motion.div
                  className="flex flex-col items-center"
                  variants={dotVariants}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-xl relative z-10 shadow-lg"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 10px 25px rgba(30, 64, 175, 0.4)",
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(30, 64, 175, 0.7)",
                        "0 0 0 10px rgba(30, 64, 175, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="flex-1 pt-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-border card-accent"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                        {edu.degree}
                      </h3>
                      <p className="font-body text-primary font-semibold">
                        {edu.institution}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {edu.location}
                      </p>
                    </motion.div>

                    {/* Specialization */}
                    <motion.p
                      className="font-body text-sm text-foreground mb-3 italic"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.35 + index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      {edu.specialization}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      className="font-body text-foreground mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      {edu.description}
                    </motion.p>

                    {/* Dates */}
                    <motion.div
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <motion.span
                        className="inline-block w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="font-body font-medium">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{
            boxShadow: "0 10px 15px -3px rgba(30, 64, 175, 0.1)",
          }}
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-4">
            🎓 Academic Highlights
          </h3>
          <ul className="space-y-3">
            {[
              "Double major in Information Systems & Information Technologies",
              "International exchange experience in France",
              "Master 1 level coursework in Software Engineering & BigData",
              "C1 Cambridge English Certification",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                viewport={{ once: true }}
              >
                <span className="text-primary font-bold mt-1">✓</span>
                <span className="font-body text-foreground">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
