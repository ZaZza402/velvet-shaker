# Client Contact Pop-up - Configuration Guide

## 🎯 Quick Settings Reference

### Current Trigger Settings

Located in: `src/components/ClientContactPopup.tsx`

```javascript
// SCROLL TRIGGER
if (scrollPercentage > 80 && !hasShown) {
  setTimeout(() => showPopup(), 2000);
}
//    ↑               ↑
//    Percentage      Delay after reaching

// TIME TRIGGER
setTimeout(() => showPopup(), 60000);
//                            ↑
//                            Time in milliseconds
```

---

## ⚙️ Customization Options

### **Option 1: Change Scroll Threshold**

**Current:** Shows at 80% scroll  
**To change:** Modify line ~28

```javascript
// More aggressive (shows earlier)
if (scrollPercentage > 50 && !hasShown) {  // 50% = halfway down

// More conservative (shows later)
if (scrollPercentage > 90 && !hasShown) {  // 90% = almost at bottom
```

---

### **Option 2: Change Scroll Delay**

**Current:** 2 seconds after reaching threshold  
**To change:** Modify line ~30

```javascript
// Instant (no delay)
setTimeout(() => showPopup(), 0);

// Longer delay
setTimeout(() => showPopup(), 5000); // 5 seconds
```

---

### **Option 3: Change Time Trigger**

**Current:** Shows after 60 seconds  
**To change:** Modify line ~44

```javascript
// Shorter time (30 seconds)
setTimeout(() => showPopup(), 30000);

// Longer time (2 minutes)
setTimeout(() => showPopup(), 120000);

// Disable time trigger (only scroll-based)
// Just comment out or delete the setTimeout block
```

---

### **Option 4: Always Show (Testing)**

**Current:** Only shows once per session  
**To change:** Comment out localStorage check (line ~10-14)

```javascript
// ORIGINAL (shows once):
const popupShown = localStorage.getItem("clientPopupShown");
if (popupShown) {
  setHasShown(true);
  return;
}

// TESTING MODE (shows every time):
// const popupShown = localStorage.getItem("clientPopupShown");
// if (popupShown) {
//   setHasShown(true);
//   return;
// }
```

**⚠️ Remember:** Re-enable localStorage for production!

---

### **Option 5: Manual Trigger**

Add a button anywhere to manually trigger the pop-up:

```tsx
// In any component:
import { useState } from "react";

const [showPopup, setShowPopup] = useState(false);

// Hidden testing button (remove before production)
<button
  onClick={() => setShowPopup(true)}
  className="fixed bottom-4 right-4 bg-pink-500 text-white px-4 py-2 rounded z-50"
>
  Test Popup
</button>;
```

---

## 🎨 Visual Customization

### **Change Colors:**

Located in: `src/components/ClientContactPopup.tsx` (line ~100)

```tsx
// Gradient glow (line ~79)
className = "... from-pink-500/30 via-purple-500/20 to-green-500/30 ...";

// Title gradient (line ~146)
className = "... from-pink-400 via-purple-400 to-green-400";

// Button gradient (line ~174)
className = "... from-pink-500 to-purple-500 ...";
```

**Example color schemes:**

**Blue/Cyan:**

```tsx
from-cyan-500/30 via-blue-500/20 to-purple-500/30
```

**Gold/Orange:**

```tsx
from-yellow-500/30 via-orange-500/20 to-red-500/30
```

---

### **Change Size:**

```tsx
// Current (line ~76)
className = "... w-[90%] max-w-lg";

// Smaller
className = "... w-[80%] max-w-md";

// Larger
className = "... w-[95%] max-w-2xl";
```

---

### **Change Animation:**

```tsx
// Current entrance (line ~71-74)
initial={{ opacity: 0, scale: 0.9, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}

// Faster
transition={{ duration: 0.2, ease: "easeOut" }}

// Bounce effect
transition={{ type: "spring", stiffness: 300, damping: 20 }}

// Slide from bottom
initial={{ opacity: 0, y: 100 }}
```

---

## 📱 Mobile Adjustments

### **Change Mobile Width:**

```tsx
// Current
className = "w-[90%] max-w-lg";

// Wider on mobile
className = "w-[95%] max-w-lg";

// Narrower on mobile
className = "w-[85%] max-w-lg";
```

---

## 🔧 Advanced Options

### **Multi-Step Pop-up:**

Add state to show different messages:

```tsx
const [step, setStep] = useState(1);

// Step 1: Initial message
// Step 2: After clicking "Learn More"
// Step 3: Thank you message
```

### **Delay Between Visits:**

Instead of showing once ever, show once per day:

```javascript
const lastShown = localStorage.getItem("popupLastShown");
const now = Date.now();
const oneDayMs = 24 * 60 * 60 * 1000;

if (lastShown && now - parseInt(lastShown) < oneDayMs) {
  return; // Don't show yet
}

// When showing:
localStorage.setItem("popupLastShown", now.toString());
```

### **A/B Testing:**

Show different messages to different users:

```javascript
const variant = Math.random() > 0.5 ? "A" : "B";

// Variant A: "Ti è Piaciuto?"
// Variant B: "Vuoi un sito così?"
```

---

## 🎯 Recommended Settings

### **Conservative (Low Annoyance):**

- Scroll: 90%
- Delay: 3000ms
- Time: 90000ms (90 seconds)

### **Balanced (Default):**

- Scroll: 80%
- Delay: 2000ms
- Time: 60000ms (60 seconds)

### **Aggressive (High Conversion):**

- Scroll: 60%
- Delay: 1000ms
- Time: 30000ms (30 seconds)

---

## 🧪 Testing Tips

### **1. Clear localStorage:**

```javascript
// In browser console:
localStorage.clear();
// Refresh page
```

### **2. Disable scroll trigger:**

```javascript
// Comment out scroll listener (line ~46)
// window.addEventListener("scroll", handleScroll);
```

### **3. Test immediately:**

```javascript
// Change time trigger to 5 seconds
setTimeout(() => showPopup(), 5000);
```

### **4. Log scroll percentage:**

```javascript
console.log("Scroll:", scrollPercentage);
```

---

## 📊 Analytics (Future Enhancement)

Track pop-up performance:

```javascript
// When shown
console.log("Popup shown at:", new Date());

// When clicked
console.log("Facebook clicked from popup");

// When dismissed
console.log("Popup dismissed");

// Later: Send to Google Analytics
gtag('event', 'popup_shown', { ... });
```

---

## 🎨 Content Customization

### **Change Text:**

Located in `ClientContactPopup.tsx`:

```tsx
// Title (line ~146)
Ti è Piaciuto?
→ Change to: "Vuoi un sito così?"

// Message (line ~156)
Questo è un sito dimostrativo creato da Alex.
→ Change to your message

// Button (line ~177)
Contattami su Facebook
→ Change to: "Richiedi un preventivo"

// Dismiss (line ~193)
No grazie, continua a esplorare
→ Change to: "Forse più tardi"
```

---

## 🚀 Quick Start

1. **Test the default:** Browse site, wait 60 seconds or scroll to footer
2. **See it immediately:** Change time trigger to `5000` (5 seconds)
3. **Adjust as needed:** Use settings above
4. **Reset for production:** Restore original values
5. **Clear localStorage:** Test one more time

---

**File Location:**  
`src/components/ClientContactPopup.tsx`

**Key Lines:**

- Line ~28: Scroll threshold (80%)
- Line ~30: Scroll delay (2000ms)
- Line ~44: Time trigger (60000ms)
- Line ~11: localStorage check

---

**Quick Access Command:**

```bash
# Open in VS Code
code src/components/ClientContactPopup.tsx
```

**Documentation Updated:** January 2025
