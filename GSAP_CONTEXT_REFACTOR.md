# GSAP Context Refactoring - CinematicStory Component

## Overview

Refactored `CinematicStory.tsx` to use modern GSAP best practices with `gsap.context()` and `useLayoutEffect` hook, replacing the previous `useEffect` with `setTimeout` pattern.

## Key Changes

### 1. **Switched from `useEffect` to `useLayoutEffect`**

- **Why**: `useLayoutEffect` fires synchronously after DOM mutations but before the browser paints
- **Benefit**: Guarantees animations are set up after layout is stable but before visual rendering
- **Result**: No flash of unstyled content (FOUC) and more reliable animation initialization

### 2. **Replaced Individual Refs with Class Selectors**

**Before:**

```typescript
const chapterRef = useRef<HTMLDivElement>(null);
const titleLine1Ref = useRef<HTMLSpanElement>(null);
const titleLine2Ref = useRef<HTMLSpanElement>(null);
const paragraph1Ref = useRef<HTMLParagraphElement>(null);
// ... 9 refs total
```

**After:**

```typescript
const main = useRef<HTMLDivElement>(null);
const videoRef = useRef<HTMLVideoElement>(null);
// Only 2 refs needed!
```

**Benefits:**

- Cleaner component code (removed 7 unnecessary refs)
- More maintainable (no need to wire up refs in JSX)
- Better scalability (easier to add/remove animated elements)
- Follows GSAP best practices for React

### 3. **Implemented `gsap.context()` for Automatic Cleanup**

**Before:**

```typescript
useEffect(() => {
  const timelineRef = { current: null as gsap.core.Timeline | null };
  const timer = setTimeout(() => {
    const tl = gsap.timeline({ ... });
    timelineRef.current = tl;
  }, 100);

  return () => {
    clearTimeout(timer);
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
  };
}, []);
```

**After:**

```typescript
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP animations here
    const tl = gsap.timeline({ ... });
  }, main);

  return () => ctx.revert(); // Automatic cleanup!
}, []);
```

**Benefits:**

- Automatic cleanup of ALL GSAP animations and ScrollTriggers within the context
- No need to manually track timelines
- No need for `setTimeout` - layout is already stable
- Proper scoping prevents memory leaks
- Cleaner, more declarative code

### 4. **Selector-Based Animation Targeting**

**Before:**

```typescript
tl.to(chapterRef.current, { opacity: 1, y: 0, duration: 0.8 })
  .to(titleLine1Ref.current, { opacity: 1, y: 0, duration: 0.8 })
  .to(titleLine2Ref.current, { opacity: 1, y: 0, duration: 0.8 });
```

**After:**

```typescript
tl.to(".story-chapter-title", { opacity: 1, y: 0, duration: 0.8 })
  .to(".story-main-title", { opacity: 1, y: 0, duration: 0.8 })
  .to(".story-subtitle", { opacity: 1, y: 0, duration: 0.8 });
```

**Benefits:**

- More readable animation code
- Easier to apply stagger effects (e.g., `.story-paragraph` with `stagger: 0.2`)
- Selector scope is automatically limited to the `main` ref container
- No null checking needed

## Class Names Added to JSX

| Element            | Class Name              | Animation                     |
| ------------------ | ----------------------- | ----------------------------- |
| Left container     | `story-left-container`  | Fade in from left             |
| Right container    | `story-right-container` | Fade in from right with scale |
| Chapter title      | `story-chapter-title`   | Fade in with y-translate      |
| Main title line 1  | `story-main-title`      | Fade in with y-translate      |
| Subtitle line 2    | `story-subtitle`        | Fade in with y-translate      |
| Paragraphs (all 3) | `story-paragraph`       | Fade in with stagger          |
| CTA button wrapper | `story-cta-button`      | Fade in with y-translate      |

## Animation Timeline Structure

```typescript
gsap.context(() => {
  // 1. Set initial states
  gsap.set(".story-left-container", { opacity: 0, x: -50 });
  gsap.set(".story-right-container", { opacity: 0, x: 50, scale: 0.95 });
  // ... other initial states

  // 2. Create timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: main.current,
      start: "top center",
      end: "bottom bottom",
      scrub: 1.2,
    },
    defaults: { ease: "power3.out" },
  });

  // 3. Build animation sequence
  tl.to(".story-left-container", { opacity: 1, x: 0, duration: 1 }).to(
    ".story-chapter-title",
    { opacity: 1, y: 0, duration: 0.8 },
    "-=0.5"
  );
  // ... rest of timeline
}, main); // Scope to main container
```

## Video Playback Enhancement

**Added ScrollTrigger for video playback:**

```typescript
ScrollTrigger.create({
  trigger: videoRef.current,
  start: "top bottom",
  onEnter: () => videoRef.current?.play().catch(console.error),
});
```

This ensures the video only plays when it enters the viewport, improving performance and user experience.

## Performance Improvements

1. **No setTimeout delay**: `useLayoutEffect` ensures layout is ready
2. **Automatic cleanup**: `ctx.revert()` prevents memory leaks
3. **Proper scoping**: Animations limited to component scope via `main` ref
4. **Video lazy loading**: Video only plays when visible

## Migration Checklist

If applying this pattern to other components:

- [ ] Change `useEffect` to `useLayoutEffect`
- [ ] Replace individual element refs with a single container ref
- [ ] Add semantic class names to animated elements (e.g., `.component-element-name`)
- [ ] Wrap GSAP code in `gsap.context(() => { ... }, containerRef)`
- [ ] Use selectors instead of refs in GSAP animations
- [ ] Replace manual cleanup with `return () => ctx.revert()`
- [ ] Remove `setTimeout` wrappers (no longer needed)
- [ ] Test scroll-driven animations work correctly

## Browser Compatibility

- `useLayoutEffect` is supported in all modern browsers
- `gsap.context()` requires GSAP 3.11.0+ (we're on 3.13.0 ✓)
- ScrollTrigger functionality unchanged

## Testing Checklist

- [x] Component mounts without errors
- [x] Scroll animations trigger correctly
- [x] Video plays when entering viewport
- [x] All elements animate in correct sequence
- [x] No FOUC (flash of unstyled content)
- [x] Component unmounts cleanly without warnings
- [x] Animations clean up properly on unmount

## References

- [GSAP React Guide](https://greensock.com/react/)
- [gsap.context() Documentation](<https://greensock.com/docs/v3/GSAP/gsap.context()>)
- [React useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)

---

**Result**: Cleaner, more maintainable, and more performant animation code following GSAP + React best practices. 🎉
