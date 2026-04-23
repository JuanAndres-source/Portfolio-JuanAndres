import { useTheme } from "@/contexts/ThemeContext";
import { NAV_ITEMS, PERSONAL_INFO } from "@/lib/constants";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useScrollEffect } from "@/hooks/useScrollEffect";

export default function Navbar() {
  const { theme, toggleTheme, switchable } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");
  const { scrollY } = useScrollEffect();

  // Apply shadow and height change based on scroll
  const isScrolled = scrollY > 10;

  const translations = {
    es: {
      home: "Inicio",
      about: "Sobre mí",
      education: "Educación",
      projects: "Proyectos",
      skills: "Habilidades",
      languages: "Idiomas",
      contact: "Contacto",
      openToOpportunities: "Abierto a oportunidades",
    },
    en: {
      home: "Home",
      about: "About",
      education: "Education",
      projects: "Projects",
      skills: "Skills",
      languages: "Languages",
      contact: "Contact",
      openToOpportunities: "Open to opportunities",
    },
  };

  const t = translations[language];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex justify-between items-center"
          animate={{ height: isScrolled ? "60px" : "64px" }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 font-display text-xl font-bold text-primary hover:text-primary-light transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/logo.png" alt="JAF Logo" className="w-8 h-8 object-contain" />
            <span className="hidden sm:inline">Juan Andrés</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-body text-sm relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {t[item.label.toLowerCase() as keyof typeof t] || item.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <motion.div
              className="flex gap-2 border border-border rounded-lg p-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => setLanguage("es")}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === "es"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                EN
              </button>
            </motion.div>

            {/* Theme Toggle */}
            {switchable && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-lg"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </motion.div>
            )}

            {/* Open to Opportunities Badge */}
            <motion.div
              className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-medium text-green-700 dark:text-green-300">
                {t.openToOpportunities}
              </span>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-border py-4 space-y-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_ITEMS.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {t[item.label.toLowerCase() as keyof typeof t] || item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
