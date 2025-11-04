"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { getLanguage, setLanguage } from "~/lib/i18n";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedLang = getLanguage();

    if (!localStorage.getItem("lang")) {
      const browserLang = navigator.language.slice(0, 2);
      const defaultLang = ["id", "en"].includes(browserLang)
        ? browserLang
        : "en";
      setLanguage(defaultLang);
      setLang(defaultLang);
    } else {
      setLang(savedLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "en" ? "id" : "en";
    setLanguage(newLang);
    setLang(newLang);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks = [
    { href: "/", label: lang === "en" ? "Home" : "Beranda" },
    {
      href: "#about",
      label: lang === "en" ? "About" : "Tentang",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const about = document.getElementById("about");
        about?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      href: "#project",
      label: lang === "en" ? "Project" : "Proyek",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const project = document.getElementById("project");
        project?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-3 left-[5%] z-50 w-[90%]"
    >
      <div className="p-1 md:p-2">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="text-xl font-bold text-white">
            AchmadGG
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={link.onClick}
                className="text-gray-300 hover:text-white font-semibold transition"
              >
                {link.label}
              </Link>
            ))}

            {/* Tombol translate */}
            <button
              onClick={toggleLang}
              className="px-3 py-1 text-sm rounded-md bg-white/10 hover:bg-white/20 text-white transition hover:cursor-pointer"
            >
              {lang.toUpperCase()}
            </button>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1 text-sm rounded-md bg-white/10 hover:bg-white/20 text-white transition hover:cursor-pointer"
              aria-label="Translate Button"
            >
              {lang.toUpperCase()}
            </button>

            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white"
              aria-label="Menu Button"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-3 border shadow-lg md:hidden bg-black/10 backdrop-blur-sm rounded-2xl border-white/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => {
                    link.onClick?.(e);
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 font-medium text-gray-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
