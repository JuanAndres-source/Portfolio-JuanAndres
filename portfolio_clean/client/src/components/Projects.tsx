import { PROJECTS } from "@/lib/constants";
import { Github } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

type ProjectType = "Mobile" | "Web" | "Backend" | "Database";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectType | "All">("All");
  const { ref: headerRef, isInView: headerInView } = useInViewAnimation();

  const filters: (ProjectType | "All")[] = ["All", "Mobile", "Web", "Backend", "Database"];

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === activeFilter);

  const featuredProjects = PROJECTS.filter((p) => p.featured);

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
    <AnimatedSection id="projects" className="py-20 bg-secondary/30 dark:bg-slate-900/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Projects & Experience
          </h2>
          <motion.div
            className="w-16 h-1 bg-primary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          />
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProjects.map((featuredProject, index) => (
            <motion.div
              key={featuredProject.id}
              className="mb-16 bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-border card-accent"
              variants={itemVariants}
              whileHover={{
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                y: -5,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image */}
                <motion.div
                  className="bg-gradient-to-br from-primary/20 to-primary/5 h-80 md:h-auto flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.img
                    src={(featuredProject as any).image}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded-full text-xs font-semibold">
                      Featured Project
                    </span>
                  </motion.div>

                  <motion.h3
                    className="font-display text-3xl font-bold text-foreground mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    viewport={{ once: true }}
                  >
                    {featuredProject.title}
                  </motion.h3>

                  <motion.p
                    className="font-body text-muted-foreground mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {featuredProject.description}
                  </motion.p>

                  <motion.ul
                    className="space-y-2 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    {featuredProject.highlights.slice(0, 3).map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + idx * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-primary font-bold mt-1">→</span>
                        <span className="font-body text-sm text-foreground">{highlight}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    viewport={{ once: true }}
                  >
                    <p className="font-body text-xs font-semibold text-muted-foreground mb-2">
                      TECHNOLOGIES
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.technologies.map((tech, techIdx) => (
                        <motion.span
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded text-xs font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + techIdx * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          viewport={{ once: true }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <a href={featuredProject.github} target="_blank" rel="noopener noreferrer">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10 rounded-lg"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Button>
                      </motion.div>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-body font-medium transition-all ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-slate-800 text-foreground border border-border hover:border-primary"
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeFilter}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-border card-accent"
                variants={itemVariants}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-primary font-semibold">
                      {project.role}
                    </p>
                  </motion.div>
                  <motion.span
                    className="px-2 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded text-xs font-semibold"
                    whileHover={{ scale: 1.1 }}
                  >
                    {project.type}
                  </motion.span>
                </div>

                <p className="font-body text-sm text-foreground mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <p className="font-body text-xs font-semibold text-muted-foreground mb-2">
                    TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIdx) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 bg-secondary dark:bg-slate-700 text-foreground rounded text-xs font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIdx * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        viewport={{ once: true }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs font-medium text-muted-foreground">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-body text-xs text-muted-foreground">
                    {project.startDate} — {project.endDate}
                  </span>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <button className="p-2 hover:bg-secondary dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <Github className="h-4 w-4 text-foreground hover:text-primary" />
                    </button>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
