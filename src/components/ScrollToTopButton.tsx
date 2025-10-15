import { useEffect } from "react";
import { motion, useScroll, useAnimation } from "framer-motion";
import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const { scrollY } = useScroll();
  const controls = useAnimation();

  useEffect(() => {
    // Watch scroll position
    const unsubscribe = scrollY.on("change", (latest) => {
      // Show after scrolling past the first section (CinematicStory)
      // Hero is ~100vh, CinematicStory starts after that
      const threshold = window.innerHeight * 1.5; // 1.5 screens down

      if (latest > threshold) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    });

    return () => unsubscribe();
  }, [scrollY, controls]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.button
      className="scroll-to-top-button"
      onClick={scrollToTop}
      variants={buttonVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.1,
        rotate: -5,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.9,
        rotate: 5,
      }}
      aria-label="Scroll to top"
    >
      {/* Animated background glow */}
      <motion.div
        className="button-glow"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icon container */}
      <div className="button-content">
        {/* Chevron Up Icon */}
        <motion.svg
          className="button-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 15l7-7 7 7"
          />
        </motion.svg>

        {/* Secondary chevron for depth */}
        <motion.svg
          className="button-icon-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{
            y: [2, -2, 2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 15l7-7 7 7"
          />
        </motion.svg>
      </div>

      {/* Orbital rings */}
      <motion.div
        className="button-ring"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="button-ring-reverse"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Tooltip */}
      <div className="button-tooltip">Ascensione</div>
    </motion.button>
  );
};

export default ScrollToTopButton;
