import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background dark:bg-slate-950 dark:text-slate-100 py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold mb-2">Juan Andrés</h3>
            <p className="font-body text-sm opacity-75">
              Software Developer specializing in Web, Mobile & Databases
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="font-body text-sm opacity-75 hover:opacity-100 transition-opacity">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="font-body text-sm opacity-75 hover:opacity-100 transition-opacity">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="font-body text-sm opacity-75 hover:opacity-100 transition-opacity">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="font-body text-sm opacity-75 hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display text-sm font-bold mb-4">Connect</h4>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-sm font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-body text-sm opacity-75 hover:opacity-100 transition-opacity break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="font-body text-sm opacity-75 hover:opacity-100 transition-opacity"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </li>
              <li className="font-body text-sm opacity-75">
                {PERSONAL_INFO.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 dark:border-slate-800 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="font-body text-sm opacity-75">
            © {currentYear} Juan Andrés Aliaga Fuentes. All rights reserved.
          </p>

          {/* Made with love */}
          <div className="flex items-center gap-2 font-body text-sm opacity-75">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-current" />
            <span>using React & Tailwind CSS</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-background/20 dark:border-slate-800">
          <p className="font-body text-xs opacity-60 text-center">
            This portfolio is designed and built by Juan Andrés Aliaga Fuentes.
            <br />
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </footer>
  );
}
