import { ALL_SKILLS, FUN_FACTS, PERSONAL_INFO } from "@/lib/constants";
import { Download } from "lucide-react";
// LinkedIn SVG icon component
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-4 w-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { StaggerContainer } from "./StaggerContainer";

export default function About() {
  const skillCategories = [
    { name: "Frontend", skills: ["Angular", "TypeScript", "HTML5", "CSS3"] },
    { name: "Backend & DB", skills: ["MySQL", "SQL", "PHP"] },
    { name: "Mobile", skills: ["Kotlin", "Jetpack Compose", "Android Studio"] },
    { name: "Cloud & DevOps", skills: ["Git", "Google Cloud", "Azure", "AWS"] },
    { name: "Software Eng", skills: ["Java", "C#", "Bash", "UML"] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <AnimatedSection id="about" className="py-20 bg-secondary/30 dark:bg-slate-900/50">
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
            About Me
          </h2>
          <motion.div
            className="w-16 h-1 bg-primary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Bio Section */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="prose dark:prose-invert max-w-none" variants={itemVariants}>
              <p className="font-body text-lg text-foreground leading-relaxed">
                {PERSONAL_INFO.summary}
              </p>
            </motion.div>

            {/* Education Highlight */}
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-border card-accent"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                Currently Studying
              </h3>
              <motion.div
                className="flex items-center gap-3 mb-3"
                whileHover={{ x: 5 }}
              >
                <img
                  src="/ual.png"
                  alt="Universidad de Almería"
                  className="w-10 h-10 object-contain rounded"
                />
                <p className="font-body text-foreground">
                  <strong>University of Almería</strong> — Computer Engineering
                </p>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <img
                  src="/isen-app.png"
                  alt="ISEN Toulon"
                  className="w-10 h-10 object-contain rounded"
                />
                <p className="font-body text-foreground">
                  <strong>ISEN Toulon, France</strong> — Exchange Semester (Spring 2025)
                </p>
              </motion.div>
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {FUN_FACTS.map((fact, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-border"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-body text-sm text-foreground">{fact}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* LinkedIn Profile Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white font-medium rounded-lg w-full md:w-auto group"
                >
                  <LinkedInIcon />
                  My LinkedIn Profile
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Tech Stack Grid */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Tech Stack
              </h3>

              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h4 className="font-body text-sm font-semibold text-primary mb-3">
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="inline-block px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded-full text-xs font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        viewport={{ once: true, margin: "-100px" }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Info Card */}
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-border card-accent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h4 className="font-display text-sm font-bold text-foreground mb-4">
                Get in Touch
              </h4>
              <div className="space-y-3">
                <motion.a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="block font-body text-sm text-primary hover:text-primary-light transition-colors"
                  whileHover={{ x: 5 }}
                >
                  📧 {PERSONAL_INFO.email}
                </motion.a>
                <motion.a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="block font-body text-sm text-primary hover:text-primary-light transition-colors"
                  whileHover={{ x: 5 }}
                >
                  📱 {PERSONAL_INFO.phone}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
