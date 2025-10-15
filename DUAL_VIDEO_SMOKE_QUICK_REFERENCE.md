# 🎬 Dual Video Smoke Effect - Quick Reference

## 🎯 Quick Summary

**Two videos layered with z-index. Smoke video uses `mix-blend-screen` to make black background transparent.**

---

## 📝 Code Snippet

```tsx
{
  /* LAYER 1: Hero Video - LOOPS */
}
<div className="absolute inset-0 z-10">
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src={heroVideo} type="video/mp4" />
  </video>
</div>;

{
  /* LAYER 2: Smoke Video - PLAYS ONCE */
}
<div className="absolute inset-0 z-20">
  <video
    className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
    autoPlay
    muted
    playsInline
  >
    <source src={smokeVideo} type="video/mp4" />
  </video>
</div>;
```

---

## 🎨 The Magic Ingredient

```css
mix-blend-screen
```

**What it does:**

- Black pixels → Transparent
- Gray/Smoke → Brightens video below
- White pixels → Maximum brightness

---

## ✅ Checklist

### Hero Video (z-10):

- ✅ `autoPlay`
- ✅ `muted`
- ✅ `loop` ← **Must loop**
- ✅ `playsInline`

### Smoke Video (z-20):

- ✅ `autoPlay`
- ✅ `muted`
- ✅ `playsInline`
- ✅ `mix-blend-screen` ← **Critical**
- ❌ **NO `loop`** ← Plays once

---

## 🏗️ Layer Stack

```
z-50: UI (nav, scroll)
z-40: Fade
z-30: Grain + Vignette
z-20: Smoke Video (mix-blend-screen) ⭐
z-10: Hero Video (loops)
```

---

## 🔑 Key Points

1. **Two separate `<video>` elements**
2. **Hero loops, smoke plays once**
3. **`mix-blend-screen` makes black transparent**
4. **No manual masking needed**
5. **Hardware accelerated (GPU)**

---

## 📦 Files

- `src/assets/bar-hero.mp4` (4s, loops)
- `src/assets/smoke-diffusion.mp4` (23s, once)
- `src/components/CinematicHero.tsx`

---

## 🚀 Result

Realistic volumetric smoke effect with authentic video footage, automatically transparent black background, and cinematic atmosphere.

---

**Full Documentation:** See `DUAL_VIDEO_SMOKE_EFFECT.md`
