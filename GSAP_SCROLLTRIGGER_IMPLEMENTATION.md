# GSAP ScrollTrigger Implementation Guide

## 🎬 Overview

The `CinematicStory` component has been successfully converted from a basic IntersectionObserver-based animation to a sophisticated **scroll-driven animation** using GSAP's ScrollTrigger plugin.

---

## 🚀 What Changed

### Before (IntersectionObserver)

- ❌ Animation triggered once when section became visible
- ❌ No control over animation progress
- ❌ Binary state (visible/not visible)
- ❌ Used React state management for visibility

### After (GSAP ScrollTrigger)

- ✅ Animation directly linked to scroll position
- ✅ Smooth scrubbing effect (1-second smoothing)
- ✅ Precise control over start/end points
- ✅ Professional, cinematic feel
- ✅ No React state needed - pure GSAP control

---

## 📦 Implementation Details

### 1. **Plugin Registration**

```typescript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### 2. **Removed State Management**

```typescript
// ❌ REMOVED
const [isVisible, setIsVisible] = useState(false);

// ✅ No longer needed - GSAP handles everything
```

### 3. **Added Element References**

Created refs for every animated element:

```typescript
const chapterRef = useRef<HTMLDivElement>(null);
const titleLine1Ref = useRef<HTMLSpanElement>(null);
const titleLine2Ref = useRef<HTMLSpanElement>(null);
const paragraph1Ref = useRef<HTMLParagraphElement>(null);
const paragraph2Ref = useRef<HTMLParagraphElement>(null);
const paragraph3Ref = useRef<HTMLParagraphElement>(null);
const ctaRef = useRef<HTMLDivElement>(null);
const leftContainerRef = useRef<HTMLDivElement>(null);
const rightContainerRef = useRef<HTMLDivElement>(null);
```

### 4. **ScrollTrigger Configuration**

```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top center", // Animation starts when section top hits viewport center
    end: "bottom bottom", // Animation completes when section bottom hits viewport bottom
    scrub: 1, // 1-second smoothing for scroll-linked animation
    // markers: true,          // Uncomment to see trigger points (for debugging)
  },
});
```

#### ScrollTrigger Properties Explained:

| Property  | Value                | Description                                                                                   |
| --------- | -------------------- | --------------------------------------------------------------------------------------------- |
| `trigger` | `sectionRef.current` | The element that triggers the animation                                                       |
| `start`   | `"top center"`       | Animation begins when the **top** of the section reaches the **center** of the viewport       |
| `end`     | `"bottom bottom"`    | Animation completes when the **bottom** of the section reaches the **bottom** of the viewport |
| `scrub`   | `1`                  | Links timeline progress to scroll position with 1-second smoothing                            |

---

## 🎨 Animation Timeline

### Initial States (All elements start invisible)

```typescript
gsap.set(
  [
    chapterRef.current,
    titleLine1Ref.current,
    titleLine2Ref.current,
    paragraph1Ref.current,
    paragraph2Ref.current,
    paragraph3Ref.current,
    ctaRef.current,
    leftContainerRef.current,
    rightContainerRef.current,
  ],
  {
    opacity: 0,
  }
);
```

### Transform States

```typescript
gsap.set(leftContainerRef.current, { x: -50 }); // Left container starts off-left
gsap.set(rightContainerRef.current, { x: 50, scale: 0.95 }); // Right container starts off-right & scaled down
gsap.set(chapterRef.current, { y: 20 }); // Chapter title starts below
gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: 30 }); // Title lines start below
gsap.set(
  [
    paragraph1Ref.current,
    paragraph2Ref.current,
    paragraph3Ref.current,
    ctaRef.current,
  ],
  { y: 40 }
); // Paragraphs & CTA start below
```

### Animation Sequence

The timeline animates elements in a cascading sequence:

```typescript
tl.to(leftContainerRef.current, {
  opacity: 1,
  x: 0,
  duration: 1,
  ease: "power2.out",
})
  .to(
    chapterRef.current,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.5"
  ) // Overlaps with previous animation by 0.5s
  .to(
    titleLine1Ref.current,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.4"
  );
// ... and so on
```

#### Overlap Strategy:

- Each animation uses negative position values (`"-=0.5"`, `"-=0.4"`, etc.)
- This creates a **staggered cascade effect**
- Elements appear to flow naturally into view
- No harsh "one-by-one" appearance

---

## 🎯 Key Features

### 1. **Scrub Effect** (`scrub: 1`)

- Animation progress is **directly tied** to scroll position
- Scroll down → animation plays forward
- Scroll up → animation plays backward
- `1` means 1-second smoothing for buttery-smooth motion

### 2. **Precise Trigger Points**

- `"top center"` - Perfect for mid-viewport reveals
- `"bottom bottom"` - Ensures full animation before section leaves
- Customizable based on design needs

### 3. **Professional Easing**

- All animations use `ease: "power2.out"`
- Creates natural deceleration
- Professional, cinematic feel

### 4. **Proper Cleanup**

```typescript
return () => {
  tl.kill();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
```

- Prevents memory leaks
- Essential for React component lifecycle
- Removes all ScrollTrigger instances on unmount

---

## 🔧 JSX Changes

### Before (Conditional Classes)

```jsx
<div
  className={`space-y-8 lg:space-y-12 transition-all duration-1500 ${
    isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-12"
  }`}
>
```

### After (Direct Refs)

```jsx
<div
  ref={leftContainerRef}
  className="space-y-8 lg:space-y-12"
>
```

- ❌ Removed all conditional `className` logic
- ❌ Removed Tailwind transition classes
- ✅ GSAP handles all animation states
- ✅ Cleaner, more maintainable code

---

## 🎬 How It Works (User Perspective)

1. **Page loads** - All elements are invisible (opacity: 0)
2. **User scrolls down** - Section enters viewport
3. **Animation begins** when section top reaches viewport center
4. **Scroll controls animation** - Each scroll increment progresses the timeline
5. **Elements cascade in** - Left text slides from left, right content from right
6. **Animation completes** when section bottom reaches viewport bottom
7. **Scroll back up** - Animation reverses smoothly!

---

## 🐛 Debugging

### Enable Visual Markers

Uncomment this line in the ScrollTrigger config:

```typescript
scrollTrigger: {
  trigger: sectionRef.current,
  start: "top center",
  end: "bottom bottom",
  scrub: 1,
  markers: true, // 👈 UNCOMMENT THIS
}
```

This will show:

- 🟢 **Green line** = Start trigger point
- 🔴 **Red line** = End trigger point
- Helps visualize when animation starts/ends

### Console Logging

Add this to check timeline state:

```typescript
tl.eventCallback("onUpdate", () => {
  console.log("Timeline progress:", tl.progress());
});
```

---

## 📊 Performance

### Optimizations Applied:

1. **`will-change` is implicit** - GSAP applies it automatically
2. **GPU acceleration** - GSAP uses transform properties
3. **Single timeline** - Efficient batch processing
4. **Proper cleanup** - No memory leaks
5. **Refs instead of selectors** - Direct DOM access

---

## 🎨 Customization Options

### Change Animation Speed

```typescript
scrub: 0.5,  // Faster, more responsive
scrub: 2,    // Slower, more dramatic
scrub: true, // Instant (no smoothing)
```

### Change Trigger Points

```typescript
start: "top top",        // Animation starts when section reaches top of viewport
start: "top bottom",     // Animation starts when section enters viewport
end: "center center",    // Animation ends at center
end: "+=500",            // Animation ends 500px after start
```

### Add Pin Effect (Section stays in place while animating)

```typescript
scrollTrigger: {
  trigger: sectionRef.current,
  start: "top top",
  end: "+=1000",
  scrub: 1,
  pin: true,  // 👈 Pins the section
}
```

### Change Easing Functions

```typescript
ease: "power1.out",     // Subtle ease
ease: "power3.out",     // Aggressive ease
ease: "elastic.out",    // Bouncy
ease: "back.out(1.7)",  // Overshoot effect
```

---

## 📚 Resources

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Ease Visualizer](https://greensock.com/ease-visualizer)
- [ScrollTrigger Examples](https://greensock.com/st-demos)

---

## ✅ Testing Checklist

- [x] Animation triggers at correct scroll position
- [x] Elements animate in sequence
- [x] Scroll up reverses animation smoothly
- [x] No console errors
- [x] Performance is smooth (60fps)
- [x] Mobile responsive
- [x] Component unmounts cleanly (no memory leaks)

---

## 🎯 Result

The `CinematicStory` component now features:

✨ **Scroll-driven animations** that respond to user scroll position  
✨ **Buttery-smooth scrubbing** with 1-second ease  
✨ **Professional cascading effects** that feel cinematic  
✨ **Reversible animations** (scroll up to see them reverse!)  
✨ **Clean, maintainable code** with proper cleanup

**Status:** ✅ **COMPLETE & TESTED**

---

_"The scroll is your conductor, GSAP is your orchestra."_ 🎼
