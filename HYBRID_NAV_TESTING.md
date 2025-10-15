# 🧪 Quick Testing Guide - Hybrid Navigation

## 🎯 Test URL

**http://localhost:5174**

---

## ✅ Desktop Testing (Screen ≥768px)

### Visual Check

1. Open site in full desktop view
2. Look at hero section top
3. **Expected:**
   - ✅ Header visible with "Il Velvet Shaker" branding (pink glow)
   - ✅ 5 navigation links visible (Storia, Gallery, Menu, Dove Trovarci, Prenota)
   - ✅ NO orbital menu in top-right corner
   - ✅ Links turn green on hover

### Interaction Check

1. Click "Storia" link
   - ✅ Smooth scroll to Storia section
2. Click "Gallery" link
   - ✅ Smooth scroll to Gallery section
3. Repeat for all links
   - ✅ All smooth scrolling works

---

## 📱 Mobile Testing (Screen <768px)

### Visual Check

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone or Android device
4. **Expected:**
   - ✅ Desktop header hidden (NOT visible)
   - ✅ Circular orb visible in top-right (60x60px)
   - ✅ "VS" logo visible with pink glow
   - ✅ Orb has pink border and dark background

### Expansion Check

1. Click the orbital menu orb
2. **Expected:**
   - ✅ Orb expands horizontally to rounded rectangle
   - ✅ VS logo fades/rotates to X icon
   - ✅ 5 menu links appear (vertical stack)
   - ✅ Links stagger in sequentially
   - ✅ All links fully visible (no text cutoff)
   - ✅ Animation is smooth (spring physics)

### Link Check

1. Hover over "Storia" link (in expanded menu)
   - ✅ Text turns white with pink glow
   - ✅ Background highlights slightly
2. Click "Storia" link
   - ✅ Menu closes (contracts back to circle)
   - ✅ Page smooth scrolls to Storia section
3. Click orb again to reopen
4. Click "Gallery" link
   - ✅ Same behavior (close + scroll)

### Close Check

1. Click orb to open menu
2. Click the X icon
3. **Expected:**
   - ✅ Menu closes smoothly
   - ✅ X icon fades/rotates back to VS logo
   - ✅ Links fade out
   - ✅ Container shrinks to circle

---

## 🔄 Responsive Transition Testing

### Desktop → Mobile

1. Start in full desktop view (header visible)
2. Slowly resize browser narrower
3. **At 768px breakpoint:**
   - ✅ Desktop header disappears
   - ✅ Orbital menu appears
   - ✅ No flashing or content shift
   - ✅ Smooth transition

### Mobile → Desktop

1. Start in mobile view (orb visible, closed)
2. Slowly resize browser wider
3. **At 768px breakpoint:**
   - ✅ Orbital menu disappears
   - ✅ Desktop header appears
   - ✅ No errors in console
   - ✅ Smooth transition

### With Menu Open

1. Open orbital menu in mobile view
2. Resize to desktop
3. **Expected:**
   - ✅ Orbital menu unmounts (even if open)
   - ✅ Desktop header appears
   - ✅ No orphaned menu elements

---

## 🎨 Visual Quality Check

### Desktop Header

- [ ] Font: Playfair Display serif
- [ ] Brand color: Pink (#ff1493)
- [ ] Text shadow: Pink glow
- [ ] Hover color: Green (#00ff00 area)
- [ ] Positioned at top of hero
- [ ] Doesn't interfere with video

### Mobile Orb (Closed)

- [ ] Perfect circle (60x60px)
- [ ] VS text: Playfair Display
- [ ] Pink text shadow/glow
- [ ] Dark translucent background
- [ ] Pink border (subtle)
- [ ] Top-right corner (1rem from edges)

### Mobile Menu (Open)

- [ ] Rounded rectangle (not square)
- [ ] Auto-sized (fits all links)
- [ ] Dark background with blur
- [ ] Pink border
- [ ] Box shadow with pink glow
- [ ] Links: Gray text, white on hover
- [ ] Smooth spring animation
- [ ] X icon with pink glow

---

## 🐛 Common Issues to Check

### Issue: Desktop header AND mobile menu both visible

❌ **Symptom:** Both navigation types showing at same time  
✅ **Expected:** Only one visible at a time  
🔍 **Check:** Screen width is exactly 768px (breakpoint edge case)

### Issue: Menu links cut off when expanded

❌ **Symptom:** Text wrapping or hidden  
✅ **Expected:** All links fully visible, no overflow  
🔍 **Check:** Verify `width: "auto"` in variants

### Issue: Menu appears on desktop

❌ **Symptom:** Orb visible when screen >768px  
✅ **Expected:** Only header visible on desktop  
🔍 **Check:** `useIsMobile` hook working correctly

### Issue: Font doesn't match

❌ **Symptom:** VS logo using sans-serif  
✅ **Expected:** Playfair Display serif font  
🔍 **Check:** CSS `.orb-logo-text` has correct font-family

### Issue: Menu hidden behind content

❌ **Symptom:** Can't click orb, partially visible  
✅ **Expected:** Always on top, fully interactive  
🔍 **Check:** Z-index is 9999

---

## 📸 Screenshot Checklist

Capture these states for documentation:

1. **Desktop - Full Width**

   - Header visible at top
   - No orbital menu

2. **Mobile - Closed**

   - Circular orb with VS logo
   - Header hidden

3. **Mobile - Open**

   - Expanded menu with all links
   - X icon visible

4. **Mobile - Hover State**

   - Link highlighted on hover

5. **Transition - 768px**
   - Exact moment of navigation swap

---

## ⏱️ Performance Check

### Desktop

- [ ] Page loads quickly
- [ ] No JavaScript for navigation
- [ ] Header renders immediately
- [ ] No layout shifts

### Mobile

- [ ] Orb appears immediately
- [ ] Menu expansion is 60fps
- [ ] No lag when opening/closing
- [ ] Smooth spring animations
- [ ] No console errors

### Resize

- [ ] Navigation swaps within 1 frame
- [ ] No visible re-render flash
- [ ] No memory leaks
- [ ] Event listeners cleaned up

---

## 🎭 Edge Cases

### Very Small Mobile (320px)

- [ ] Orb still fits in corner
- [ ] Menu doesn't overflow screen
- [ ] Links remain readable
- [ ] Text doesn't wrap awkwardly

### Very Large Desktop (1920px+)

- [ ] Header stays centered (max-width)
- [ ] Links properly spaced
- [ ] Branding visible
- [ ] No weird stretching

### Landscape Mobile (768x400)

- [ ] Menu fits on screen
- [ ] Scrollable if needed
- [ ] Still functional

### Touch Devices

- [ ] Tap orb works (no delay)
- [ ] Links tappable (not too small)
- [ ] No hover states stuck
- [ ] Smooth scroll on touch

---

## ✅ Pass Criteria

**Navigation system passes if:**

1. ✅ Desktop shows header only (≥768px)
2. ✅ Mobile shows orbital menu only (<768px)
3. ✅ Both navigate to correct sections
4. ✅ Smooth transitions between breakpoints
5. ✅ No visual glitches or flashing
6. ✅ All links work correctly
7. ✅ Animations are smooth (60fps)
8. ✅ No console errors
9. ✅ Accessible via keyboard
10. ✅ Responsive at all screen sizes

---

## 🚫 Fail Criteria

**System fails if:**

1. ❌ Both navigation types visible simultaneously
2. ❌ Neither navigation type visible
3. ❌ Links don't navigate correctly
4. ❌ Menu expansion cuts off content
5. ❌ Flash of wrong content on resize
6. ❌ Animations janky or stuttering
7. ❌ Console errors present
8. ❌ Menu hidden behind other content
9. ❌ Can't interact with navigation
10. ❌ Broken at specific screen sizes

---

**Testing Time:** ~5 minutes  
**Priority:** Critical (blocks mobile users)  
**Browser Support:** Chrome, Firefox, Safari, Edge  
**Device Support:** Desktop, Tablet, Mobile
