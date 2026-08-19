"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { navLinks, BRAND } from "@/lib/data";
import { Activity, Code2 as Github, MessageCircle as Twitter } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  function getLinkHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-[var(--border)]/60 bg-[var(--background)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </div>
            <span className="text-[var(--foreground)] font-semibold text-base tracking-tight">
              {BRAND.name}
            </span>
            <span className="text-[var(--muted-foreground)] text-sm hidden sm:inline">
              &mdash; {BRAND.tagline}
            </span>
          </div>

          {/* Nav links */}
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={getLinkHref(link.href)}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
              >
                {navT[link.key] ?? link.label}
              </Link>
            ))}
          </nav>

          {/* Social + copyright */}
          <div className="flex items-center gap-4">
            <a
              href={BRAND.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rao on Twitter"
              className="text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              <Twitter className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={BRAND.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rao on GitHub"
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
            <span className="text-xs text-[var(--muted-foreground)]">
              &copy; 2024 {BRAND.name}
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}