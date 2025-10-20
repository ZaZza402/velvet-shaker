import { useState } from "react";
import { motion } from "framer-motion";
import NeonGridBackground from "./NeonGridBackground";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setSubmitMessage("✨ Benvenuto nell'Inner Circle!");
      setEmail("");
      setIsSubmitting(false);

      // Clear message after 3 seconds
      setTimeout(() => setSubmitMessage(""), 3000);
    }, 1000);
  };

  return (
    <footer className="footer-container">
      {/* Neon Grid Background */}
      <NeonGridBackground />

      {/* Top Fade Transition */}
      <div className="footer-fade-top" />

      <div className="footer-content">
        {/* Main Footer Header */}
        <div className="footer-header">
          <h3 className="footer-title">L'Underground</h3>
          <p
            className="footer-tagline font-handwriting"
            style={{
              lineHeight: "2",
              letterSpacing: "0.02em",
              fontSize: "1.25rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            "Dove ogni cocktail racconta una storia, e ogni storia diventa una
            leggenda."
          </p>
        </div>

        {/* Three-Column Information Grid */}
        <div className="footer-info-grid">
          <div className="footer-info-column">
            <h4 className="footer-column-title text-pink-400">Indirizzo</h4>
            <p className="footer-column-text">
              Via Panisperna, 101
              <br />
              Quartiere Monti, Roma 00184
            </p>
          </div>

          <div className="footer-info-column">
            <h4 className="footer-column-title text-green-400">Orari</h4>
            <p className="footer-column-text">
              Mer - Dom: 18:00 - 02:00
              <br />
              Chiuso Lun e Mar
            </p>
          </div>

          <div className="footer-info-column">
            <h4 className="footer-column-title text-purple-400">Contatti</h4>
            <p className="footer-column-text">
              (555) COCKTAIL
              <br />
              info@lunderground.bar
            </p>
          </div>
        </div>

        {/* Interactive Social & Newsletter Section */}
        <div className="footer-interactive-section">
          {/* Social Links */}
          <div className="footer-social-container">
            <h5 className="footer-social-heading">Connettiti Con Noi</h5>
            <div className="footer-social-links">
              {/* Instagram */}
              <motion.a
                href="https://www.facebook.com/ax.m826"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>

              {/* Facebook */}
              <motion.a
                href="https://www.facebook.com/ax.m826"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>

              {/* X (Twitter) */}
              <motion.a
                href="https://www.facebook.com/ax.m826"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>

              {/* TikTok */}
              <motion.a
                href="https://www.facebook.com/ax.m826"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="TikTok"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter-container">
            <h5 className="footer-newsletter-heading">Join the Inner Circle</h5>
            <p className="footer-newsletter-subtext font-georgia">
              Ricevi inviti esclusivi e aggiornamenti segreti
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="footer-newsletter-form"
            >
              <div className="footer-input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la.tua@email.com"
                  required
                  disabled={isSubmitting}
                  className="footer-email-input"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="footer-submit-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="footer-button-loading">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </span>
                  ) : (
                    "Submit"
                  )}
                </motion.button>
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="footer-submit-message"
                >
                  {submitMessage}
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-copyright">
          <p className="footer-copyright-text">
            © 2025 L'Underground. Tutti i diritti riservati.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy" className="footer-legal-link">
              Privacy Policy
            </a>
            <span className="footer-legal-separator">•</span>
            <a href="#terms" className="footer-legal-link">
              Termini di Servizio
            </a>
          </div>

          {/* Designer Credit */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-center text-lg font-bold text-gray-300">
              Designed by{" "}
              <a
                href="https://www.facebook.com/ax.m826"
                target="_blank"
                rel="noopener noreferrer"
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-300 hover:to-purple-300 transition-all duration-300 font-extrabold"
              >
                Alex
              </a>
            </p>
            <p className="text-center text-sm text-gray-500 mt-2 font-georgia italic">
              Questo è un sito dimostrativo - Contattami per il tuo progetto!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
