# 🎬 Dual Video Smoke Effect - Implementation Guide

## 📋 Overview

This document describes the two-video layering system used in the `CinematicHero` component to create a realistic smoke effect by overlaying a smoke video on top of the hero video.

---

## 🎥 Video Setup

### Video 1: Hero Background (bar-hero.mp4)

- **Duration:** ~4 seconds
- **Behavior:** Loops continuously
- **Layer:** z-10 (bottom layer)
- **Attributes:** `autoPlay`, `muted`, `loop`, `playsInline`

### Video 2: Smoke Overlay (smoke-diffusion.mp4)

- **Duration:** ~23 seconds
- **Behavior:** Plays once (no loop)
- **Layer:** z-20 (top layer)
- **Attributes:** `autoPlay`, `muted`, `playsInline` (NO LOOP)
- **Key Feature:** `mix-blend-screen` class for transparency

---

## 🎨 How mix-blend-screen Works

The `mix-blend-screen` CSS blend mode is the **magic ingredient** that makes the black background transparent:

### Blend Mode Behavior:

```
Black pixels (RGB: 0,0,0)    → Fully transparent (ignored)
Gray/Smoke pixels            → Brightens the video underneath
White pixels                 → Maximum brightening effect
```

### Visual Result:

- ✅ Black background of smoke video becomes invisible
- ✅ Smoke particles brighten and blend with hero video
- ✅ Creates authentic, volumetric smoke atmosphere
- ✅ No manual masking or green screen needed

---

## 🏗️ Layer Architecture

```
┌─────────────────────────────────────────────┐
│  LAYER 5: UI Elements (z-50)               │
│  - Navigation                               │
│  - Scroll indicator                         │
├─────────────────────────────────────────────┤
│  LAYER 4: Transition Fade (z-40)           │
│  - Bottom gradient fade                     │
├─────────────────────────────────────────────┤
│  LAYER 3: Color Grading (z-30)             │
│  - Film grain (mix-blend-multiply)          │
│  - Color overlays (mix-blend-overlay)       │
│  - Vignette                                 │
│  - Neon accents                             │
├─────────────────────────────────────────────┤
│  LAYER 2: Smoke Video (z-20) ⭐            │
│  - smoke-diffusion.mp4                      │
│  - mix-blend-screen (black = transparent)   │
│  - Plays ONCE (23s)                         │
├─────────────────────────────────────────────┤
│  LAYER 1: Hero Video (z-10)                │
│  - bar-hero.mp4                             │
│  - Loops continuously (4s)                  │
└─────────────────────────────────────────────┘
```

---

## 💻 Code Implementation

### Component Structure (CinematicHero.tsx)

```tsx
import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/bar-hero.mp4";
import smokeVideo from "../assets/smoke-diffusion.mp4";

const CinematicHero = () => {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const smokeVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play both videos
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(console.error);
    }
    if (smokeVideoRef.current) {
      smokeVideoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className="cinematic-hero relative min-h-screen ...">

      {/* LAYER 1: HERO VIDEO (z-10) */}
      <div className="absolute inset-0 z-10">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop          {/* ← Loops continuously */}
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* LAYER 2: SMOKE VIDEO (z-20) */}
      <div className="absolute inset-0 z-20">
        <video
          ref={smokeVideoRef}
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
          autoPlay
          muted
          playsInline   {/* ← NO LOOP - plays once */}
        >
          <source src={smokeVideo} type="video/mp4" />
        </video>
      </div>

      {/* LAYER 3+: Other overlays... */}
    </div>
  );
};
```

---

## ✅ Key Requirements Checklist

### Hero Video (bar-hero.mp4):

- [x] `autoPlay` attribute
- [x] `muted` attribute
- [x] `loop` attribute ← **Must loop**
- [x] `playsInline` attribute
- [x] `object-cover` class
- [x] z-index: 10

### Smoke Video (smoke-diffusion.mp4):

- [x] `autoPlay` attribute
- [x] `muted` attribute
- [x] `playsInline` attribute
- [x] **NO `loop` attribute** ← **Plays once**
- [x] `mix-blend-screen` class ← **Critical for transparency**
- [x] `object-cover` class
- [x] z-index: 20

---

## 🎯 Why This Works

### 1. **Two Separate Video Elements**

- Hero video loops = continuous background
- Smoke video plays once = dramatic one-time effect

### 2. **Z-Index Layering**

- Smoke sits above hero (z-20 > z-10)
- Proper stacking ensures blend mode works correctly

### 3. **mix-blend-screen Magic**

- Automatically removes black background
- No need for:
  - Manual masking
  - Alpha channels
  - Green screen
  - Video editing software

### 4. **Performance**

- Two videos load simultaneously
- Hardware-accelerated CSS blending
- No JavaScript calculations needed

---

## 🚀 Benefits

✅ **Realistic smoke effect** with real video footage  
✅ **No manual masking** required  
✅ **Automatic transparency** via CSS blend mode  
✅ **One-time dramatic entrance** (smoke plays once)  
✅ **Continuous background** (hero loops)  
✅ **Hardware accelerated** rendering  
✅ **Easy to update** (just swap video files)

---

## 🔄 Replaced Components

This dual-video approach **replaces**:

- ❌ `RisingSmoke.tsx` (Framer Motion animated divs)
- ❌ `RisingSmoke.css` (CSS smoke clouds)
- ❌ `AtmosphericHaze.tsx` (Static haze effect)
- ❌ `AtmosphericHaze.css` (Radial gradient smoke)

**Reason:** Real video smoke looks more authentic and cinematic than CSS/SVG effects.

---

## 📊 Performance Notes

- **Video 1:** ~4 seconds, loops infinitely
- **Video 2:** ~23 seconds, plays once
- **Blend mode:** Hardware accelerated (GPU)
- **File size:** Monitor video file sizes for optimal loading
- **Format:** MP4 with H.264 codec (universal browser support)

---

## 🎬 Final Result

When the page loads:

1. Hero video starts looping (4s loop)
2. Smoke video plays over it (23s one-time)
3. Black background becomes transparent via `mix-blend-screen`
4. Smoke particles brighten the neon sign
5. After 23s, smoke video ends (hero continues looping)
6. All other overlays (grain, vignette, etc.) enhance the final look

**Effect:** A stunning, cinematic entrance with real volumetric smoke that naturally dissipates, leaving a clean looping hero video.

---

**Created:** October 14, 2025  
**Status:** ✅ Production ready  
**Component:** `CinematicHero.tsx`  
**Videos:** `bar-hero.mp4`, `smoke-diffusion.mp4`
