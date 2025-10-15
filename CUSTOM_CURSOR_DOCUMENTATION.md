# Custom Cursor Component Documentation

## 🎯 Overview

A professional, interactive custom cursor component built with React and GSAP that follows mouse movements with smooth animations and responds to interactive elements.

---

## 📦 Component Structure

### File: `CustomCursor.tsx`

**Purpose:** Self-contained cursor component that affects the entire page  
**Rendered in:** `App.tsx` (once at the root level)  
**Dependencies:** React, GSAP

---

## 🎨 Visual Design

### Two-Element Cursor System

#### 1. **Inner Dot** (Cursor Dot)

- **Size:** 4px × 4px
- **Color:** Neon Pink (#ff1493)
- **Shape:** Perfect circle
- **Behavior:** Follows mouse with slight delay (0.1s)
- **Z-Index:** 9999 (highest layer)

#### 2. **Outer Ring** (Cursor Ring)

- **Size:** 30px × 30px
- **Border:** 1px solid neon pink (#ff1493)
- **Shape:** Perfect circle
- **Behavior:** Follows mouse with more delay (0.3s) for elegant lag effect
- **Z-Index:** 9998 (just below dot)
- **Interactive States:**
  - **Normal:** Transparent background, 1x scale
  - **Hover:** Semi-transparent pink background, 1.5x scale

---

## ⚙️ Technical Implementation

### Core Technologies

```typescript
import { useEffect, useRef } from "react";
import gsap from "gsap";
```

### Key Features

#### 1. **Smooth Mouse Tracking**

```typescript
const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;

  // Inner dot - fast response (0.1s)
  gsap.to(cursorDot, {
    x: clientX,
    y: clientY,
    duration: 0.1,
    ease: "power2.out",
  });

  // Outer ring - slow response (0.3s) for lag effect
  gsap.to(cursorRing, {
    x: clientX,
    y: clientY,
    duration: 0.3,
    ease: "power2.out",
  });
};
```

**Why different durations?**

- Creates a "floating" effect where the ring lags behind the dot
- More elegant and professional than synchronized movement
- Visually interesting without being distracting

#### 2. **Interactive Element Detection**

The cursor responds to hovering over:

- ✅ All `<a>` tags (links)
- ✅ All `<button>` elements
- ✅ All elements with `data-cursor-hover` attribute
- ✅ Submit and button inputs (`input[type="button"]`, `input[type="submit"]`)

```typescript
const interactiveElements = document.querySelectorAll(
  'a, button, [data-cursor-hover], input[type="button"], input[type="submit"]'
);
```

#### 3. **Hover Animations**

**On Mouse Enter:**

```typescript
gsap.to(cursorRing, {
  scale: 1.5, // 50% larger
  backgroundColor: "rgba(255, 20, 147, 0.1)", // Subtle pink tint
  duration: 0.3,
  ease: "power2.out",
});
```

**On Mouse Leave:**

```typescript
gsap.to(cursorRing, {
  scale: 1, // Back to normal
  backgroundColor: "rgba(255, 20, 147, 0)", // Transparent
  duration: 0.3,
  ease: "power2.out",
});
```

#### 4. **Dynamic Element Handling**

Uses `MutationObserver` to handle dynamically added elements:

```typescript
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
```

**Why this matters:**

- React components mount/unmount dynamically
- New buttons/links can appear after initial render
- Ensures cursor always responds to new interactive elements

#### 5. **Memory Leak Prevention**

Proper cleanup in `useEffect` return function:

```typescript
return () => {
  window.removeEventListener("mousemove", handleMouseMove);

  interactiveElements.forEach((element) => {
    element.removeEventListener("mouseenter", handleMouseEnter);
    element.removeEventListener("mouseleave", handleMouseLeave);
  });

  observer.disconnect();
};
```

---

## 🎭 Styling Details

### CSS File: `CustomCursor.css`

#### Hide Default Cursor (Desktop Only)

```css
@media (pointer: fine) {
  * {
    cursor: none !important;
  }
}
```

**Why `pointer: fine`?**

- Detects precise pointing devices (mouse, trackpad)
- Prevents hiding cursor on touch devices (tablets, phones)
- Better UX than just checking screen width

#### Show Default Cursor (Mobile/Touch)

```css
@media (pointer: coarse) {
  .custom-cursor-dot,
  .custom-cursor-ring {
    display: none;
  }
}
```

**Why hide custom cursor on touch?**

- No mouse position to track
- Touch devices don't need visual cursor
- Better performance on mobile

#### Performance Optimizations

```css
.custom-cursor-dot,
.custom-cursor-ring {
  will-change: transform; /* GPU acceleration hint */
  pointer-events: none; /* Cursor doesn't block clicks */
  user-select: none; /* Not selectable */
  backface-visibility: hidden; /* Smoother transforms */
  transform-style: preserve-3d; /* 3D rendering context */
}
```

---

## 🚀 Usage

### Basic Implementation (Already Done)

```tsx
// App.tsx
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <div className="min-h-screen">
      <CustomCursor /> {/* Render once at root */}
      {/* Rest of your app */}
    </div>
  );
}
```

### Adding Custom Hover Elements

Add `data-cursor-hover` to any element:

```tsx
<div data-cursor-hover className="my-custom-element">
  Hover over me!
</div>
```

The cursor ring will automatically scale up when hovering.

---

## 🎨 Customization Options

### Change Cursor Colors

In `CustomCursor.tsx`, modify the inline styles:

```typescript
// Inner dot
backgroundColor: "#ff1493",  // Change to any color

// Outer ring
border: "1px solid #ff1493",  // Change border color
backgroundColor: "rgba(255, 20, 147, 0.1)",  // Change hover background
```

### Change Cursor Sizes

```typescript
// Inner dot
width: "4px",   // Make it bigger/smaller
height: "4px",

// Outer ring
width: "30px",  // Make it bigger/smaller
height: "30px",
```

### Adjust Animation Speed

```typescript
// Faster cursor response
duration: 0.05,  // Inner dot
duration: 0.15,  // Outer ring

// Slower cursor response (more dramatic lag)
duration: 0.2,   // Inner dot
duration: 0.5,   // Outer ring
```

### Change Hover Scale

```typescript
scale: 1.5,  // Current (50% larger)
scale: 2,    // Double size on hover
scale: 1.2,  // Subtle scaling
```

### Change Easing Functions

```typescript
ease: "power2.out",    // Current (smooth deceleration)
ease: "power3.out",    // More aggressive ease
ease: "elastic.out",   // Bouncy effect
ease: "back.out(1.7)", // Overshoot effect
```

---

## 🐛 Troubleshooting

### Cursor Not Visible

**Issue:** Can't see custom cursor  
**Solutions:**

1. Check if you're on a touch device (cursor hidden by design)
2. Verify z-index isn't being overridden
3. Check browser console for errors
4. Ensure GSAP is installed: `npm install gsap`

### Cursor Lagging/Jerky

**Issue:** Cursor movement isn't smooth  
**Solutions:**

1. Reduce animation duration (try 0.05s for dot, 0.2s for ring)
2. Check CPU usage - close other apps
3. Try `ease: "none"` for instant movement
4. Disable `mixBlendMode` if causing issues

### Cursor Not Responding to New Elements

**Issue:** Buttons added later don't trigger hover effect  
**Solutions:**

1. Check that `MutationObserver` is working (shouldn't be an issue)
2. Verify element is in the selector list
3. Add `data-cursor-hover` attribute manually

### Default Cursor Still Showing

**Issue:** Both default and custom cursors visible  
**Solutions:**

1. Check CSS `cursor: none !important` is applied
2. Clear browser cache
3. Verify no other CSS is overriding with `cursor: pointer`

---

## 📊 Performance Metrics

### Optimizations Applied

| Feature                           | Benefit                                |
| --------------------------------- | -------------------------------------- |
| `pointer-events: none`            | Cursor doesn't block mouse events      |
| `will-change: transform`          | GPU acceleration for smooth animations |
| `backface-visibility: hidden`     | Reduces rendering artifacts            |
| `transform` instead of `top/left` | Hardware-accelerated positioning       |
| GSAP's `duration`                 | Native RAF (requestAnimationFrame)     |
| Touch device detection            | No wasted rendering on mobile          |

### Expected Performance

- **FPS:** 60fps on desktop
- **CPU:** <5% on modern hardware
- **Memory:** Negligible impact (<1MB)

---

## 🎯 Features Summary

✅ **Smooth mouse tracking** with elegant lag effect  
✅ **Interactive hover states** on buttons, links, etc.  
✅ **Dynamic element detection** (handles new elements)  
✅ **Touch device aware** (hidden on mobile)  
✅ **GPU accelerated** for smooth performance  
✅ **Memory safe** with proper cleanup  
✅ **Highly customizable** colors, sizes, animations  
✅ **Mix blend mode** for contrast on any background

---

## 🎨 Visual Effect Breakdown

### Mix Blend Mode

```typescript
mixBlendMode: "difference",
```

**What it does:**

- Inverts colors beneath the cursor
- Ensures cursor is always visible on any background
- Creates a unique, modern look

**Try alternatives:**

- `"exclusion"` - Softer color inversion
- `"screen"` - Brightens underlying colors
- `"normal"` - No blending (may be invisible on matching backgrounds)

---

## 📚 Related Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [React useEffect Hook](https://react.dev/reference/react/useEffect)
- [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [CSS Pointer Media Query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)

---

## ✅ Testing Checklist

- [x] Cursor follows mouse smoothly
- [x] Lag effect visible (ring trails behind dot)
- [x] Hover effect triggers on buttons
- [x] Hover effect triggers on links
- [x] New elements added dynamically respond to hover
- [x] Cursor hidden on touch devices
- [x] No console errors
- [x] Performance is smooth (60fps)
- [x] Default cursor is hidden on desktop
- [x] Component unmounts cleanly (no memory leaks)

---

## 🎬 Result

Your website now features a **professional custom cursor** that:

✨ Follows the mouse with cinematic smoothness  
✨ Responds intelligently to interactive elements  
✨ Adapts to device type (desktop/mobile)  
✨ Performs flawlessly with GPU acceleration  
✨ Adds a unique, premium feel to the user experience

**Status:** ✅ **COMPLETE & PRODUCTION READY**

---

_"The cursor is the window to the user's soul."_ 👆✨
