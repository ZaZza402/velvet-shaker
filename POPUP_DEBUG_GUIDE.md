# 🔧 Pop-up Debug & Testing Guide

## 🚀 Quick Test (Do This First!)

### **Step 1: Open Browser Console**

- Press **F12** (Windows/Linux) or **Cmd+Option+I** (Mac)
- Click **Console** tab

### **Step 2: Clear Session Storage**

Type this in console:

```javascript
sessionStorage.clear();
```

Press **Enter**

### **Step 3: Refresh Page**

Press **F5** or **Ctrl+R**

### **Step 4: Watch Console Logs**

You should see:

```
🚀 ClientContactPopup mounted - timers started
📊 Scroll: {scrollTop: 0, documentHeight: 12450, windowHeight: 969, percentage: 0}
```

### **Step 5: Trigger Pop-up**

**Option A - Scroll Test (Fast):**

- Scroll down slowly
- Watch console for scroll percentage updates
- When percentage reaches **75%** or more, wait 1 second
- Pop-up should appear!

**Option B - Time Test:**

- Don't scroll, just wait
- After **30 seconds**, pop-up should appear
- Console will show: `⏰ 30 seconds elapsed - showing popup`

---

## 🐛 Troubleshooting

### **Problem 1: "Pop-up already shown in this session"**

**Console shows:** `Pop-up already shown in this session`

**Solution:**

```javascript
sessionStorage.clear();
location.reload();
```

---

### **Problem 2: Pop-up doesn't show after scrolling**

**Check console logs:**

1. **Look for scroll logs:**

   ```
   📊 Scroll: {scrollTop: 5234, documentHeight: 12450, windowHeight: 969, percentage: 45}
   ```

2. **Scroll percentage should increase as you scroll**

3. **When it reaches 75%+, you should see:**
   ```
   ✅ Reached 75% - showing popup in 1 second...
   🎉 SHOWING POPUP NOW!
   ```

**If scroll percentage doesn't increase:**

- Your page might be short
- Try the 30-second timer instead
- Check if another element is blocking scroll

---

### **Problem 3: Pop-up shows in wrong position**

**Expected:** Center of screen, can't scroll  
**If it's in corner:** Browser cache issue

**Solution:**

```javascript
// Force refresh (bypass cache)
// Windows/Linux: Ctrl+Shift+R
// Mac: Cmd+Shift+R
```

---

### **Problem 4: Pop-up doesn't show on mobile**

**Mobile-specific checks:**

1. **Open mobile browser DevTools:**

   - Chrome Android: `chrome://inspect`
   - Safari iOS: Settings → Safari → Advanced → Web Inspector

2. **Check console for logs:**

   ```
   🚀 ClientContactPopup mounted - timers started
   ```

3. **If no logs appear:**

   - Component might not be mounted
   - Check `App.tsx` includes `<ClientContactPopup />`

4. **Test scroll detection:**
   - Scroll slowly to bottom
   - Watch console for scroll percentage
   - Should reach 75%+ near footer

---

### **Problem 5: Pop-up shows but is scrollable/moves**

**Should be:** Fixed in center, body locked  
**Console should show:** `🔒 Body scroll locked`

**If body still scrolls:**

- Clear browser cache
- Check for CSS conflicts with `body { overflow: hidden }`

---

## 📊 Expected Console Output

### **On Page Load:**

```
🚀 ClientContactPopup mounted - timers started
📊 Scroll: {scrollTop: 0, documentHeight: 12450, windowHeight: 969, percentage: 0}
```

### **While Scrolling:**

```
📊 Scroll: {scrollTop: 1234, documentHeight: 12450, windowHeight: 969, percentage: 10}
📊 Scroll: {scrollTop: 2468, documentHeight: 12450, windowHeight: 969, percentage: 21}
📊 Scroll: {scrollTop: 8642, documentHeight: 12450, windowHeight: 969, percentage: 75}
✅ Reached 75% - showing popup in 1 second...
🎉 SHOWING POPUP NOW!
🔒 Body scroll locked
```

### **After 30 Seconds:**

```
⏰ 30 seconds elapsed - showing popup
🎉 SHOWING POPUP NOW!
🔒 Body scroll locked
```

### **On Close:**

```
🧹 ClientContactPopup cleanup
```

---

## 🎯 Current Settings

| Setting            | Value        | Easy to Trigger?             |
| ------------------ | ------------ | ---------------------------- |
| **Scroll Trigger** | 75%          | ✅ Yes (reduced from 80%)    |
| **Scroll Delay**   | 1 second     | ✅ Yes (reduced from 2 sec)  |
| **Time Trigger**   | 30 seconds   | ✅ Yes (reduced from 60 sec) |
| **Position**       | Fixed Center | ✅ Yes                       |
| **Body Lock**      | Enabled      | ✅ Yes                       |
| **Z-Index**        | 99999        | ✅ Top layer                 |

---

## 🔍 Advanced Debugging

### **Check if Component is Mounted:**

```javascript
// In console:
document.querySelector('[class*="z-\\[99999\\]"]');
// Should return null initially, then element when popup shows
```

### **Force Show Pop-up (Testing Only):**

```javascript
// Remove session storage
sessionStorage.removeItem("clientPopupShown");
// Reload
location.reload();
```

### **Check Scroll Calculation Manually:**

```javascript
const windowHeight = window.innerHeight;
const documentHeight = document.documentElement.scrollHeight;
const scrollTop = window.scrollY;
const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
console.log("Current scroll:", Math.round(scrollPercentage) + "%");
```

### **Test Time Trigger Immediately:**

**Temporarily change to 5 seconds for testing:**

In `ClientContactPopup.tsx`, line ~63:

```tsx
// Change from:
}, 30000); // 30 seconds

// To (for testing only):
}, 5000); // 5 seconds
```

Don't forget to change back to 30000 after testing!

---

## 📱 Mobile-Specific Testing

### **iOS Safari:**

1. Connect iPhone to Mac
2. Safari → Develop → [Your iPhone] → [Your Site]
3. Check console logs
4. Scroll and verify percentage updates

### **Chrome Android:**

1. Enable USB debugging on phone
2. Chrome desktop → `chrome://inspect`
3. Find your device
4. Click "Inspect"
5. Check console logs

### **Mobile Emulator (Quick Test):**

1. Desktop browser DevTools (F12)
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Select mobile device
4. Refresh page
5. Test scrolling

---

## ✅ Success Checklist

When popup is working correctly:

- [ ] Console shows "🚀 ClientContactPopup mounted"
- [ ] Scroll logs show increasing percentages
- [ ] Reaches 75%+ when near footer
- [ ] Console shows "✅ Reached 75%" message
- [ ] After 1 second, shows "🎉 SHOWING POPUP NOW!"
- [ ] Pop-up appears perfectly centered
- [ ] Pop-up doesn't move when trying to scroll
- [ ] Console shows "🔒 Body scroll locked"
- [ ] Close button works (console shows "🧹 cleanup")
- [ ] Facebook button opens correct page
- [ ] Clicking outside closes popup
- [ ] After closing, refreshing doesn't show it again (session)
- [ ] After clearing session, it shows again

---

## 🚨 Emergency Test Page

If you can't get it to work, create a test page:

**test-popup.html:**

```html
<!DOCTYPE html>
<html>
  <body style="height: 3000px;">
    <h1>Scroll down to 75%</h1>
    <div
      style="position: fixed; top: 10px; right: 10px; background: black; color: white; padding: 10px;"
    >
      Scroll: <span id="percent">0</span>%
    </div>

    <script>
      window.addEventListener("scroll", () => {
        const scrollPercentage =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        document.getElementById("percent").textContent =
          Math.round(scrollPercentage);

        if (scrollPercentage >= 75) {
          alert("75% reached! Pop-up should show here.");
        }
      });
    </script>
  </body>
</html>
```

---

## 🔄 Reset Everything

If completely stuck:

```javascript
// 1. Clear all storage
sessionStorage.clear();
localStorage.clear();

// 2. Hard refresh (bypass cache)
// Windows: Ctrl+Shift+R
// Mac: Cmd+Shift+R

// 3. Close and reopen browser

// 4. Try again
```

---

## 📝 Report Issues

If still not working, provide:

1. **Browser & Version:** (Chrome 120, Safari 17, etc.)
2. **Device:** (Desktop, iPhone 14, Android, etc.)
3. **Console logs:** (Copy/paste full console output)
4. **Scroll percentage:** (Does it reach 75%?)
5. **Timer:** (Does 30-second timer trigger?)
6. **Session storage:** (Check what's stored)

---

**Last Updated:** January 2025  
**Scroll Trigger:** 75% ✓  
**Time Trigger:** 30 seconds ✓  
**Debug Logs:** Enabled ✓  
**Mobile Optimized:** Yes ✓  
**Body Lock:** Enabled ✓
