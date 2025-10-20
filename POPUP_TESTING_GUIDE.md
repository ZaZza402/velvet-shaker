# Pop-up Testing & Debugging Guide

## 🔍 How to Test the Pop-up

### **Quick Test (5 seconds)**

To see the pop-up immediately for testing:

1. **Open browser DevTools** (F12 or Right-click → Inspect)
2. **Go to Console tab**
3. **Type this command:**
   ```javascript
   sessionStorage.clear();
   ```
4. **Refresh the page** (F5)
5. **Wait 5 seconds** - Pop-up should appear

---

## 🐛 Debug Mode

### **Enable Debug Logs:**

The pop-up now includes console logs. Open DevTools Console and you'll see:

```
Scroll percentage: 45.2
Scroll percentage: 67.8
Scroll percentage: 82.1  ← When you reach 80%
60 seconds elapsed - showing popup  ← When timer triggers
```

---

## ✅ Pop-up Triggers (Both Ways)

### **Method 1: Scroll to 80%**

1. Scroll down the page slowly
2. Watch Console: "Scroll percentage: X"
3. When it reaches **80% or more**, wait 2 seconds
4. **Pop-up appears** ✓

### **Method 2: Wait 60 Seconds**

1. Stay on the page without scrolling
2. Wait 60 seconds (1 minute)
3. Console shows: "60 seconds elapsed - showing popup"
4. **Pop-up appears** ✓

---

## 🔧 If Pop-up Doesn't Show

### **Problem 1: Already Shown**

**Symptom:** Refreshing page doesn't show pop-up  
**Solution:**

```javascript
// In browser console:
sessionStorage.clear();
// Then refresh page
```

### **Problem 2: Can't Reach 80%**

**Symptom:** Scroll percentage stuck below 80%  
**Reason:** Page might be short, or you're already at bottom  
**Solution:**

- Use the 60-second timer instead
- OR scroll from top to bottom slowly

### **Problem 3: Pop-up Disappeared Too Fast**

**Symptom:** Saw it flash but it closed  
**Solution:**

- Don't click outside the pop-up
- Don't press Escape
- Just wait for it to fully animate in

---

## 📱 Mobile Testing

### **Mobile Responsive Features:**

- ✅ Smaller text on mobile (text-sm → text-base)
- ✅ Tighter spacing (space-y-4 → space-y-6)
- ✅ Smaller padding (p-6 → p-8)
- ✅ Responsive icon size (w-14 → w-16)
- ✅ Max height with scroll (max-h-[90vh])
- ✅ Wider on small screens (w-[95%])

### **Test on Mobile:**

1. Open site on phone (or use DevTools mobile emulator)
2. Scroll to bottom slowly
3. Check Console logs (if using DevTools)
4. Pop-up should be perfectly sized

---

## 🎯 Immediate Testing Steps

### **Right Now - Test This:**

1. **Clear session:**

   ```javascript
   sessionStorage.clear();
   ```

2. **Refresh page** (Ctrl+R or F5)

3. **Open Console** (F12 → Console tab)

4. **Choose one test:**

   **Test A - Scroll Test:**

   - Scroll down slowly
   - Watch for "Scroll percentage: X" logs
   - Wait for 80%+ and 2 seconds

   **Test B - Timer Test:**

   - Don't scroll at all
   - Wait 60 seconds
   - Should see "60 seconds elapsed - showing popup"

5. **Pop-up should appear!**

---

## 🔍 Advanced Debugging

### **Check if Pop-up Component is Loaded:**

```javascript
// In console:
document.querySelector('[class*="z-\\[9999\\]"]');
// Should return an element when pop-up is visible
```

### **Manually Trigger Pop-up (Emergency):**

Add this temporary button to `App.tsx` (for testing only):

```tsx
// Add to App.tsx return statement:
<button
  onClick={() => {
    sessionStorage.removeItem("clientPopupShown");
    window.location.reload();
  }}
  className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded z-[10000] text-xs"
>
  Reset & Show Popup
</button>
```

---

## 📊 Current Settings

| Setting        | Value          | Location |
| -------------- | -------------- | -------- |
| Scroll Trigger | 80%            | Line ~36 |
| Scroll Delay   | 2 seconds      | Line ~39 |
| Timer Trigger  | 60 seconds     | Line ~45 |
| Storage Type   | sessionStorage | Line ~11 |
| Mobile Width   | 95%            | Line ~92 |

---

## 🎨 Mobile Optimizations Applied

### **Before (Desktop-only):**

```tsx
className = "w-[90%] max-w-lg p-8";
className = "text-3xl";
className = "text-lg";
```

### **After (Mobile-responsive):**

```tsx
className =
  "w-[95%] sm:w-[90%] max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto";
className = "text-2xl sm:text-3xl";
className = "text-base sm:text-lg";
```

---

## ⚡ Quick Fixes

### **Pop-up Shows Too Often:**

Change `sessionStorage` to `localStorage` (line 11):

```tsx
const popupShown = localStorage.getItem("clientPopupShown");
```

### **Pop-up Shows Too Rarely:**

Keep `sessionStorage` (resets each browser session)

### **Make it Show Faster (Testing):**

```tsx
// Change 60 seconds to 10 seconds (line ~45):
}, 10000); // 10 seconds

// Change 80% to 50% (line ~36):
if (scrollPercentage >= 50) {
```

---

## ✅ Success Checklist

- [ ] Pop-up appears after scrolling to 80%
- [ ] Pop-up appears after 60 seconds
- [ ] Console shows scroll percentage logs
- [ ] Console shows "60 seconds elapsed" log
- [ ] Pop-up is properly sized on mobile
- [ ] Close button works
- [ ] Facebook button opens correct page
- [ ] "No grazie" button closes pop-up
- [ ] Clicking outside closes pop-up
- [ ] Pop-up only shows once per session

---

## 🚀 Testing Command Summary

```javascript
// 1. Clear previous session
sessionStorage.clear();

// 2. Check current status
sessionStorage.getItem("clientPopupShown");

// 3. Force show (remove storage)
sessionStorage.removeItem("clientPopupShown");

// 4. Refresh
location.reload();
```

---

**If you still don't see it:**

1. Make sure you cleared sessionStorage
2. Check Console for error messages
3. Verify scroll percentage reaches 80%
4. Wait the full 60 seconds
5. Check if pop-up is behind something (z-index issue)

**Last Updated:** January 2025  
**Debug Logs:** Enabled ✓  
**Mobile Optimized:** Yes ✓
