// src/components/Gallery.tsx
import { useEffect, useRef, useState } from "react";
import "./Gallery.css";

// Import your images
import img1 from "../assets/images/bartender.jpg";
import img2 from "../assets/images/mixing-drinks.jpg";
import img3 from "../assets/images/cocktail-img.jpg";
import img4 from "../assets/images/inside-showcase-bar.jpg";
import img5 from "../assets/images/bar-diverse-drinks.jpg";
import img6 from "../assets/images/hanging-glasses.jpg";
import img7 from "../assets/images/spritz.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];

// Image component with frame number and film grain
const GalleryImage = ({ src, index }: { src: string; index: number }) => {
  return (
    <div className="gallery-image-container">
      <img src={src} className="gallery-image" alt={`Gallery ${index + 1}`} />

      {/* Film grain & vintage filter overlay */}
      <div
        className="gallery-overlay"
        style={{
          opacity: 0.3,
          mixBlendMode: "overlay",
          filter: "sepia(0.2) contrast(1.1)",
        }}
      />

      {/* Frame number HUD element */}
      <div className="gallery-frame-number">
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
    </div>
  );
};

const Gallery = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Detect if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !trackRef.current) return;

    const track = trackRef.current;
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      setIsDragging(true);
      startX = e.touches[0].pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - startX) * 1.0; // Smooth responsive scrolling
      track.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isDown = false;
      setTimeout(() => setIsDragging(false), 100);
    };

    track.addEventListener("touchstart", handleTouchStart, { passive: false });
    track.addEventListener("touchmove", handleTouchMove, { passive: false });
    track.addEventListener("touchend", handleTouchEnd);

    return () => {
      track.removeEventListener("touchstart", handleTouchStart);
      track.removeEventListener("touchmove", handleTouchMove);
      track.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <section id="gallery" className="gallery-container">
      {/* Fade overlays for smooth appearance/disappearance */}
      <div className="gallery-fade gallery-fade-left" />
      <div className="gallery-fade gallery-fade-right" />

      {/* Auto-scrolling marquee track (desktop) / Swipeable track (mobile) */}
      <div
        ref={trackRef}
        className={`gallery-track ${isMobile ? "mobile-swipe" : ""} ${
          isDragging ? "dragging" : ""
        }`}
      >
        {/* First set of images */}
        {images.map((imgSrc, index) => (
          <GalleryImage key={`first-${index}`} src={imgSrc} index={index} />
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((imgSrc, index) => (
          <GalleryImage key={`second-${index}`} src={imgSrc} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
