# GSAP Handwriting Animation - Implementation Guide

## Overview

Successfully replaced the old CSS-based SVG handwriting animation with a clean, GSAP-based implementation in `CinematicHero.tsx`.

## Changes Made

### 1. **Imports Updated**

```typescript
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "./CinematicHero.css";
```

Added:

- `useLayoutEffect` hook for DOM manipulation before paint
- `gsap` library for animation

### 2. **Refs Simplified**

**Old:**

```typescript
const ilVelvetPathRef = useRef<SVGPathElement>(null);
const shakerPathRef = useRef<SVGPathElement>(null);
```

**New:**

```typescript
const svgContainerRef = useRef<SVGSVGElement>(null);
```

Single ref now targets the entire SVG container, allowing GSAP to select all paths dynamically.

### 3. **Animation Logic Replaced**

**Old Approach:**

- Used CSS transitions with `strokeDasharray` and `strokeDashoffset`
- Required individual refs for each path
- Used `setTimeout` for sequencing
- Manually calculated path lengths

**New Approach:**

```typescript
useLayoutEffect(() => {
  if (!svgContainerRef.current) return;

  // Select all path elements within the SVG
  const paths = gsap.utils.toArray<SVGPathElement>(
    svgContainerRef.current.querySelectorAll("path")
  );

  // Set up initial state for each path
  paths.forEach((path) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fill: "none",
      stroke: "url(#ilVelvetGradient)", // Customizable gradient
      strokeWidth: "0.5px", // Customizable stroke width
      strokeLinecap: "round",
      strokeLinejoin: "round",
      opacity: 1,
    });
  });

  // Create timeline for sequential drawing animation
  const tl = gsap.timeline();

  tl.to(paths, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power1.inOut",
    stagger: 0.1,
  });

  return () => {
    tl.kill();
  };
}, []);
```

### 4. **SVG Structure Updated**

- Replaced 2 large path elements with 17 individual path elements
- Removed all inline `stroke`, `strokeWidth`, `fill` attributes from paths (GSAP handles these)
- Added `ref={svgContainerRef}` to the main `<svg>` element
- Kept gradient definitions (`ilVelvetGradient`, `shakerGradient`) and filters intact

## Customization Points

### Stroke Gradient

Change the gradient applied to all paths:

```typescript
stroke: 'url(#ilVelvetGradient)', // or 'url(#shakerGradient)'
```

### Stroke Width

Adjust the line thickness:

```typescript
strokeWidth: '0.5px', // Try '1px', '2px', etc.
```

### Animation Duration

Change how long each path segment takes to draw:

```typescript
duration: 1.5, // seconds per path
```

### Stagger Delay

Adjust the delay between each path starting:

```typescript
stagger: 0.1, // seconds between each path
```

### Easing Function

Change the animation curve:

```typescript
ease: 'power1.inOut', // Try 'power2.out', 'elastic.out', 'back.out', etc.
```

## Benefits of GSAP Approach

1. **Cleaner Code**: No manual `requestAnimationFrame` or `setTimeout` needed
2. **More Flexible**: Easy to add delays, callbacks, or reverse animations
3. **Better Performance**: GSAP is optimized for complex animations
4. **Dynamic Selection**: Automatically handles any number of paths
5. **Proper Cleanup**: Timeline is killed on unmount to prevent memory leaks
6. **Timeline Control**: Can easily pause, resume, or reverse the animation

## Total Path Count

The new SVG contains **17 individual path elements**, all animated sequentially with a 0.1s stagger.

## Animation Sequence

1. All paths start invisible (strokeDashoffset = path length)
2. GSAP animates strokeDashoffset to 0 for all paths
3. Paths draw sequentially with 0.1s delay between each
4. Total animation duration: ~1.5s + (17 × 0.1s) = ~3.2s

## Notes

- The animation uses `useLayoutEffect` to ensure DOM measurement happens before browser paint
- All paths share the same stroke properties (customizable via GSAP settings)
- The gradient IDs must match those defined in the `<defs>` section
- Cleanup function ensures smooth component unmounting
