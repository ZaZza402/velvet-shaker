import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "./CinematicHero.css";

const CinematicHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [vsAnimComplete, setVsAnimComplete] = useState(false);
  const vsContainerRef = useRef<SVGSVGElement>(null);
  const vsContainerRefDesktop = useRef<SVGSVGElement>(null);

  // Trigger entrance animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  // GSAP-based handwriting reveal animation for VS initials using clipPath
  useLayoutEffect(() => {
    // Determine which paths to animate based on screen size
    const isDesktop = window.innerWidth >= 768;
    const vPath = document.getElementById(
      isDesktop ? "vPathDesktop" : "vPath"
    ) as unknown as SVGPathElement;
    const sPath = document.getElementById(
      isDesktop ? "sPathDesktop" : "sPath"
    ) as unknown as SVGPathElement;

    if (!vPath || !sPath) return;

    // Get the actual total length of each path
    const vLength = vPath.getTotalLength();
    const sLength = sPath.getTotalLength();

    // Set initial state - both paths are invisible (strokes not drawn yet)
    gsap.set(vPath, {
      strokeDasharray: vLength,
      strokeDashoffset: vLength,
    });

    gsap.set(sPath, {
      strokeDasharray: sLength,
      strokeDashoffset: sLength,
    });

    // Animate the handwriting effect - V first, then S
    const tl = gsap.timeline({
      delay: 1,
      onComplete: () => {
        setVsAnimComplete(true);
      },
    });

    // Draw V letter first (1.8 seconds)
    tl.to(vPath, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "power1.inOut",
    });

    // Draw S letter after V (2.2 seconds, slight overlap for smooth transition)
    tl.to(
      sPath,
      {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power1.inOut",
      },
      "-=0.3"
    ); // Start 0.3s before V completes

    return () => {
      tl.kill();
    };
  }, []);

  // Full title animation variants
  const fullTitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 1.2,
        ease: "easeOut" as const,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 5.5, // Appears after VS animation + full title
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  // Cocktail icon animation - slower and more elegant
  const cocktailVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 80,
        duration: 1.5,
      },
    },
  };

  return (
    <div className="cinematic-hero relative min-h-screen flex items-center justify-center bg-black">
      {/* Animated Neon Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(255, 20, 147, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(255, 20, 147, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(138, 43, 226, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(255, 20, 147, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 20, 147, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Atmospheric Light Effects */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-radial from-neon-pink/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-radial from-neon-green/15 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-neon-purple/10 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main Content Container - Desktop Layout */}
      <div className="relative z-40 w-full h-full px-4 sm:px-6">
        {/* MOBILE LAYOUT (centered, stacked) */}
        <div className="md:hidden flex flex-col items-center justify-center h-full text-center">
          {/* Animated Cocktail Icon */}
          <motion.div
            className="mb-4 sm:mb-6 relative"
            variants={cocktailVariants}
            initial="hidden"
            animate="visible"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
              className="cocktail-icon sm:w-[100px] sm:h-[100px]"
              style={{ filter: "url(#soften)" }}
            >
              <defs>
                {/* Soften filter for seamless blending */}
                <filter id="soften">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="0.5"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
                    result="softened"
                  />
                  <feBlend in="SourceGraphic" in2="softened" mode="normal" />
                </filter>

                {/* Subtle animated gradient for neon cocktail effect */}
                <linearGradient
                  id="cocktailGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff1493" stopOpacity="0.7">
                    <animate
                      attributeName="stop-color"
                      values="#ff1493; #00ff00; #8a2be2; #ff1493"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="50%" stopColor="#00ff00" stopOpacity="0.6">
                    <animate
                      attributeName="stop-color"
                      values="#00ff00; #8a2be2; #ff1493; #00ff00"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.7">
                    <animate
                      attributeName="stop-color"
                      values="#8a2be2; #ff1493; #00ff00; #8a2be2"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>

              <path
                d="M13 -0.09375C6.328125 -0.09375 0.90625 5.328125 0.90625 12C0.90625 18.671875 6.328125 24.09375 13 24.09375C14.800781 24.09375 16.535156 23.71875 18.125 22.96875L12.1875 15.71875C11.589844 17.152344 10.75 18.503906 9.84375 17.875C8.261719 16.78125 11.660156 13.351563 12.3125 12.71875L28.03125 31.875C28.015625 31.941406 28 31.988281 28 32.0625L28 43.15625C23.824219 43.933594 16 45.820313 16 49C16 49.554688 16.449219 50 17 50L41 50C41.007813 50 41.027344 50 41.03125 50C41.585938 50 42.03125 49.554688 42.03125 49C42.03125 48.902344 41.996094 48.808594 41.96875 48.71875C41.519531 45.710938 34.050781 43.910156 30 43.15625L30 32.0625C30 31.988281 29.984375 31.945313 29.96875 31.875L45.78125 12.625C46.027344 12.324219 46.070313 11.910156 45.90625 11.5625C45.742188 11.210938 45.386719 11 45 11L25.03125 11C24.519531 4.738281 19.347656 -0.09375 13 -0.09375 Z M 12.34375 6.03125C14.066406 5.847656 13.683594 9.386719 13.4375 11L13.0625 11C12.820313 10.984375 12.578125 11.050781 12.375 11.21875C12.351563 11.238281 12.332031 11.261719 12.3125 11.28125C11.746094 9.820313 10.574219 6.222656 12.34375 6.03125 Z M 17.84375 9.21875C18.261719 9.21875 18.601563 9.378906 18.8125 9.78125C19.0625 10.265625 18.871094 10.65625 18.46875 11L14.34375 11C15.320313 10.234375 16.78125 9.222656 17.84375 9.21875 Z M 7.9375 10.25C9.21875 10.210938 11.191406 11.152344 12.09375 11.625C11.960938 11.953125 11.976563 12.332031 12.21875 12.625C11.203125 12.707031 6.277344 13.03125 6.78125 11.0625C6.925781 10.507813 7.355469 10.269531 7.9375 10.25 Z M 15.125 13L42.875 13L40.40625 16L17.59375 16Z"
                fill="url(#cocktailGradient)"
                opacity="0.85"
              />
            </svg>
          </motion.div>

          {/* Title Animation Container */}
          <div className="mb-8 relative w-full max-w-[90vw] sm:max-w-[80vw] flex flex-col items-center z-40">
            {/* VS Initials - Handwriting Reveal Animation */}
            <motion.div
              className="relative w-full mb-4 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <svg
                ref={vsContainerRef}
                viewBox="0 0 140.04265 108.34565"
                className="w-full h-auto"
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* Neon Gradient for VS */}
                  <linearGradient
                    id="neonGradientVS"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ff0080" />
                    <stop offset="33%" stopColor="#ff1493" />
                    <stop offset="66%" stopColor="#00ffff" />
                    <stop offset="100%" stopColor="#8a2be2" />
                  </linearGradient>

                  {/* Neon Glow Filter */}
                  <filter
                    id="neonGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                      result="glow"
                    />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g transform="translate(-5.0879279,-9.471831) scale(0.96095857,1.0406276)">
                  {/* V Letter - Amsterdam Handwriting */}
                  <path
                    id="vPath"
                    d="m 34.389757,20.775049 q 0.293972,-1.028903 0.832922,-1.567852 0.587944,-0.587945 1.126894,-0.587945 0.489954,0 0.734931,0.538949 0.293972,0.489954 0.195981,1.567853 -0.09799,0.783926 -1.077898,3.72365 -0.979908,2.939724 -2.596757,7.398306 -1.567852,4.409586 -3.625659,10.093052 -2.008811,5.634471 -4.164609,11.856887 -2.155798,6.222415 -4.360591,12.689808 -2.155797,6.418397 -4.066618,12.493827 -1.861825,6.07543 -3.282692,11.415928 -1.371871,5.389494 -2.057806,9.407117 -0.636941,4.017621 -0.440959,6.369401 0.244977,2.40078 1.714839,2.44977 0.734931,0.049 2.596756,-2.1068 1.861825,-2.1068 4.556572,-5.87945 2.743743,-3.72365 6.173421,-8.819171 3.429678,-5.095522 7.251319,-10.97497 3.870636,-5.928443 8.035245,-12.346841 4.164609,-6.418397 8.329218,-12.787799 4.164609,-6.369402 8.182232,-12.444831 4.017623,-6.124425 7.643282,-11.317938 3.62566,-5.242507 6.663375,-9.309125 3.037714,-4.115614 5.242507,-6.565384 0.342968,-0.391963 0.636941,-0.440959 0.342967,-0.04899 0.489954,0.09799 0.146986,0.146986 0.09799,0.440959 0,0.293972 -0.342967,0.685935 -1.910821,2.057807 -4.752554,5.977439 -2.792738,3.919632 -6.222416,9.113144 -3.429678,5.193513 -7.34931,11.366933 -3.919632,6.17342 -8.084241,12.738804 -4.164609,6.516388 -8.378213,13.179762 -4.213604,6.614379 -8.280223,12.7878 -4.017622,6.124425 -7.741273,11.464923 -3.72365,5.340499 -6.859356,9.260128 -3.08671,3.96863 -5.487484,6.22242 -2.35178,2.30278 -3.723651,2.30278 -0.440958,0 -0.685935,-0.19598 -1.7638347,-1.12689 -2.1557979,-4.2626 -0.3429678,-3.08671 0.3919632,-7.692277 0.7349307,-4.605567 2.3517787,-10.485015 1.616849,-5.879448 3.772646,-12.493827 2.155798,-6.614379 4.654563,-13.767707 2.547761,-7.153329 5.046526,-14.306657 2.498766,-7.153328 4.850545,-14.110675 2.351779,-6.957347 4.164609,-13.179763 z"
                    fill="none"
                    stroke="url(#neonGradientVS)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#neonGlow)"
                    style={{ paintOrder: "stroke" }}
                  />

                  {/* S Letter - Amsterdam Handwriting */}
                  <path
                    id="sPath"
                    d="m 127.56068,41.673023 q -0.63694,0.489954 -1.17589,0.587945 -0.53895,0.09799 -0.83292,-0.04899 -0.24498,-0.195982 -0.14699,-0.53895 0.098,-0.391963 0.73493,-0.881917 3.77265,-2.743742 6.85936,-5.634471 3.08671,-2.890728 5.38949,-5.634471 2.30279,-2.743742 3.82164,-5.193512 1.51886,-2.498766 2.1558,-4.360591 0.63694,-1.91082 0.34297,-3.08671 -0.24498,-1.224885 -1.51886,-1.420866 -2.74374,-0.440959 -6.95735,0.587944 -4.2136,1.028904 -9.16214,3.08671 -4.89954,2.008812 -10.19104,4.850545 -5.24251,2.792738 -10.19104,5.977439 -4.89954,3.135705 -9.06415,6.418397 -4.164609,3.233696 -6.908352,6.124425 -2.743742,2.890729 -3.674655,5.242508 -0.881917,2.302784 0.734931,3.576664 1.763835,1.371871 5.193513,2.400774 3.429678,1.028904 7.741273,2.008812 4.3116,0.930912 9.06415,1.959816 4.75255,1.028903 9.11314,2.44977 4.40959,1.371871 7.98625,3.282692 3.62566,1.91082 5.63447,4.654563 5.92845,-1.224885 10.09306,-1.910821 4.16461,-0.734931 5.58547,-1.077899 0.29397,-0.09799 0.39197,0.049 0.14698,0.146986 0.19598,0.391963 0.049,0.195981 -0.049,0.391963 -0.049,0.195982 -0.19598,0.244977 -2.98872,0.587945 -6.90835,1.371871 -3.87064,0.734931 -8.37821,1.714839 0.9799,1.714839 1.17588,3.772646 0.24498,2.057807 -0.39196,4.507577 -0.63694,2.44977 -2.25379,5.291503 -1.61684,2.890728 -4.36059,6.271411 -4.40958,5.389494 -9.70109,9.26013 -5.2425,3.87064 -10.68099,6.3694 -5.43849,2.49877 -10.778991,3.67466 -5.340499,1.17589 -9.946067,1.17589 -3.674654,0 -6.663374,-0.73493 -3.037715,-0.68594 -5.046526,-2.00882 -2.008811,-1.32287 -2.890729,-3.28269 -0.881917,-1.91082 -0.244977,-4.360588 0.587945,-2.44977 2.841734,-5.389494 2.253788,-2.890728 6.467392,-6.222415 3.086711,-2.44977 6.859356,-4.556573 3.772646,-2.106802 7.88826,-3.968627 4.164609,-1.81283 8.574192,-3.331687 4.45858,-1.567853 8.86817,-2.841733 4.45858,-1.273881 8.72118,-2.302784 4.2626,-1.077899 8.13324,-1.910821 -1.71484,-2.204793 -4.75256,-3.72365 -2.98872,-1.518857 -6.76136,-2.596756 -3.77265,-1.126894 -7.98625,-1.910821 -4.21361,-0.832922 -8.23123,-1.616848 -4.017622,-0.832922 -7.594286,-1.763834 -3.576664,-0.930913 -6.075429,-2.302784 -2.44977,-1.420867 -3.576664,-3.380683 -1.126895,-1.959816 -0.293973,-4.752553 0.63694,-2.057807 2.792738,-4.605568 2.204793,-2.547761 5.487485,-5.340499 3.331687,-2.792737 7.447299,-5.63447 4.16461,-2.890729 8.67219,-5.585476 4.55657,-2.694747 9.21113,-5.046526 4.70356,-2.351779 9.01516,-4.115614 4.31159,-1.763834 8.03524,-2.743742 3.77265,-1.028903 6.4184,-1.028903 2.00881,0 3.23369,0.63694 2.05781,1.077899 2.44977,2.939724 0.39197,1.861825 -0.53894,4.262599 -0.88192,2.35178 -2.84174,5.095522 -1.91082,2.743742 -4.55657,5.585476 -2.59676,2.792737 -5.68347,5.53648 -3.03771,2.743742 -6.12442,5.095521 z m 3.03771,28.172355 q -6.17342,1.371871 -12.93478,3.184701 -6.76137,1.81283 -13.22876,4.066618 -6.467392,2.302784 -12.24885,5.095522 -5.781457,2.792737 -10.093052,6.17342 -3.821641,2.988719 -5.879448,5.585475 -2.057807,2.645752 -2.645751,4.80155 -0.587945,2.204796 0.146986,3.919636 0.734931,1.71483 2.498765,2.89072 1.763835,1.22489 4.409586,1.86183 2.645752,0.63694 5.928443,0.63694 4.164609,0 9.015154,-1.12689 4.899537,-1.0779 9.897067,-3.38069 5.04653,-2.30278 9.89707,-5.928441 4.85055,-3.625659 8.96616,-8.721181 2.74374,-3.380682 4.36059,-6.17342 1.61685,-2.792738 2.30279,-5.144517 0.73493,-2.351779 0.58794,-4.2626 -0.14698,-1.91082 -0.97991,-3.478673 z"
                    fill="none"
                    stroke="url(#neonGradientVS)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#neonGlow)"
                    style={{ paintOrder: "stroke" }}
                  />
                </g>
              </svg>
            </motion.div>

            {/* Full Title "Il Velvet Shaker" - Appears After VS Animation */}
            <motion.h1
              className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-wider text-center z-50"
              style={{
                fontFamily: '"Playfair Display", serif',
                background:
                  "linear-gradient(90deg, #ff0080 0%, #ff1493 15%, #00ffff 35%, #8a2be2 55%, #ff00ff 75%, #ff0080 100%)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "0 0 20px rgba(255, 20, 147, 0.5)",
                animation: "shimmer 4s linear infinite",
              }}
              variants={fullTitleVariants}
              initial="hidden"
              animate={vsAnimComplete ? "visible" : "hidden"}
            >
              Il Velvet Shaker
            </motion.h1>

            {/* CSS Keyframes for shimmer animation */}
            <style>{`
            @keyframes shimmer {
              0% {
                background-position: 0% center;
              }
              100% {
                background-position: 200% center;
              }
            }
          `}</style>
          </div>

          {/* Animated Subtitle */}
          <motion.p
            className="font-georgia text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 tracking-wide max-w-2xl italic"
            style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.2)" }}
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            Dove ogni cocktail racconta una storia
          </motion.p>
        </div>

        {/* DESKTOP LAYOUT - Left/Right positioning (>= 768px) */}
        <div className="hidden md:flex relative z-40 w-full h-full px-8 lg:px-16 items-center justify-center">
          <div className="relative w-full max-w-7xl h-full flex items-center">
            {/* LEFT SIDE: Cocktail + Full Title */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-start space-y-6">
              {/* Animated Cocktail Icon */}
              <motion.div
                className="relative"
                variants={cocktailVariants}
                initial="hidden"
                animate="visible"
              >
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 50 50"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cocktail-icon lg:w-[140px] lg:h-[140px]"
                  style={{ filter: "url(#softenDesktop)" }}
                >
                  <defs>
                    <filter id="softenDesktop">
                      <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="0.5"
                        result="blur"
                      />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
                        result="softened"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="softened"
                        mode="normal"
                      />
                    </filter>

                    <linearGradient
                      id="cocktailGradientDesktop"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ff1493" stopOpacity="0.7">
                        <animate
                          attributeName="stop-color"
                          values="#ff1493; #00ff00; #8a2be2; #ff1493"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="50%" stopColor="#00ff00" stopOpacity="0.6">
                        <animate
                          attributeName="stop-color"
                          values="#00ff00; #8a2be2; #ff1493; #00ff00"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.7">
                        <animate
                          attributeName="stop-color"
                          values="#8a2be2; #ff1493; #00ff00; #8a2be2"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </stop>
                    </linearGradient>
                  </defs>

                  <path
                    d="M13 -0.09375C6.328125 -0.09375 0.90625 5.328125 0.90625 12C0.90625 18.671875 6.328125 24.09375 13 24.09375C14.800781 24.09375 16.535156 23.71875 18.125 22.96875L12.1875 15.71875C11.589844 17.152344 10.75 18.503906 9.84375 17.875C8.261719 16.78125 11.660156 13.351563 12.3125 12.71875L28.03125 31.875C28.015625 31.941406 28 31.988281 28 32.0625L28 43.15625C23.824219 43.933594 16 45.820313 16 49C16 49.554688 16.449219 50 17 50L41 50C41.007813 50 41.027344 50 41.03125 50C41.585938 50 42.03125 49.554688 42.03125 49C42.03125 48.902344 41.996094 48.808594 41.96875 48.71875C41.519531 45.710938 34.050781 43.910156 30 43.15625L30 32.0625C30 31.988281 29.984375 31.945313 29.96875 31.875L45.78125 12.625C46.027344 12.324219 46.070313 11.910156 45.90625 11.5625C45.742188 11.210938 45.386719 11 45 11L25.03125 11C24.519531 4.738281 19.347656 -0.09375 13 -0.09375 Z M 12.34375 6.03125C14.066406 5.847656 13.683594 9.386719 13.4375 11L13.0625 11C12.820313 10.984375 12.578125 11.050781 12.375 11.21875C12.351563 11.238281 12.332031 11.261719 12.3125 11.28125C11.746094 9.820313 10.574219 6.222656 12.34375 6.03125 Z M 17.84375 9.21875C18.261719 9.21875 18.601563 9.378906 18.8125 9.78125C19.0625 10.265625 18.871094 10.65625 18.46875 11L14.34375 11C15.320313 10.234375 16.78125 9.222656 17.84375 9.21875 Z M 7.9375 10.25C9.21875 10.210938 11.191406 11.152344 12.09375 11.625C11.960938 11.953125 11.976563 12.332031 12.21875 12.625C11.203125 12.707031 6.277344 13.03125 6.78125 11.0625C6.925781 10.507813 7.355469 10.269531 7.9375 10.25 Z M 15.125 13L42.875 13L40.40625 16L17.59375 16Z"
                    fill="url(#cocktailGradientDesktop)"
                    opacity="0.85"
                  />
                </svg>
              </motion.div>

              {/* Full Title "Il Velvet Shaker" */}
              <motion.h1
                className="relative text-5xl lg:text-6xl xl:text-7xl font-serif tracking-wider text-left z-50"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  background:
                    "linear-gradient(90deg, #ff0080 0%, #ff1493 15%, #00ffff 35%, #8a2be2 55%, #ff00ff 75%, #ff0080 100%)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 20px rgba(255, 20, 147, 0.5)",
                  animation: "shimmer 4s linear infinite",
                }}
                variants={fullTitleVariants}
                initial="hidden"
                animate={vsAnimComplete ? "visible" : "hidden"}
              >
                Il Velvet Shaker
              </motion.h1>
            </div>

            {/* CENTER: Subtitle */}
            <div className="absolute left-1/2 bottom-32 -translate-x-1/2 flex flex-col items-center">
              <motion.p
                className="font-georgia text-xl lg:text-2xl xl:text-3xl text-white/70 tracking-wide italic text-center max-w-xl"
                style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.2)" }}
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
              >
                Dove ogni cocktail racconta una storia
              </motion.p>
            </div>

            {/* RIGHT SIDE: VS Initials */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 lg:w-80 xl:w-96">
              <motion.div
                className="relative z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <svg
                  ref={vsContainerRefDesktop}
                  viewBox="0 0 140.04265 108.34565"
                  className="w-full h-auto"
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    <linearGradient
                      id="neonGradientVSDesktop"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ff0080" />
                      <stop offset="33%" stopColor="#ff1493" />
                      <stop offset="66%" stopColor="#00ffff" />
                      <stop offset="100%" stopColor="#8a2be2" />
                    </linearGradient>

                    <filter
                      id="neonGlowDesktop"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="4"
                        result="blur"
                      />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                        result="glow"
                      />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g transform="translate(-5.0879279,-9.471831) scale(0.96095857,1.0406276)">
                    <path
                      id="vPathDesktop"
                      className="vs-path-desktop"
                      d="m 34.389757,20.775049 q 0.293972,-1.028903 0.832922,-1.567852 0.587944,-0.587945 1.126894,-0.587945 0.489954,0 0.734931,0.538949 0.293972,0.489954 0.195981,1.567853 -0.09799,0.783926 -1.077898,3.72365 -0.979908,2.939724 -2.596757,7.398306 -1.567852,4.409586 -3.625659,10.093052 -2.008811,5.634471 -4.164609,11.856887 -2.155798,6.222415 -4.360591,12.689808 -2.155797,6.418397 -4.066618,12.493827 -1.861825,6.07543 -3.282692,11.415928 -1.371871,5.389494 -2.057806,9.407117 -0.636941,4.017621 -0.440959,6.369401 0.244977,2.40078 1.714839,2.44977 0.734931,0.049 2.596756,-2.1068 1.861825,-2.1068 4.556572,-5.87945 2.743743,-3.72365 6.173421,-8.819171 3.429678,-5.095522 7.251319,-10.97497 3.870636,-5.928443 8.035245,-12.346841 4.164609,-6.418397 8.329218,-12.787799 4.164609,-6.369402 8.182232,-12.444831 4.017623,-6.124425 7.643282,-11.317938 3.62566,-5.242507 6.663375,-9.309125 3.037714,-4.115614 5.242507,-6.565384 0.342968,-0.391963 0.636941,-0.440959 0.342967,-0.04899 0.489954,0.09799 0.146986,0.146986 0.09799,0.440959 0,0.293972 -0.342967,0.685935 -1.910821,2.057807 -4.752554,5.977439 -2.792738,3.919632 -6.222416,9.113144 -3.429678,5.193513 -7.34931,11.366933 -3.919632,6.17342 -8.084241,12.738804 -4.164609,6.516388 -8.378213,13.179762 -4.213604,6.614379 -8.280223,12.7878 -4.017622,6.124425 -7.741273,11.464923 -3.72365,5.340499 -6.859356,9.260128 -3.08671,3.96863 -5.487484,6.22242 -2.35178,2.30278 -3.723651,2.30278 -0.440958,0 -0.685935,-0.19598 -1.7638347,-1.12689 -2.1557979,-4.2626 -0.3429678,-3.08671 0.3919632,-7.692277 0.7349307,-4.605567 2.3517787,-10.485015 1.616849,-5.879448 3.772646,-12.493827 2.155798,-6.614379 4.654563,-13.767707 2.547761,-7.153329 5.046526,-14.306657 2.498766,-7.153328 4.850545,-14.110675 2.351779,-6.957347 4.164609,-13.179763 z"
                      fill="none"
                      stroke="url(#neonGradientVSDesktop)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#neonGlowDesktop)"
                      style={{ paintOrder: "stroke" }}
                    />

                    <path
                      id="sPathDesktop"
                      className="vs-path-desktop"
                      d="m 127.56068,41.673023 q -0.63694,0.489954 -1.17589,0.587945 -0.53895,0.09799 -0.83292,-0.04899 -0.24498,-0.195982 -0.14699,-0.53895 0.098,-0.391963 0.73493,-0.881917 3.77265,-2.743742 6.85936,-5.634471 3.08671,-2.890728 5.38949,-5.634471 2.30279,-2.743742 3.82164,-5.193512 1.51886,-2.498766 2.1558,-4.360591 0.63694,-1.91082 0.34297,-3.08671 -0.24498,-1.224885 -1.51886,-1.420866 -2.74374,-0.440959 -6.95735,0.587944 -4.2136,1.028904 -9.16214,3.08671 -4.89954,2.008812 -10.19104,4.850545 -5.24251,2.792738 -10.19104,5.977439 -4.89954,3.135705 -9.06415,6.418397 -4.164609,3.233696 -6.908352,6.124425 -2.743742,2.890729 -3.674655,5.242508 -0.881917,2.302784 0.734931,3.576664 1.763835,1.371871 5.193513,2.400774 3.429678,1.028904 7.741273,2.008812 4.3116,0.930912 9.06415,1.959816 4.75255,1.028903 9.11314,2.44977 4.40959,1.371871 7.98625,3.282692 3.62566,1.91082 5.63447,4.654563 5.92845,-1.224885 10.09306,-1.910821 4.16461,-0.734931 5.58547,-1.077899 0.29397,-0.09799 0.39197,0.049 0.14698,0.146986 0.19598,0.391963 0.049,0.195981 -0.049,0.391963 -0.049,0.195982 -0.19598,0.244977 -2.98872,0.587945 -6.90835,1.371871 -3.87064,0.734931 -8.37821,1.714839 0.9799,1.714839 1.17588,3.772646 0.24498,2.057807 -0.39196,4.507577 -0.63694,2.44977 -2.25379,5.291503 -1.61684,2.890728 -4.36059,6.271411 -4.40958,5.389494 -9.70109,9.26013 -5.2425,3.87064 -10.68099,6.3694 -5.43849,2.49877 -10.778991,3.67466 -5.340499,1.17589 -9.946067,1.17589 -3.674654,0 -6.663374,-0.73493 -3.037715,-0.68594 -5.046526,-2.00882 -2.008811,-1.32287 -2.890729,-3.28269 -0.881917,-1.91082 -0.244977,-4.360588 0.587945,-2.44977 2.841734,-5.389494 2.253788,-2.890728 6.467392,-6.222415 3.086711,-2.44977 6.859356,-4.556573 3.772646,-2.106802 7.88826,-3.968627 4.164609,-1.81283 8.574192,-3.331687 4.45858,-1.567853 8.86817,-2.841733 4.45858,-1.273881 8.72118,-2.302784 4.2626,-1.077899 8.13324,-1.910821 -1.71484,-2.204793 -4.75256,-3.72365 -2.98872,-1.518857 -6.76136,-2.596756 -3.77265,-1.126894 -7.98625,-1.910821 -4.21361,-0.832922 -8.23123,-1.616848 -4.017622,-0.832922 -7.594286,-1.763834 -3.576664,-0.930913 -6.075429,-2.302784 -2.44977,-1.420867 -3.576664,-3.380683 -1.126895,-1.959816 -0.293973,-4.752553 0.63694,-2.057807 2.792738,-4.605568 2.204793,-2.547761 5.487485,-5.340499 3.331687,-2.792737 7.447299,-5.63447 4.16461,-2.890729 8.67219,-5.585476 4.55657,-2.694747 9.21113,-5.046526 4.70356,-2.351779 9.01516,-4.115614 4.31159,-1.763834 8.03524,-2.743742 3.77265,-1.028903 6.4184,-1.028903 2.00881,0 3.23369,0.63694 2.05781,1.077899 2.44977,2.939724 0.39197,1.861825 -0.53894,4.262599 -0.88192,2.35178 -2.84174,5.095522 -1.91082,2.743742 -4.55657,5.585476 -2.59676,2.792737 -5.68347,5.53648 -3.03771,2.743742 -6.12442,5.095521 z m 3.03771,28.172355 q -6.17342,1.371871 -12.93478,3.184701 -6.76137,1.81283 -13.22876,4.066618 -6.467392,2.302784 -12.24885,5.095522 -5.781457,2.792737 -10.093052,6.17342 -3.821641,2.988719 -5.879448,5.585475 -2.057807,2.645752 -2.645751,4.80155 -0.587945,2.204796 0.146986,3.919636 0.734931,1.71483 2.498765,2.89072 1.763835,1.22489 4.409586,1.86183 2.645752,0.63694 5.928443,0.63694 4.164609,0 9.015154,-1.12689 4.899537,-1.0779 9.897067,-3.38069 5.04653,-2.30278 9.89707,-5.928441 4.85055,-3.625659 8.96616,-8.721181 2.74374,-3.380682 4.36059,-6.17342 1.61685,-2.792738 2.30279,-5.144517 0.73493,-2.351779 0.58794,-4.2626 -0.14698,-1.91082 -0.97991,-3.478673 z"
                      fill="none"
                      stroke="url(#neonGradientVSDesktop)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#neonGlowDesktop)"
                      style={{ paintOrder: "stroke" }}
                    />
                  </g>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Close Main Content Container */}
      </div>

      {/* CSS Keyframes for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>

      {/* Bottom Fade Transition Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-black pointer-events-none"
        style={{ zIndex: 100 }}
      ></div>

      {/* UI ELEMENTS (z-50) */}

      {/* DESKTOP NAVIGATION - Renders only on screens >= 768px wide */}
      <nav className="hidden md:flex absolute top-0 left-0 right-0 z-50 p-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          <div
            className="text-2xl font-serif"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "#ff1493",
              textShadow: "0 0 10px #ff1493",
            }}
          >
            Il Velvet Shaker
          </div>
          <div className="flex space-x-8">
            <a
              href="#story"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#story")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Storia
            </a>
            <a
              href="#gallery"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#gallery")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Gallery
            </a>
            <a
              href="#menu"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#menu")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Menu
            </a>
            <a
              href="#location"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#location")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Dove Trovarci
            </a>
            <a
              href="#reserve"
              className="text-white hover:text-green-400 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#reserve")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Prenota
            </a>
          </div>
        </div>
      </nav>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-1000 delay-1800 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div
          className="flex flex-col items-center"
          style={{ color: "#ff1493" }}
        >
          <span
            className="text-xs sm:text-sm mb-2 tracking-wide"
            style={{ textShadow: "0 0 10px #ff1493" }}
          >
            Scorri per esplorare
          </span>
          <div
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: "#ff1493", boxShadow: "0 0 10px #ff1493" }}
          >
            <div
              className="w-1 h-2 sm:h-3 rounded-full mt-2 animate-bounce"
              style={{ backgroundColor: "#ff1493" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicHero;
