import { useRef, useEffect } from "react";
import gsap from "gsap";

// Define the shape of the cocktail prop for TypeScript
interface CocktailProps {
  cocktail: {
    name: string;
    price: string;
    ingredients: string;
    story: string;
    color: string;
  };
}

const CocktailCard = ({ cocktail }: CocktailProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // This effect sets up the card for 3D transforms
  useEffect(() => {
    if (cardRef.current) {
      // Set initial state to ensure clean slate for GSAP
      gsap.set(cardRef.current, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      });

      // Set perspective on parent
      if (cardRef.current.parentElement) {
        gsap.set(cardRef.current.parentElement, { perspective: 1000 });
      }
    }
  }, []);

  const handleMouseEnter = () => {
    // Immediate scale up for instant feedback
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const rotateX = gsap.utils.mapRange(0, height, -15, 15, y);
    const rotateY = gsap.utils.mapRange(0, width, 15, -15, x);

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.15, // Reduced from 0.5 to 0.15 for instant response
      overwrite: "auto", // Prevent animation queuing
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 md:p-8 cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Neon glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cocktail.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
      ></div>

      {/* Card content */}
      <div className="relative z-10">
        {/* Price and Name */}
        <div className="flex justify-between items-start mb-3 sm:mb-4 md:mb-6">
          <h3
            className={`text-base sm:text-xl md:text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r ${cocktail.color} group-hover:scale-105 transition-transform duration-300`}
          >
            {cocktail.name}
          </h3>
          <span className="text-base sm:text-xl md:text-2xl font-bold text-white">
            {cocktail.price}
          </span>
        </div>

        {/* Ingredients */}
        <p className="text-gray-300 mb-3 sm:mb-4 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base font-georgia">
          {cocktail.ingredients}
        </p>

        {/* Story */}
        <div className="border-t border-gray-700/50 pt-3 sm:pt-4 md:pt-6">
          <p className="text-gray-400 text-xs sm:text-sm italic font-georgia">
            {cocktail.story}
          </p>
        </div>

        {/* Interactive element */}
        <div className="mt-3 sm:mt-4 md:mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className={`w-full h-1 bg-gradient-to-r ${cocktail.color} rounded-full`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
