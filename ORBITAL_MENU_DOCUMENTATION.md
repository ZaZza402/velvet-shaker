# 🌀 Orbital Menu & Ascension Button - Advanced Navigation Components

## 🎯 Overview

Two highly-animated, persistent navigation components that provide modern, immersive UX patterns using Framer Motion's advanced features:

1. **OrbitalMenu** - A morphing navigation orb that transitions from hero center to top-left corner
2. **ScrollToTopButton** - An animated "Ascension" button that appears after scrolling

---

## 🌀 Part 1: OrbitalMenu Component

### Concept

A circular button (the "Orb") that starts **centered in the hero section** and smoothly relocates to the **top-left corner** when the user scrolls past 90% of the viewport. Clicking opens a sleek navigation menu with staggered animations.

---

### Key Features

#### 1. **Automatic Layout Morphing**

```tsx
<motion.div layout className={`orb ${isScrolled ? "scrolled" : "centered"}`}>
```

**The Magic:** Framer Motion's `layout` prop enables **automatic FLIP animations**

- **Center Position:** `top: 50%, left: 50%, translate(-50%, -50%)`
- **Corner Position:** `top: 2rem, left: 2rem, translate: none`
- **Transition:** Smooth morph between positions without manual animation code

#### 2. **Scroll Detection Logic**

```tsx
useEffect(() => {
  const handleScroll = () => {
    const scrollThreshold = window.innerHeight * 0.9; // 90% of viewport
    setIsScrolled(window.scrollY > scrollThreshold);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Behavior:**

- Listens to scroll events
- Triggers state change at 90% viewport height
- Layout prop automatically animates position change

#### 3. **Visual States**

| State                 | Position    | Visual                | Interaction          |
| --------------------- | ----------- | --------------------- | -------------------- |
| **Centered**          | Hero center | VS logo, pulsing ring | Click to scroll hint |
| **Scrolled (Closed)** | Top-left    | VS logo, static       | Click to open menu   |
| **Scrolled (Open)**   | Top-left    | X icon, menu visible  | Click to close menu  |

---

### Animation Details

#### Orb Animations

**Pulsing Ring (Centered Only)**

```tsx
<motion.div
  animate={{
    scale: [1, 1.5, 1],
    opacity: [0.5, 0, 0.5],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```

**Hover Effect**

```tsx
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.95 }}
```

**Icon Rotation**

```tsx
<motion.div
  animate={{ rotate: isOpen ? 180 : 0 }}
  transition={{ duration: 0.3 }}
>
  {isOpen ? <XIcon /> : <VSLogo />}
</motion.div>
```

---

#### Menu Animations

**Container Stagger**

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms between items
      delayChildren: 0.2, // Wait 200ms before starting
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1, // Reverse order on exit
    },
  },
};
```

**Item Spring Animation**

```tsx
const itemVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300, // Bouncy spring
      damping: 24, // Smooth settling
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    scale: 0.8,
  },
};
```

---

### Menu Structure

#### Navigation Items

```tsx
const menuItems = [
  { label: "Storia", href: "#story", color: "#ff1493" }, // Pink
  { label: "Gallery", href: "#gallery", color: "#00ff00" }, // Green
  { label: "Menu", href: "#menu", color: "#00ffff" }, // Cyan
  { label: "Dove Trovarci", href: "#location", color: "#8a2be2" }, // Purple
  { label: "Prenota", href: "#reserve", color: "#e0b973" }, // Gold
];
```

#### Menu Item Design

```tsx
<motion.li variants={itemVariants} style={{ "--item-color": color }}>
  <a href={href}>
    <span className="number">01</span>
    <span className="label">Storia</span>
  </a>
</motion.li>
```

**CSS Hover Effects:**

- Colored left border scales in (0 → 100% height)
- Colored gradient background fades in (0 → 10% opacity)
- Label text shifts right and glows
- Number scales up and brightens

---

### CSS Architecture

#### Positioning System

```css
.orbital-menu-orb.centered {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.orbital-menu-orb.scrolled {
  top: 2rem;
  left: 2rem;
  transform: none;
}
```

#### Neon Glow Effects

```css
.orb-inner {
  background: linear-gradient(
    135deg,
    rgba(255, 20, 147, 0.2),
    rgba(138, 43, 226, 0.2)
  );
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 20, 147, 0.5);
  box-shadow: 0 0 20px rgba(255, 20, 147, 0.4), /* Primary glow */ 0 0 40px rgba(138, 43, 226, 0.2),
    /* Secondary glow */ inset 0 0 20px rgba(255, 20, 147, 0.1); /* Inner glow */
}
```

#### Menu Pill Shape

```css
.orbital-menu-container {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 20, 147, 0.3);
  border-radius: 2rem; /* Pill shape */
  padding: 1.5rem 2rem;
}
```

---

### Responsive Behavior

| Breakpoint  | Orb Size | Menu Width  | Position   |
| ----------- | -------- | ----------- | ---------- |
| **Desktop** | 80x80px  | Auto        | left: 8rem |
| **Tablet**  | 60x60px  | Constrained | left: 5rem |
| **Mobile**  | 50x50px  | Max-width   | left: 4rem |

**Mobile Adjustments:**

- Smaller orb and icons
- Compact menu padding
- Constrained width to prevent overflow
- Touch-friendly sizes (50px minimum)

---

## ⬆️ Part 2: ScrollToTopButton Component

### Concept

A golden circular button that appears in the **bottom-right corner** after scrolling past one full viewport height. Features animated chevrons and orbital rings.

---

### Key Features

#### 1. **useScroll Hook Integration**

```tsx
const { scrollY } = useScroll();
const controls = useAnimation();

useEffect(() => {
  const unsubscribe = scrollY.on("change", (latest) => {
    if (latest > window.innerHeight) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  });

  return () => unsubscribe();
}, [scrollY, controls]);
```

**Behavior:**

- Tracks scroll position via Framer Motion's `useScroll`
- Triggers `visible` animation when past first screen
- Triggers `hidden` animation when scrolling back to top
- No scroll event listener needed (Framer Motion handles it)

#### 2. **Animation Variants**

```tsx
const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 20, // Below final position
    scale: 0.8, // Smaller
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier
    },
  },
};
```

#### 3. **Scroll Function**

```tsx
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
```

---

### Visual Elements

#### 1. **Pulsing Glow Background**

```tsx
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
```

#### 2. **Animated Chevron Icon**

```tsx
<motion.svg
  animate={{ y: [0, -4, 0] }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <path d="M5 15l7-7 7 7" />
</motion.svg>
```

**Visual Effect:** Continuous up-down motion suggesting upward scrolling

#### 3. **Secondary Chevron (Depth)**

```tsx
<motion.svg
  className="secondary"
  animate={{
    y: [2, -2, 2],
    opacity: [0.3, 0.6, 0.3],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    delay: 0.2,
  }}
>
```

**Visual Effect:** Faded chevron below primary, animates with slight delay for depth

#### 4. **Orbital Rings**

```tsx
{
  /* Clockwise ring */
}
<motion.div
  className="button-ring"
  animate={{ rotate: 360 }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  }}
/>;

{
  /* Counter-clockwise ring */
}
<motion.div
  className="button-ring-reverse"
  animate={{ rotate: -360 }}
  transition={{
    duration: 12,
    repeat: Infinity,
    ease: "linear",
  }}
/>;
```

**Visual Effect:** Dashed rings rotating in opposite directions

---

### Interaction States

#### Hover

```tsx
whileHover={{
  scale: 1.1,
  rotate: -5,
}}
```

**Effects:**

- Button grows 10%
- Slight counter-clockwise tilt
- Enhanced glow (CSS)
- Tooltip appears

#### Tap

```tsx
whileTap={{
  scale: 0.9,
  rotate: 5,
}}
```

**Effects:**

- Button shrinks 10%
- Slight clockwise tilt (opposite of hover)
- Creates satisfying "press" feel

---

### Tooltip ("Ascensione")

```css
.button-tooltip {
  position: absolute;
  bottom: calc(100% + 12px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.button:hover .button-tooltip {
  opacity: 1;
}
```

**Design:**

- Appears above button on hover
- Golden text with dark background
- Downward-pointing arrow (CSS triangle)
- Serif font for elegance
- Italian text: "Ascensione" (ascension)

---

### Color Scheme

#### Default (Golden)

```css
background: linear-gradient(
  135deg,
  rgba(224, 185, 115, 0.9),
  /* Primary gold */ rgba(212, 168, 83, 0.9) /* Darker gold */
);
border: 2px solid rgba(224, 185, 115, 0.5);
box-shadow: 0 8px 32px rgba(224, 185, 115, 0.4), 0 0 20px rgba(224, 185, 115, 0.3),
  inset 0 0 20px rgba(255, 255, 255, 0.1);
```

#### Neon Variant (Optional)

```css
.scroll-to-top-button.neon-variant {
  background: linear-gradient(
    135deg,
    rgba(0, 255, 255, 0.2),
    rgba(138, 43, 226, 0.2)
  );
  border-color: rgba(0, 255, 255, 0.5);
  /* Cyan-purple theme */
}
```

---

### CSS Architecture

#### Positioning

```css
.scroll-to-top-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  z-index: 9999;
}
```

#### Layering

```
Z-Index Stack:
- Button base: z-index: 9999
- Glow background: Absolute positioned inside
- Icon content: z-index: 1
- Orbital rings: Absolute positioned outside
- Tooltip: Absolute positioned above
```

#### Responsive Scaling

| Breakpoint  | Size    | Position                      |
| ----------- | ------- | ----------------------------- |
| **Desktop** | 60x60px | bottom: 2rem, right: 2rem     |
| **Tablet**  | 50x50px | bottom: 1.5rem, right: 1.5rem |
| **Mobile**  | 45x45px | bottom: 1rem, right: 1rem     |

---

## 🔗 Integration in App.tsx

### Placement Strategy

```tsx
<div className="min-h-screen">
  <CustomCursor />

  {/* Persistent Navigation */}
  <OrbitalMenu />
  <ScrollToTopButton />

  {/* Page Content */}
  <CinematicHero />
  <CinematicStory />
  {/* ... rest of sections */}
</div>
```

**Why This Order?**

1. **CustomCursor:** Lowest z-index, affects entire page
2. **OrbitalMenu:** High z-index (9999), always accessible
3. **ScrollToTopButton:** High z-index (9999), appears conditionally
4. **Content Sections:** Natural document flow

---

### Section ID Requirements

For smooth scrolling to work, ensure sections have IDs:

```tsx
<CinematicStory id="story" />
<Gallery id="gallery" />
<UndergroundMenu id="menu" />
<RendezvousPoint id="location" />
<LegendBegins id="reserve" />
```

---

### Removed from CinematicHero

**Before:**

```tsx
<nav className="absolute top-0 left-0 right-0 z-50">
  {/* Static navigation */}
</nav>
```

**After:**

```tsx
{
  /* Navigation removed - now handled by OrbitalMenu component */
}
```

**Benefits:**

- Cleaner hero component
- Persistent navigation across entire site
- More engaging UX with morphing behavior
- Better mobile experience (no cluttered header)

---

## 🎨 Animation Techniques Used

### 1. **Layout Prop (FLIP Animation)**

```tsx
<motion.div layout>
```

**What It Does:**

- Automatically animates between layout changes
- Uses FLIP technique (First, Last, Invert, Play)
- No need to calculate transforms manually
- Smooth 60fps animations

### 2. **Stagger Children**

```tsx
transition: {
  staggerChildren: 0.1,
}
```

**What It Does:**

- Delays child animations sequentially
- Creates "wave" or "cascade" effect
- Makes lists feel more dynamic
- Prevents overwhelming simultaneous animations

### 3. **Spring Physics**

```tsx
transition: {
  type: "spring",
  stiffness: 300,
  damping: 24,
}
```

**What It Does:**

- Natural bouncy motion
- Feels more organic than linear easing
- Settles smoothly without abrupt stops
- More engaging than CSS transitions

### 4. **AnimatePresence**

```tsx
<AnimatePresence>
  {isOpen && <motion.nav exit="exit">...</motion.nav>}
</AnimatePresence>
```

**What It Does:**

- Animates components when they leave DOM
- Exit animations match entrance
- Prevents jarring disappearances
- Maintains visual continuity

### 5. **useScroll Hook**

```tsx
const { scrollY } = useScroll();
```

**What It Does:**

- Reactive scroll position tracking
- More performant than scroll event listeners
- Integrates with animation controls
- Batches updates for efficiency

### 6. **Animation Controls**

```tsx
const controls = useAnimation();
controls.start("visible");
```

**What It Does:**

- Programmatic animation triggering
- Separates logic from markup
- Reusable animation states
- Smooth transitions between variants

---

## 📱 Responsive Design Philosophy

### Mobile-First Approach

**Base Styles (Mobile):**

```css
.orbital-menu-orb {
  width: 50px;
  height: 50px;
}
.scroll-to-top-button {
  width: 45px;
  height: 45px;
}
```

**Progressive Enhancement (Tablet+):**

```css
@media (min-width: 768px) {
  .orbital-menu-orb {
    width: 60px;
    height: 60px;
  }
  .scroll-to-top-button {
    width: 50px;
    height: 50px;
  }
}

@media (min-width: 1024px) {
  .orbital-menu-orb {
    width: 80px;
    height: 80px;
  }
  .scroll-to-top-button {
    width: 60px;
    height: 60px;
  }
}
```

### Touch Optimization

- **Minimum size:** 45px (iOS guideline: 44px)
- **Hover states:** Only CSS (no JS hover detection)
- **Tap feedback:** `whileTap` animations
- **No tiny text:** 14px+ font sizes

---

## ♿ Accessibility Features

### Keyboard Navigation

```tsx
<motion.button
  aria-label="Scroll to top"
  // Automatic keyboard focus
/>
```

**Support:**

- Tab to focus
- Enter/Space to activate
- Visible focus indicators (outline)

### Screen Readers

```tsx
<a href="#story" aria-label="Navigate to Storia section">
  Storia
</a>
```

**Features:**

- Descriptive aria-labels
- Semantic HTML (`<nav>`, `<button>`, `<a>`)
- Logical heading hierarchy

### Focus Indicators

```css
.orbital-menu-orb:focus-visible {
  outline: 2px solid #00ffff;
  outline-offset: 4px;
}

.scroll-to-top-button:focus-visible {
  outline: 2px solid #00ffff;
  outline-offset: 4px;
}
```

**Design:**

- High contrast (cyan on dark)
- Offset for visibility
- Only on keyboard focus (`:focus-visible`)

---

## 🚀 Performance Optimization

### GPU Acceleration

```css
transform: translate3d(0, 0, 0);
will-change: transform, opacity;
```

**Benefits:**

- Offloads animation to GPU
- Smoother 60fps performance
- Reduces main thread work
- Better battery life

### Animation Frame Scheduling

Framer Motion automatically:

- Batches layout updates
- Uses `requestAnimationFrame`
- Skips frames when needed
- Pauses off-screen animations

### Event Cleanup

```tsx
useEffect(() => {
  const handleScroll = () => {
    /* ... */
  };
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Prevents:**

- Memory leaks
- Performance degradation
- Zombie listeners

---

## 🧪 Testing Checklist

### OrbitalMenu Tests

**Positioning:**

- [ ] Starts centered in hero
- [ ] Moves to top-left after 90% scroll
- [ ] Smooth transition between positions
- [ ] Respects safe areas on mobile

**Interaction:**

- [ ] Click opens/closes menu
- [ ] Menu items link to correct sections
- [ ] Smooth scroll behavior works
- [ ] Hover effects on all items
- [ ] Keyboard navigation works

**Animation:**

- [ ] Pulsing ring in center
- [ ] Menu items stagger in
- [ ] Menu items stagger out (reverse)
- [ ] Icon rotates 180° on open
- [ ] No jank or frame drops

**Responsive:**

- [ ] Orb scales appropriately
- [ ] Menu fits on small screens
- [ ] Touch targets are adequate
- [ ] Text is readable at all sizes

---

### ScrollToTopButton Tests

**Visibility:**

- [ ] Hidden on page load
- [ ] Appears after scrolling down
- [ ] Disappears when scrolling to top
- [ ] Smooth fade in/out

**Interaction:**

- [ ] Click scrolls to top smoothly
- [ ] Hover shows tooltip
- [ ] Hover scales button
- [ ] Tap feedback on mobile

**Animation:**

- [ ] Chevron bounces continuously
- [ ] Glow pulses
- [ ] Rings rotate opposite directions
- [ ] No performance issues

**Responsive:**

- [ ] Button scales on mobile
- [ ] Doesn't overlap content
- [ ] Tooltip remains visible
- [ ] Touch-friendly size

---

## 🎓 Key Learnings

### Technical Patterns

1. **Layout Prop:** Automatic morphing between positions
2. **useScroll:** Reactive scroll tracking without listeners
3. **useAnimation:** Programmatic animation control
4. **Stagger Animations:** Sequential reveals for lists
5. **Spring Physics:** Natural, organic motion

### Design Patterns

1. **Morphing Navigation:** Context-aware positioning
2. **Progressive Disclosure:** Menu hidden until needed
3. **Micro-interactions:** Hover, tap, focus states
4. **Visual Feedback:** Tooltips, glows, animations
5. **Responsive Adaptation:** Size/position changes

### UX Patterns

1. **Persistent Controls:** Always accessible
2. **Smooth Scrolling:** Native behavior with JS fallback
3. **Clear Affordances:** Obvious what's clickable
4. **Delightful Animations:** Not just functional, enjoyable
5. **Mobile-First:** Touch-optimized from start

---

## 📚 Related Files

### Created

- `src/components/OrbitalMenu.tsx` - Main orb component
- `src/components/OrbitalMenu.css` - Orb styling
- `src/components/ScrollToTopButton.tsx` - Ascension button
- `src/components/ScrollToTopButton.css` - Button styling

### Modified

- `src/App.tsx` - Added components, removed old nav
- `src/components/CinematicHero.tsx` - Removed `<nav>` element
- `src/components/Gallery.tsx` - Added `id="gallery"`
- `src/components/RendezvousPoint.tsx` - Added `id="location"`

### Dependencies

- `framer-motion` - All animations
- `react` - useState, useEffect, useRef hooks

---

**Created:** January 2025  
**Status:** ✅ Production Ready  
**Framework:** React + TypeScript + Framer Motion  
**Special Techniques:** Layout animations, useScroll, animation controls, stagger, spring physics
