# 🌅 L'Ora Dorata (The Golden Hour) - Feature Documentation

## 🎯 Overview

A premium **special offerings subsection** has been integrated into the `UndergroundMenu.tsx` component, showcasing exclusive cocktails available during golden hour timeframes. This feature maintains thematic consistency while providing a distinct, luxurious aesthetic using **Framer Motion** animations.

---

## 📍 Integration Location

**Position in Component Tree:**

```
UndergroundMenu.tsx
├── Header ("Il Menu Underground")
├── Main Cocktail Grid (6 cocktails)
├── 🆕 L'Ora Dorata Section (NEW)
│   ├── Header (title + time info)
│   └── Golden Cocktails Grid (2 special cocktails)
└── CTA Button ("Inizia la Tua Leggenda")
```

---

## 🎨 Design Philosophy

### Visual Identity

- **Color Palette:** Predominantly golden (`text-primary`, `#E0B973`)
- **Borders:** Subtle golden borders (`border-primary/30`) that glow on hover (`hover:border-primary`)
- **Background:** Dark gradient with backdrop blur for depth
- **Accent:** Golden corner gradient on each card
- **Hover State:** Golden glow effect (`hover:shadow-glow`)

### Differentiation from Main Menu

| Aspect         | Main Menu                  | L'Ora Dorata            |
| -------------- | -------------------------- | ----------------------- |
| **Colors**     | Multi-color neon gradients | Unified golden theme    |
| **Layout**     | 3-column grid (desktop)    | 2-column grid (desktop) |
| **Card Style** | `CocktailCard` component   | Custom golden cards     |
| **Border**     | Gradient borders           | Solid golden borders    |
| **Content**    | Ingredients + story        | Description + pairing   |

---

## 💻 Implementation Details

### 1. **Data Structure**

```typescript
const goldenHourCocktails = [
  {
    name: "Aurelia",
    price: "€12",
    description: "Gin infuso allo zafferano, miele, limone, polvere d'oro.",
    pairing: "Accompagnato da stuzzichini gourmet.",
  },
  {
    name: "Vespro",
    price: "€12",
    description:
      "Un Negroni rivisitato con liquore all'arancia sanguigna e bitter al cioccolato.",
    pairing: "Accompagnato da stuzzichini gourmet.",
  },
];
```

**Key Properties:**

- `name`: Cocktail name (displayed in large serif font)
- `price`: Price in euros (aligned right)
- `description`: Ingredient and preparation details
- `pairing`: Accompanying food information

---

### 2. **Framer Motion Animations**

#### Section Entry Animation

```typescript
const goldenHourVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom easing curve
    },
  },
};
```

**Behavior:**

- Fades in from below (40px offset)
- Smooth 0.8s duration
- Custom cubic-bezier easing for elegant motion

#### Card Stagger Animation

```typescript
const goldenCardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.2, // 200ms stagger between cards
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
```

**Behavior:**

- Cards appear sequentially (200ms delay between each)
- Slight scale-up effect (0.95 → 1.0)
- Shorter duration (0.6s) for snappy feel

#### Viewport Detection

```typescript
const goldenHourRef = useRef<HTMLDivElement>(null);
const isGoldenHourInView = useInView(goldenHourRef, {
  once: true, // Animate only once
  amount: 0.3, // Trigger when 30% visible
});
```

---

### 3. **Section Structure**

#### Header Component

```tsx
<div className="text-center mb-12">
  <h3 className="text-5xl lg:text-6xl font-serif text-primary mb-4">
    L'Ora Dorata
  </h3>
  <p className="text-lg text-gray-300 mb-2">
    Dove il crepuscolo incontra l'alchimia.
  </p>
  <p className="text-base text-primary/80 font-light tracking-wide">
    Ogni Mercoledì e Giovedì, dalle 18:00 alle 20:00.
  </p>
</div>
```

**Typography:**

- Main title: `text-5xl` (desktop: `text-6xl`), serif font, golden color
- Subtitle: `text-lg`, light gray
- Time info: `text-base`, golden with 80% opacity, wide tracking

---

#### Card Component Structure

```tsx
<motion.div
  className="group relative p-8 bg-gradient-to-br from-black/80 to-black/60 
             backdrop-blur-sm border border-primary/30 rounded-lg 
             transition-all duration-500 hover:border-primary hover:shadow-glow"
>
  {/* Golden accent corner */}
  <div
    className="absolute top-0 right-0 w-16 h-16 
                  bg-gradient-to-bl from-primary/20 to-transparent 
                  rounded-tr-lg"
  />

  {/* Content */}
  <div className="relative z-10">
    {/* Name and Price */}
    <div className="flex justify-between items-start mb-4">
      <h4
        className="text-3xl font-serif text-primary 
                     group-hover:text-primary-light 
                     transition-colors duration-300"
      >
        {cocktail.name}
      </h4>
      <span className="text-2xl font-light text-primary/90">
        {cocktail.price}
      </span>
    </div>

    {/* Description */}
    <p className="text-gray-300 leading-relaxed mb-4 text-base">
      {cocktail.description}
    </p>

    {/* Pairing */}
    <div className="pt-4 border-t border-primary/20">
      <p className="text-sm text-primary/70 italic">{cocktail.pairing}</p>
    </div>
  </div>

  {/* Hover glow effect */}
  <div
    className="absolute inset-0 bg-gradient-to-br 
                  from-primary/5 to-transparent 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500 rounded-lg 
                  pointer-events-none"
  />
</motion.div>
```

---

## 🎭 Visual Effects Breakdown

### 1. **Border Effects**

```css
/* Base state */
border: border-primary/30 (30% opacity golden border)

/* Hover state */
hover:border-primary (100% opacity golden border)
```

### 2. **Shadow Glow** (from tailwind.config.js)

```javascript
boxShadow: {
  glow: "0 0 20px rgba(224, 185, 115, 0.3)",
}
```

Applied on hover: `hover:shadow-glow`

### 3. **Corner Accent**

- Top-right corner gradient
- Golden to transparent (`from-primary/20 to-transparent`)
- 16x16 size (w-16 h-16)
- Diagonal gradient direction (`bg-gradient-to-bl`)

### 4. **Hover Glow Overlay**

```css
opacity: 0 → group-hover:opacity-100
transition: 500ms
background: radial gradient from golden to transparent
```

### 5. **Text Color Transitions**

```css
/* Name hover */
text-primary → group-hover:text-primary-light
transition-colors duration-300ms
```

---

## 📱 Responsive Behavior

### Desktop (≥ 768px)

```css
grid: md:grid-cols-2  /* Two columns */
max-width: 5xl        /* Constrained width */
margin: auto          /* Centered */
```

### Mobile (< 768px)

```css
grid:
  grid-cols-1 /* Single column */
  full-width; /* Uses container width */
```

### Typography Scaling

```css
/* Main title */
mobile: text-5xl
desktop: lg:text-6xl

/* Name */
text-3xl (consistent across breakpoints)

/* Price */
text-2xl (consistent across breakpoints)
```

---

## 🔧 Customization Guide

### Adding More Cocktails

```typescript
const goldenHourCocktails = [
  // Existing cocktails...
  {
    name: "Your New Cocktail",
    price: "€14",
    description: "Your description here...",
    pairing: "Your pairing info...",
  },
];
```

**Note:** Grid will automatically adjust, but consider layout implications:

- 2 cocktails: Perfect 2-column grid
- 3 cocktails: Will create 2 + 1 layout
- 4 cocktails: Perfect 2x2 grid
- Consider changing to `md:grid-cols-3` for 3+ items

---

### Adjusting Animation Timing

```typescript
// Section entry speed
duration: 0.8; // Increase for slower, decrease for faster

// Card stagger delay
delay: i * 0.2; // Increase for longer gaps between cards

// Viewport trigger
amount: 0.3; // Decrease to trigger earlier (0.2), increase for later (0.5)
```

---

### Changing Colors

#### Golden Theme → Different Color

```tsx
// Replace all instances of:
text-primary        → text-[your-color]
border-primary      → border-[your-color]
from-primary/20     → from-[your-color]/20
hover:shadow-glow   → hover:shadow-[your-custom-glow]
```

#### Custom Shadow in tailwind.config.js

```javascript
boxShadow: {
  'custom-glow': '0 0 20px rgba(R, G, B, 0.3)',
}
```

---

### Modifying Layout

#### Three-Column Grid

```tsx
<div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
```

#### Full-Width Cards

```tsx
<div className="grid md:grid-cols-2 gap-8">
  {/* Remove max-w-5xl constraint */}
```

---

## 🎬 Animation Performance

### Optimization Techniques Used

1. **GPU Acceleration:**

   - `transform` (translate, scale) instead of position changes
   - `opacity` transitions
   - Both properties use hardware acceleration

2. **Reduced Repaints:**

   - `will-change` implicit in Framer Motion transforms
   - Absolute positioned overlays don't affect layout

3. **Efficient Triggers:**

   - `once: true` prevents re-animation on scroll up
   - `amount: 0.3` balances early trigger vs performance

4. **Stagger Optimization:**
   - 200ms delay small enough to feel cohesive
   - Large enough to prevent simultaneous animations

---

## 🧪 Testing Checklist

### Visual Tests

- [ ] Section appears after main menu, before CTA
- [ ] Golden color scheme is consistent
- [ ] Border glows on hover
- [ ] Corner accent is visible on both cards
- [ ] Text is readable on dark background
- [ ] Time information is clearly displayed

### Animation Tests

- [ ] Section fades in when 30% visible
- [ ] Cards animate with 200ms stagger
- [ ] Animations play only once
- [ ] Hover effects are smooth (no jank)
- [ ] Name color transitions on hover

### Responsive Tests

- [ ] Two-column grid on desktop
- [ ] Single-column grid on mobile
- [ ] Cards stack properly on mobile
- [ ] Typography scales appropriately
- [ ] Touch hover states work on mobile

### Accessibility Tests

- [ ] Color contrast meets WCAG AA standards
- [ ] Text is readable at all sizes
- [ ] Hover effects have keyboard equivalents
- [ ] Screen readers can parse content logically

---

## 📊 Performance Metrics

### Expected Performance

```
Component render: < 16ms (60fps)
Animation frame rate: 60fps solid
Time to Interactive: +0.5s (minimal impact)
Bundle size increase: +2KB (motion variants)
```

### Monitoring

```bash
# Check bundle size
npm run build

# Analyze bundle
npm run build -- --report

# Lighthouse audit (check animation performance)
lighthouse http://localhost:5174 --view
```

---

## 🚀 Future Enhancements

### Potential Features

1. **Dynamic Time Display:** Show countdown to next golden hour
2. **Availability Badge:** "Available Now" indicator during golden hour
3. **Image Gallery:** Add cocktail photos to cards
4. **Interactive Pairing:** Click to see pairing details/images
5. **Seasonal Rotation:** Different cocktails per season
6. **Booking Integration:** "Reserve for Golden Hour" button

### Code Structure for Time Display

```typescript
const [isGoldenHour, setIsGoldenHour] = useState(false);

useEffect(() => {
  const checkTime = () => {
    const now = new Date();
    const day = now.getDay(); // 3 = Wed, 4 = Thu
    const hour = now.getHours();

    setIsGoldenHour((day === 3 || day === 4) && hour >= 18 && hour < 20);
  };

  checkTime();
  const interval = setInterval(checkTime, 60000); // Check every minute

  return () => clearInterval(interval);
}, []);
```

---

## 📚 Related Files

### Modified

- `src/components/UndergroundMenu.tsx` - Main component with integration

### Dependencies

- `framer-motion` - Animation library
- `tailwind.config.js` - Custom colors and shadows

### Related Styles

- `tailwind.config.js` - Golden color palette and glow shadows
- Theme colors: `primary`, `primary-light`, `primary-dark`

---

## 🎓 Key Learnings

### Design Patterns

1. **Subsection Integration:** Maintain visual hierarchy with dividers
2. **Thematic Consistency:** Use shared colors but distinct styles
3. **Animation Choreography:** Stagger effects for elegant reveals
4. **Hover States:** Multiple layers of interactivity (border, glow, color shift)

### Technical Patterns

1. **Framer Motion Variants:** Reusable animation definitions
2. **Custom Indices:** Use for stagger delays
3. **Viewport Detection:** Trigger animations at optimal scroll position
4. **Group Hover:** Parent state affects child styling

---

**Created:** January 2025  
**Status:** ✅ Production Ready  
**Framework:** React + TypeScript + Framer Motion  
**Design System:** Tailwind CSS + Custom Golden Theme
