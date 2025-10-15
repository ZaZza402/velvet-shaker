# 🎬 Gallery Filmstrip - Quick Reference

## 🎯 What It Does

**Hijacks vertical scroll → Creates horizontal image carousel with parallax depth**

---

## 📝 Core Code

### Main Component:

```tsx
const Gallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  // Map vertical scroll progress to horizontal movement
  // Increased to -250% to accommodate all 7 images
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-250%"]);

  return (
    <section ref={targetRef} className="gallery-container">
      <div className="gallery-sticky-viewport">
        <motion.div style={{ x }} className="gallery-filmstrip">
          {images.map((img, i) => (
            <ParallaxImage key={i} src={img} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
```

### Parallax Images:

```tsx
const ParallaxImage = ({ src }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="gallery-image-container">
      <motion.img src={src} style={{ y }} />
    </div>
  );
};
```

---

## 🎨 Key CSS

```css
.gallery-container {
  height: 300vh; /* Scroll track length */
  position: relative;
}

.gallery-sticky-viewport {
  position: sticky; /* Locks viewport */
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.gallery-filmstrip {
  display: flex;
  gap: 40px;
  height: 70%;
}

.gallery-image-container {
  width: 60vh; /* Responsive size */
  flex-shrink: 0;
}

.gallery-image {
  height: 120%; /* Extra for parallax */
  top: -10%;
  object-fit: cover;
}
```

---

## 🎬 How It Works

1. **Container (300vh)** = Scroll track
2. **Sticky viewport** = Stays on screen
3. **Framer Motion** = Maps scroll to horizontal movement
4. **Parallax** = Each image moves at different rate

---

## 🔧 Quick Adjustments

### Scroll Duration:

```css
height: 200vh; /* Faster */
height: 400vh; /* Slower */
```

### Horizontal Speed:

```tsx
// Current (7 images):
const x = useTransform(scrollYProgress, [0, 1], ["1%", "-250%"]);

// Slower movement (less travel):
const x = useTransform(scrollYProgress, [0, 1], ["1%", "-200%"]);

// Faster movement (more travel):
const x = useTransform(scrollYProgress, [0, 1], ["1%", "-300%"]);
```

### Parallax Strength:

```tsx
// Subtle:
const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

// Strong:
const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
```

---

## 📦 Files

- `src/components/Gallery.tsx`
- `src/components/Gallery.css`
- `src/assets/images/*.jpg` (7 images)

---

## 🚀 Result

Cinematic horizontal scroll gallery with:

- ✅ Smooth 60fps animation
- ✅ Individual image parallax
- ✅ Edge fade indicators
- ✅ Hardware accelerated
- ✅ Responsive sizing

---

## 📊 Current Setup

- **Images:** 7 (bartender, mixing-drinks, cocktail, showcase-bar, diverse-drinks, hanging-glasses, spritz)
- **Scroll Length:** 300vh (3× screen height)
- **Movement Range:** 1% → -250%
- **Parallax Range:** -10% → +10%
- **Image Size:** 60vh × 70vh

---

**Full Documentation:** See `GALLERY_FILMSTRIP_DOCUMENTATION.md`
