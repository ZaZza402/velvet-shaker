# Custom Cursor Quick Reference

## 🎯 Visual States

### Normal State (Moving)

```
        ○ ← Outer Ring (30px, transparent)
        •   Inner Dot (4px, solid pink)
```

- Inner dot follows mouse closely (0.1s delay)
- Outer ring lags behind (0.3s delay)
- Creates elegant "floating" effect

---

### Hover State (Over Button/Link)

```
      ⬤⬤⬤ ← Outer Ring (45px, semi-transparent pink)
       •    Inner Dot (4px, unchanged)
```

- Outer ring scales to 1.5x (30px → 45px)
- Outer ring gains subtle pink background
- Inner dot remains same size
- Smooth 0.3s animation

---

## 🎮 Interactive Elements

The cursor automatically responds to:

| Element Type   | Selector               | Example                              |
| -------------- | ---------------------- | ------------------------------------ |
| Links          | `<a>`                  | `<a href="#">Click me</a>`           |
| Buttons        | `<button>`             | `<button>Click me</button>`          |
| Custom         | `[data-cursor-hover]`  | `<div data-cursor-hover>Hover</div>` |
| Submit buttons | `input[type="submit"]` | `<input type="submit" />`            |
| Button inputs  | `input[type="button"]` | `<input type="button" />`            |

---

## 🎨 Color Scheme

| Element                  | Color                 | Value                     |
| ------------------------ | --------------------- | ------------------------- |
| Inner Dot                | Neon Pink (Solid)     | `#ff1493`                 |
| Outer Ring Border        | Neon Pink             | `#ff1493`                 |
| Outer Ring Fill (Normal) | Transparent           | `rgba(255, 20, 147, 0)`   |
| Outer Ring Fill (Hover)  | Semi-transparent Pink | `rgba(255, 20, 147, 0.1)` |

---

## ⚡ Animation Timings

| Animation           | Duration | Ease         | Purpose       |
| ------------------- | -------- | ------------ | ------------- |
| Inner Dot Movement  | 0.1s     | `power2.out` | Fast response |
| Outer Ring Movement | 0.3s     | `power2.out` | Lag effect    |
| Hover Scale Up      | 0.3s     | `power2.out` | Smooth growth |
| Hover Scale Down    | 0.3s     | `power2.out` | Smooth shrink |

---

## 📱 Device Detection

### Desktop (pointer: fine)

- ✅ Custom cursor visible
- ✅ Default cursor hidden
- ✅ Hover effects active

### Mobile/Tablet (pointer: coarse)

- ❌ Custom cursor hidden
- ✅ Default cursor/touch events
- ❌ No hover effects (not needed)

---

## 🎭 CSS Classes

```css
.custom-cursor-dot    /* Inner dot element */
/* Inner dot element */
.custom-cursor-ring; /* Outer ring element */
```

Both elements have:

- `position: fixed`
- `pointer-events: none` (don't block clicks)
- `z-index: 9999/9998` (always on top)
- `transform: translate(-50%, -50%)` (centered on mouse)

---

## 🔧 Quick Customization

### Make cursor bigger:

```typescript
// Inner dot
width: "8px",
height: "8px",

// Outer ring
width: "50px",
height: "50px",
```

### Change color:

```typescript
backgroundColor: "#00ff00",  // Green
border: "1px solid #00ff00",
```

### Remove lag effect:

```typescript
duration: 0.1,  // Same for both dot and ring
```

### More dramatic hover:

```typescript
scale: 2,  // Double size instead of 1.5x
```

---

## 🎬 Animation Flow

```
User moves mouse
        ↓
Event: mousemove fires
        ↓
GSAP animates dot to new position (fast)
        ↓
GSAP animates ring to new position (slow)
        ↓
Visual: Ring lags behind dot
        ↓
Result: Elegant floating effect
```

```
User hovers over button
        ↓
Event: mouseenter fires
        ↓
GSAP scales ring to 1.5x
        ↓
GSAP adds pink background
        ↓
Visual: Ring grows around button
        ↓
User moves away
        ↓
Event: mouseleave fires
        ↓
GSAP scales ring back to 1x
        ↓
GSAP removes background
        ↓
Result: Smooth hover feedback
```

---

## ✅ Current Status

**Component:** `CustomCursor.tsx`  
**Location:** `src/components/`  
**Imported in:** `App.tsx` (root level)  
**CSS File:** `CustomCursor.css`  
**Status:** ✅ Active and functional

---

## 🎯 Test It Now!

1. **Open the website** - http://localhost:5174
2. **Move your mouse** - See the cursor follow with lag effect
3. **Hover over buttons** - Watch the ring scale up
4. **Hover over links** - Same scaling effect
5. **Open on mobile** - Cursor hidden (as intended)

---

**The custom cursor is live and ready to impress!** ✨
