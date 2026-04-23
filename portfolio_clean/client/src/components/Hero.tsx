import { PERSONAL_INFO } from "@/lib/constants";
import { ArrowRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { AnimatedCounter } from "./AnimatedCounter";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const TYPING_WORDS = [
  "Software Developer",
  "Mobile Engineer",
  "Backend Developer",
  "Computer Engineering Student",
];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);
  const { ref: statsRef, isInView: statsInView } = useInViewAnimation();

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
          setTypingSpeed(80);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50);
        }, 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
          setTypingSpeed(50);
        }, typingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        setTypingSpeed(80);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, wordIndex, isDeleting, typingSpeed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  } as any;

  const floatingVariants = {
    floating: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663578436605/UsX2YGyQy7TMo35LJKCtjz/hero-background-dAGMJiuVxeP7uUZR7Bg5w4.webp)',
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-white/80 dark:bg-slate-900/80" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-30"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(30, 64, 175, 0.1) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 50%, rgba(30, 64, 175, 0.1) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, rgba(30, 64, 175, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={prefersReducedMotion ? "visible" : "visible"}
        >
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Title */}
            <motion.div variants={itemVariants}>
              <motion.h1
                className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Juan Andrés
              </motion.h1>
              <div className="flex items-baseline gap-3">
                <motion.span
                  className="font-display text-3xl md:text-4xl text-primary font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {displayedText}
                </motion.span>
                <motion.span
                  className="inline-block w-1 h-8 md:h-10 bg-primary rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="font-body text-lg text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              Building clean, scalable software from mobile apps to databases.
            </motion.p>

            {/* Location & Status */}
            <motion.div
              className="flex items-center gap-4 flex-wrap"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium text-foreground">
                  📍 {PERSONAL_INFO.location}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Open to opportunities
                </span>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white font-medium rounded-lg group w-full sm:w-auto"
                >
                  View My Projects
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.a>
              <motion.a
                href={PERSONAL_INFO.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 font-medium rounded-lg group w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </motion.a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.p className="font-display text-2xl font-bold text-primary">
                  {statsInView ? <AnimatedCounter to={4} suffix="+" /> : "4+"}
                </motion.p>
                <p className="text-sm text-muted-foreground">Years Learning</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.p className="font-display text-2xl font-bold text-primary">
                  {statsInView ? <AnimatedCounter to={3} /> : "3"}
                </motion.p>
                <p className="text-sm text-muted-foreground">Languages</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.p className="font-display text-2xl font-bold text-primary">
                  {statsInView ? <AnimatedCounter to={3} /> : "3"}
                </motion.p>
                <p className="text-sm text-muted-foreground">Major Projects</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Profile Image Placeholder */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="relative w-80 h-80"
              variants={floatingVariants}
              animate="floating"
            >
              {/* Circular frame with accent border */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center overflow-hidden shadow-2xl"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(30, 64, 175, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Placeholder for profile photo */}
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center p-8">
                  <motion.img
                    src="/logo.png"
                    alt="JAF Logo"
                    className="w-full h-full object-contain"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Decorative elements with animation */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">
            Scroll to explore
          </span>
          <motion.svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </div>
      </motion.div>
    </section>
  );
}
