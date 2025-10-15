// src/components/Gallery.tsx
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
  return (
    <section className="gallery-container">
      {/* Fade overlays for smooth appearance/disappearance */}
      <div className="gallery-fade gallery-fade-left" />
      <div className="gallery-fade gallery-fade-right" />

      {/* Auto-scrolling marquee track */}
      <div className="gallery-track">
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
