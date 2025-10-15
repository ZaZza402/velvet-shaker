# 🎞️ Gallery Filmstrip - Visual Reference

## 🔧 THE CRITICAL FIX

```tsx
// ❌ BROKEN (before)
const x = useTransform(scrollYProgress, [0, 1], ["1%", "-100%"]);

// ✅ FIXED (after)
const x = useTransform(scrollYProgress, [0, 1], ["1%", "-250%"]);
```

**Result:** Gallery now scrolls through ALL 7 images smoothly!

---

## 🎬 Authentic Filmstrip Effect

### Visual Structure:

```
╔═══════════════════════════════════════════════════════════════╗
║ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ║
║ ──────────────────────────────────────────────────────────── ║
║                                                               ║
║    ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐          ║
║    │ Image  │  │ Image  │  │ Image  │  │ Image  │          ║
║    │   1    │  │   2    │  │   3    │  │   4    │  → → →  ║
║    │ [Grain]│  │ [Grain]│  │ [Grain]│  │ [Grain]│          ║
║    │ Sepia  │  │ Sepia  │  │ Sepia  │  │ Sepia  │          ║
║    └────────┘  └────────┘  └────────┘  └────────┘          ║
║                                                               ║
║ ──────────────────────────────────────────────────────────── ║
║ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ║
╚═══════════════════════════════════════════════════════════════╝
     ↑                                                       ↑
  Sprocket holes                                     Sprocket holes
```

---

## 🎨 Layer Stack (Per Image)

```
┌─────────────────────────────────┐
│  🎞️ Film Grain Overlay         │
│  • opacity: 30%                 │
│  • sepia(0.2)                   │
│  • contrast(1.1)                │
│  • mix-blend: overlay           │
├─────────────────────────────────┤
│  📸 Photo Image                 │
│  • Parallax (y: -10% → 10%)     │
├─────────────────────────────────┤
│  🖼️ Frame Container             │
│  • border-radius: 4px           │
│  • border: white 20%            │
│  • shadow: 0 10px 30px          │
└─────────────────────────────────┘
```

---

## 📐 Dimensions

```
Gallery Container:     300vh height (scroll track)
Sticky Viewport:       100vh height (stays fixed)
Sprocket Borders:      15vh top + 15vh bottom
Filmstrip Area:        70vh center (image space)
Image Size:            60vh width × 70vh height
Gap Between Images:    40px
Total Horizontal:      ~420vh + 320px
Scroll Range:          1% → -250%
```

---

## 🎬 Film Grain Settings

```tsx
<div
  className="film-grain"
  style={{
    opacity: 0.3, // 30% visible
    mixBlendMode: "overlay", // Natural blend
    filter: "sepia(0.2) contrast(1.1)", // Vintage tone + punch
  }}
/>
```

---

## 🎞️ Sprocket Holes

```css
repeating-radial-gradient(
  circle at 50% 50%,
  rgba(255,255,255,0.6) 0 2px,  ← Hole (white 60%)
  transparent 2px 8px            ← Gap (transparent)
)
background-size: 20px 100%;      ← Repeat every 20px
```

**Visual Pattern:**

```
○ ··· ○ ··· ○ ··· ○ ··· ○ ··· ○ ··· ○ ··· ○
    2px  8px  2px  8px  2px  8px  2px  8px
```

---

## 🎨 Frame Style

### Before (Modern):

```
┌─────────────┐
│             │  ← Rounded (12px)
│   Image     │  ← Soft edges
│             │  ← Digital feel
└─────────────┘
```

### After (Vintage):

```
┌────────────┐
│            │  ← Sharp (4px)
│   Image    │  ← Defined edges
│            │  ← Film frame feel
└────────────┘
```

---

## 🚀 Quick Test

1. Open http://localhost:5174
2. Scroll to Gallery section (after story)
3. Scroll down slowly
4. Watch for:
   - ✅ Sprocket holes top/bottom
   - ✅ Film grain texture on images
   - ✅ Sepia warm tone
   - ✅ All 7 images visible
   - ✅ Smooth horizontal scroll
   - ✅ Parallax movement per image

---

## 🎯 The Complete Effect

```
User scrolls down (300vh) ──→ Gallery slides left (1% → -250%)
           ↓
    Each image enters viewport
           ↓
    Parallax moves image vertically (-10% → +10%)
           ↓
    Film grain + sepia creates vintage feel
           ↓
    Sprocket holes frame the entire filmstrip
           ↓
    Sharp corners define each film frame
           ↓
    All 7 images pass through smoothly
           ↓
    Authentic cinematic experience! 🎬
```

---

## 📊 Image List (In Order)

1. **Bartender.jpg** - Action shot opening
2. **Mixing-drinks.jpg** - Preparation focus
3. **Cocktail-img.jpg** - Finished product
4. **Inside-showcase-bar.jpg** - Atmosphere
5. **Bar-diverse-drinks.jpg** - Product range
6. **Hanging-glasses.jpg** - Detail shot
7. **Spritz.jpg** - Signature drink closing

---

## 🎬 Perfect Scroll Timeline

| Scroll % | Gallery Position | Visible Images  | Effect              |
| -------- | ---------------- | --------------- | ------------------- |
| **0%**   | x: 1%            | Image 1 (left)  | Gallery entrance    |
| **15%**  | x: -37%          | Images 1-2      | Parallax activating |
| **30%**  | x: -75%          | Images 2-3      | Mid-scroll depth    |
| **50%**  | x: -125%         | Images 3-4-5    | Center experience   |
| **70%**  | x: -175%         | Images 5-6      | Approaching end     |
| **85%**  | x: -213%         | Images 6-7      | Final images        |
| **100%** | x: -250%         | Image 7 (right) | Complete! ✅        |

---

**Status:** ✅ FIXED + ENHANCED  
**Scroll:** -100% → -250% (now complete)  
**Aesthetic:** Authentic vintage filmstrip  
**Features:** Sprocket holes, film grain, sepia tone, sharp frames
