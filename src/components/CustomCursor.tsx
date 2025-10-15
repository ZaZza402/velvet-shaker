import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CustomCursor.css";

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursorDot || !cursorRing) return;

    // Mouse move handler - smooth cursor following
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Animate cursor dot with slight delay for smoothness
      gsap.to(cursorDot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Animate cursor ring with more delay for elegant lag effect
      gsap.to(cursorRing, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Mouse enter handler - scale up ring on interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursorRing, {
        scale: 1.5,
        backgroundColor: "rgba(255, 20, 147, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Mouse leave handler - scale ring back to normal
    const handleMouseLeave = () => {
      gsap.to(cursorRing, {
        scale: 1,
        backgroundColor: "rgba(255, 20, 147, 0)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Add interactive elements listeners
    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor-hover], input[type="button"], input[type="submit"]'
      );

      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      });

      return interactiveElements;
    };

    // Add mousemove listener
    window.addEventListener("mousemove", handleMouseMove);

    // Add interactive listeners
    const interactiveElements = addInteractiveListeners();

    // Observe DOM changes to handle dynamically added elements
    const observer = new MutationObserver(() => {
      // Remove old listeners
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      // Re-add listeners to all current interactive elements
      addInteractiveListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });

      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: "4px",
          height: "4px",
          backgroundColor: "#ff1493",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />

      {/* Outer Ring */}
      <div
        ref={cursorRingRef}
        className="custom-cursor-ring pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: "30px",
          height: "30px",
          border: "1px solid #ff1493",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 20, 147, 0)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
};

export default CustomCursor;
