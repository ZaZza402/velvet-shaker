# Framer Motion Quick Reference - CinematicStory

## 🎬 Animation Variants

### Container (Parent - Orchestrates Stagger)

```typescript
const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between children
      delayChildren: 0.1, // Delay before first child
    },
  },
};
```

### Item (Short Slide Up)

```typescript
const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // easeOut
    },
  },
};
```

### Paragraph (Long Slide Up)

```typescript
const paragraphVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
```

---

## 🎯 Usage Patterns

### Parent Container with Stagger

```tsx
<motion.div
  variants={containerVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  {/* Children inherit parent's animation state */}
</motion.div>
```

### Child Element

```tsx
<motion.div variants={itemVariant} className="...">
  Content
</motion.div>
```

### Independent Animation (No Parent)

```tsx
<motion.div
  initial={{ opacity: 0, x: 50, scale: 0.95 }}
  whileInView={{ opacity: 1, x: 0, scale: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
>
```

---

## 📹 Video Playback on Scroll

```typescript
const videoRef = useRef<HTMLVideoElement>(null);
const isVideoInView = useInView(videoRef, {
  once: true,
  amount: 0.3,
});

useEffect(() => {
  if (isVideoInView && videoRef.current) {
    videoRef.current.play().catch(console.error);
  }
}, [isVideoInView]);
```

---

## 🔧 Common Props

| Prop          | Values                | Purpose                     |
| ------------- | --------------------- | --------------------------- |
| `initial`     | `"hidden"` or object  | Starting state              |
| `whileInView` | `"visible"` or object | State when in viewport      |
| `viewport`    | `{ once, amount }`    | Viewport trigger options    |
| `variants`    | Variants object       | Reusable animation states   |
| `transition`  | Transition object     | Override default transition |

---

## 🎨 Viewport Options

```typescript
viewport={{
  once: true,    // Only animate once
  amount: 0.3    // Trigger at 30% visibility
}}
```

**Options:**

- `amount: 0.3` = 30% visible
- `amount: 0.5` = 50% visible
- `amount: "all"` = 100% visible
- `margin: "-100px"` = Trigger 100px early

---

## 🚀 Easing Functions

**Named easings:**

```typescript
ease: "easeOut"; // Built-in
ease: "easeInOut"; // Built-in
ease: "linear"; // Built-in
```

**Custom cubic-bezier:**

```typescript
ease: [0.25, 0.1, 0.25, 1]; // easeOut equivalent
ease: [0.42, 0, 0.58, 1]; // easeInOut equivalent
```

---

## 💡 Tips

1. **Parent-Child Inheritance**: Children automatically receive parent's animation state
2. **Stagger Only on Parents**: Use `staggerChildren` on container, not children
3. **Type Safety**: Always use `import type { Variants }` for variant definitions
4. **Viewport Once**: Use `once: true` to prevent re-animation on scroll
5. **Amount Threshold**: Lower values (0.1-0.3) trigger earlier, higher (0.5-1) trigger later

---

## 🔄 GSAP → Framer Motion Mapping

| GSAP                       | Framer Motion                |
| -------------------------- | ---------------------------- |
| `gsap.set()`               | `initial` prop               |
| `gsap.to()`                | `animate` or `whileInView`   |
| `ScrollTrigger.create()`   | `whileInView` + `viewport`   |
| `stagger: 0.2`             | `staggerChildren: 0.2`       |
| `ease: "power3.out"`       | `ease: [0.25, 0.1, 0.25, 1]` |
| Timeline offsets `"-=0.5"` | Fixed `staggerChildren`      |
| `ctx.revert()`             | Automatic cleanup            |

---

## 📦 Required Import

```typescript
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
```

---

## ✅ Checklist

- [ ] Import `motion` and `useInView`
- [ ] Define `Variants` for animation states
- [ ] Convert elements to `motion.*` components
- [ ] Add `initial`, `whileInView`, `viewport` props
- [ ] Apply `variants` to children
- [ ] Use `useInView` for video playback
- [ ] Remove GSAP imports and cleanup code
- [ ] Test animations in browser

---

**Created:** 2025-10-14  
**Component:** `CinematicStory.tsx`  
**Library:** Framer Motion 11.x
