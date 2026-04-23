import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Contact() {
  const [state, setState] = useState({ submitting: false, succeeded: false, errors: [] as string[] });

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setState({ submitting: true, succeeded: false, errors: [] });
  const form = e.currentTarget;
  const data = new FormData(form);
  const res = await fetch("https://formspree.io/f/xaqapzaj", {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  });
  if (res.ok) {
    setState({ submitting: false, succeeded: true, errors: [] });
  } else {
    setState({ submitting: false, succeeded: false, errors: ["Error al enviar. Inténtalo de nuevo."] });
  }
};

  return (
    <section id="contact" className="py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full" />
          <p className="font-body text-lg text-muted-foreground mt-4">
            I'm always interested in hearing about new opportunities and projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Email */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-border card-accent">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">Email</h3>
              </div>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="font-body text-primary hover:text-primary-light transition-colors"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-border card-accent">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">Phone</h3>
              </div>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="font-body text-primary hover:text-primary-light transition-colors"
              >
                {PERSONAL_INFO.phone}
              </a>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-border">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                Connect
              </h3>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((link) => (

                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-secondary dark:bg-slate-700 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                  >
                    <span className="flex items-center justify-center w-6 h-6">
                      {link.icon === "github" ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-foreground group-hover:text-primary transition-colors">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                      ) : link.icon === "linkedin" ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0A66C2] group-hover:text-[#0A66C2] transition-colors">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      ) : (
                        <span className="text-lg">🔗</span>
                      )}
                    </span>
                    <span className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Status Badge */}
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="font-display text-lg font-bold text-green-700 dark:text-green-300">
                  Open to Opportunities
                </h3>
              </div>
              <p className="font-body text-sm text-green-700 dark:text-green-300">
                I'm actively looking for my first professional opportunity in software development.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {state.succeeded ? (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-border card-accent flex flex-col items-center justify-center text-center h-full gap-4">
                <div className="text-5xl">🎉</div>
                <h3 className="font-display text-2xl font-bold text-foreground">Message sent!</h3>
                <p className="font-body text-muted-foreground">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-border card-accent"
              >
                {/* Name Field */}
                <div className="mb-6">
                  <label htmlFor="name" className="block font-body text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <label htmlFor="email" className="block font-body text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="your.email@example.com"
                  />
                
                </div>

                {/* Subject Field */}
                <div className="mb-6">
                  <label htmlFor="subject" className="block font-body text-sm font-semibold text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message Field */}
                <div className="mb-6">
                  <label htmlFor="message" className="block font-body text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-lg group"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}