# 🧪 Visual Testing Guide - Expanding Iris Navigation

## Quick Test URL

**http://localhost:5174**

---

## 🎯 Critical Tests (Must Pass)

### Test 1: Hero Orb Interaction

**Location:** Page load (centered)

✅ **Expected:**

- Circular orb (80x80px) centered on screen
- "VS" logo visible in pink/purple gradient
- Pulsing ring animation around orb
- Click orb → Expands horizontally to ~600px pill
- 5 links appear with stagger animation
- "VS" fades to "X" icon

🔴 **Fails If:**

- Can't click orb in hero
- No expansion animation
- Links don't appear
- Menu requires scrolling first

---

### Test 2: Position Transition

**Location:** Scroll down ~90% of viewport

✅ **Expected:**

- Orb smoothly moves from center to top-left (2rem, 2rem)
- Pulsing ring stops
- Orb remains clickable during transition
- If menu was open, it stays open and moves with orb

🔴 **Fails If:**

- Orb jumps suddenly
- Menu closes when scrolling
- Orb disappears during transition
- Position jerky or stutters

---

### Test 3: Corner Menu Operation

**Location:** Top-left corner (after scrolling)

✅ **Expected:**

- Click closed orb → Expands to pill
- Menu opens with same animation as hero
- All 5 links visible and interactive
- Hover links → Color + glow effect
- Click link → Smooth scroll to section + menu closes
- Click X icon → Menu closes (contracts back to circle)

🔴 **Fails If:**

- Menu doesn't open in corner
- Links are cut off or hidden
- Hover effects don't work
- Smooth scroll fails

---

### Test 4: Z-Index Stacking

**Location:** Anywhere on page

✅ **Expected:**

- OrbitalMenu always visible above ALL content
- ScrollToTopButton visible above content BUT below OrbitalMenu
- Both buttons never hidden by sections
- Can interact with both simultaneously if visible

🔴 **Fails If:**

- Menu hidden by hero video
- Menu hidden by any section
- ScrollToTop button covers menu
- Can't click either button

---

### Test 5: ScrollToTopButton Timing

**Location:** Scroll through sections

✅ **Expected:**

- **Hero (0-100vh):** Button hidden
- **CinematicStory (100vh-150vh):** Button still hidden
- **After 150vh:** Button fades in (bottom-right)
- **Scroll back up:** Button disappears before reaching hero

🔴 **Fails If:**

- Button appears too early (in hero)
- Button never appears
- Button doesn't disappear when scrolling up
- Button positioned incorrectly

---

## 📱 Responsive Tests

### Desktop (>1024px)

- [ ] Orb: 80x80px
- [ ] Expanded: ~600px width
- [ ] Links: Horizontal row
- [ ] Font size: 1rem
- [ ] Gap between links: 1.5rem

### Tablet (768px-1024px)

- [ ] Orb: 60-70px
- [ ] Expanded: ~500px width
- [ ] Links: Horizontal (slightly compressed)
- [ ] Font size: 0.9rem
- [ ] Gap between links: 1rem

### Mobile (640px-768px)

- [ ] Orb: 60x60px
- [ ] Expanded: Fits screen width
- [ ] Links: Horizontal (tight spacing)
- [ ] Font size: 0.875rem
- [ ] All text readable

### Small Mobile (<640px)

- [ ] Orb: 50-60px
- [ ] Expanded: Near full width
- [ ] Links: **Vertical stack**
- [ ] Font size: 0.8rem
- [ ] No horizontal overflow

---

## 🎨 Visual Quality Checks

### OrbitalMenu Aesthetics

**Closed State:**

- [ ] Perfect circle (not oval)
- [ ] Pink/purple gradient background
- [ ] Glowing border (rgba(255, 20, 147, 0.5))
- [ ] Backdrop blur visible
- [ ] Multiple box-shadows (pink glow)
- [ ] Pulsing ring (when centered only)

**Open State:**

- [ ] Smooth pill shape (not square)
- [ ] Border radius: 50px (consistent curves)
- [ ] Links fully visible (not cut off)
- [ ] Even spacing between links
- [ ] Each link has colored hover glow

**Transition:**

- [ ] Width expands smoothly (no jumps)
- [ ] Border radius morphs smoothly (circle → pill)
- [ ] Spring physics feel natural (slight bounce)
- [ ] Icon cross-fade is clean (no overlap)
- [ ] Duration: ~0.4-0.6s (feels responsive)

---

### ScrollToTopButton Aesthetics

**Appearance:**

- [ ] Perfect circle (60x60px)
- [ ] Golden gradient background (#e0b973)
- [ ] Glowing border and shadows
- [ ] Backdrop blur effect
- [ ] Pulsing glow animation

**Animations:**

- [ ] Primary chevron bounces up/down
- [ ] Secondary chevron fades in/out
- [ ] Two rings rotate opposite directions
- [ ] Hover: Scale up 110% + slight rotation
- [ ] Tooltip "Ascensione" appears on hover

**Interaction:**

- [ ] Click scrolls to top smoothly
- [ ] Button scales down on click (feedback)
- [ ] All animations continue while visible
- [ ] No lag or stuttering

---

## 🐛 Common Issues & Fixes

### Issue: "Menu won't open in hero"

**Cause:** Old logic `{isOpen && isScrolled && ...}`  
**Fix:** Verify code has `{isOpen && ...}` (no isScrolled check)  
**File:** `OrbitalMenu.tsx` line ~128

---

### Issue: "Menu hidden behind hero video"

**Cause:** Z-index too low  
**Fix:** Verify `.orbital-menu-container { z-index: 9999; }`  
**File:** `OrbitalMenu.css` line ~6

---

### Issue: "ScrollToTop appears in hero"

**Cause:** Threshold too low  
**Fix:** Verify `threshold = window.innerHeight * 1.5`  
**File:** `ScrollToTopButton.tsx` line ~13

---

### Issue: "Links cut off when expanded"

**Cause:** Width too small or overflow not hidden  
**Fix:** Verify `open: { width: "600px" }` and `overflow: hidden`  
**Files:** `OrbitalMenu.tsx` line ~47, `OrbitalMenu.css` line ~9

---

### Issue: "Orb jumps when scrolling"

**Cause:** Missing `layout` prop  
**Fix:** Verify `<motion.div layout ...>`  
**File:** `OrbitalMenu.tsx` line ~97

---

## 🎬 Step-by-Step Test Script

### Full User Journey Test

1. **Page Load**

   - [ ] Hero video plays
   - [ ] Centered orb visible with pulsing ring
   - [ ] No ScrollToTop button yet

2. **Click Orb (Hero)**

   - [ ] Orb expands horizontally
   - [ ] VS → X icon transition
   - [ ] 5 links stagger in
   - [ ] Menu readable and styled

3. **Click "Storia" Link**

   - [ ] Menu closes (contracts)
   - [ ] Smooth scroll to Storia section
   - [ ] Orb returns to closed state

4. **Scroll Down to 50% of Page**

   - [ ] Orb moves to top-left corner
   - [ ] Position transition is smooth
   - [ ] Pulsing ring disappears
   - [ ] Orb still clickable

5. **Click Orb (Corner)**

   - [ ] Expands same as hero
   - [ ] Menu opens with stagger
   - [ ] All links visible

6. **Continue Scrolling Past CinematicStory**

   - [ ] ScrollToTop button fades in
   - [ ] Button positioned bottom-right
   - [ ] Both buttons visible simultaneously
   - [ ] OrbitalMenu above ScrollToTop

7. **Hover ScrollToTop Button**

   - [ ] Button scales up
   - [ ] Tooltip "Ascensione" appears
   - [ ] Animations continue (chevron, rings)

8. **Click ScrollToTop Button**

   - [ ] Smooth scroll to top
   - [ ] Button fades out (below threshold)
   - [ ] Orb moves back to center
   - [ ] Pulsing ring resumes

9. **Mobile Resize (< 640px)**
   - [ ] Orb scales down
   - [ ] Expanded menu shows vertical links
   - [ ] ScrollToTop button scales down
   - [ ] Everything remains functional

---

## ✅ Success Criteria

**All tests pass if:**

1. ✅ Menu opens anywhere (hero or corner)
2. ✅ Expanding animation is smooth and iris-like
3. ✅ Both buttons always visible (z-index 9999/9998)
4. ✅ ScrollToTop appears after first section
5. ✅ All links work with smooth scroll
6. ✅ Responsive design works on all screen sizes
7. ✅ Animations are performant (60fps)
8. ✅ No console errors
9. ✅ Hover/focus states work correctly
10. ✅ Accessibility (keyboard navigation)

---

## 🔍 Browser Testing

### Recommended Browsers

- [ ] Chrome/Edge (Chromium) - Primary
- [ ] Firefox - Good compatibility
- [ ] Safari - Test backdrop-filter, spring animations
- [ ] Mobile Safari - Touch interactions
- [ ] Mobile Chrome - Performance

### Known Issues

- **Safari < 16:** Backdrop-filter may need `-webkit-` prefix
- **Firefox:** Spring animations may feel slightly different
- **IE11:** Not supported (requires modern ES6+)

---

## 🎭 Animation Performance Check

### Use Chrome DevTools:

1. Open DevTools (F12)
2. Performance tab
3. Record while interacting with menu
4. Check for:
   - [ ] 60fps during expansion
   - [ ] No layout thrashing
   - [ ] GPU acceleration active
   - [ ] No memory leaks

### Expected Performance:

- **Menu expansion:** < 600ms
- **Link stagger:** ~400ms total
- **Position change:** ~300ms
- **Frame rate:** 60fps
- **Memory:** Stable (no leaks)

---

## 📸 Screenshot Checklist

**Capture these states:**

1. Hero - Closed orb with pulsing ring
2. Hero - Expanded menu with links
3. Corner - Closed orb (no ring)
4. Corner - Expanded menu
5. Mobile - Vertical menu stack
6. Both buttons visible simultaneously
7. Hover states (orb + scrolltop)

---

**Testing Duration:** ~10-15 minutes  
**Priority:** Critical (blocks production deployment)  
**Last Updated:** October 15, 2025
