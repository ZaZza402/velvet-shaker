import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ClientContactPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Lock body scroll when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift
      console.log("🔒 Body scroll locked");
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isVisible]);

  useEffect(() => {
    // Pop-up will show on every page load (no session storage check)
    console.log("🚀 ClientContactPopup mounted - timers started");

    let hasTriggered = false;
    let scrollTimeout: number | undefined;

    const showPopup = () => {
      if (!hasTriggered) {
        console.log("🎉 SHOWING POPUP NOW!");
        hasTriggered = true;
        setIsVisible(true);
      }
    };

    const handleScroll = () => {
      if (hasTriggered) return;

      // Better scroll calculation that works on all browsers
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      const scrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      console.log("📊 Scroll:", {
        scrollTop: Math.round(scrollTop),
        documentHeight: Math.round(documentHeight),
        windowHeight: Math.round(windowHeight),
        percentage: Math.round(scrollPercentage),
      });

      // Show when user reaches 75% of page (easier to trigger)
      if (scrollPercentage >= 75) {
        console.log("✅ Reached 75% - showing popup in 1 second...");
        clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => {
          showPopup();
        }, 1000); // 1 second delay after reaching 75%
      }
    };

    // Show after 30 seconds if user hasn't triggered it (reduced from 60)
    const timeTimeout = window.setTimeout(() => {
      console.log("⏰ 30 seconds elapsed - showing popup");
      showPopup();
    }, 30000); // 30 seconds

    // Add scroll listener with passive for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check in case user is already scrolled
    handleScroll();

    // Log on mount
    console.log("🚀 ClientContactPopup mounted - timers started");

    return () => {
      console.log("🧹 ClientContactPopup cleanup");
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      clearTimeout(timeTimeout);
    };
  }, []); // Empty dependency array - run once on mount

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleContact = () => {
    window.open("https://www.facebook.com/ax.m826", "_blank");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop - prevents scrolling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center overflow-hidden"
            onClick={handleClose}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Popup Container - perfectly centered, NO SCROLLING */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[95%] sm:w-[90%] max-w-lg m-4"
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative" }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-green-500/30 rounded-3xl blur-2xl"></div>

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-pink-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-300 z-10"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Content */}
                <div className="space-y-4 sm:space-y-6 text-center">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-green-400 px-2"
                  >
                    Ti è Piaciuto?
                  </motion.h3>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2 sm:space-y-3 px-2"
                  >
                    <p className="text-base sm:text-lg text-gray-300 font-georgia leading-relaxed">
                      Questo è un sito dimostrativo creato da{" "}
                      <span className="text-pink-400 font-semibold">Alex</span>.
                    </p>
                    <p className="text-sm sm:text-base text-gray-400 font-georgia leading-relaxed">
                      Se ti piace questo design e vuoi qualcosa di simile per il
                      tuo business, contattami!
                    </p>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContact}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all duration-300 text-sm sm:text-base"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Contattami su Facebook
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </span>
                  </motion.button>

                  {/* Dismiss link */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={handleClose}
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300 block w-full py-2"
                  >
                    No grazie, continua a esplorare
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ClientContactPopup;
