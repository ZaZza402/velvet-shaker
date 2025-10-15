// src/components/OrbitalMenu.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./OrbitalMenu.css";

const OrbitalMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Storia", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Menu", href: "#menu" },
    { label: "Dove Trovarci", href: "#location" },
    { label: "Prenota", href: "#reserve" },
  ];

  // Expanding iris animation - button size adapts to content
  const menuVariants = {
    closed: {
      width: "50px", // Fixed width when closed (circular)
      height: "50px",
      borderRadius: "50%", // Full circle when closed
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      width: "auto", // Auto-expand horizontally to fit menu content
      height: "auto", // Auto height to fit menu items
      borderRadius: "25px", // Rounded corners when expanded
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 25,
        when: "beforeChildren",
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="orbital-menu-container"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
    >
      {/* Orb/Close Button is always present */}
      <motion.div className="orb-button" onClick={() => setIsOpen(!isOpen)}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <span className="orb-logo-text">⛶</span>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* The links appear inside the expanded container */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="orbital-menu-list"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {menuItems.map((item) => (
              <motion.li key={item.label} variants={itemVariants}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrbitalMenu;
