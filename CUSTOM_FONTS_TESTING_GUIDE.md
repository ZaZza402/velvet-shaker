# Custom Fonts Visual Testing Guide

## 🎯 Quick Verification Checklist

### **Phase 1: Georgia Font Verification**

#### CinematicStory Section

- [ ] Scroll to story section
- [ ] Verify 3 story paragraphs use **Georgia font** (elegant serif, more rounded than Playfair)
- [ ] Check "La precisione incontra..." description uses **Georgia**
- [ ] Ensure text is warm and readable

#### CocktailCard (Menu Section)

- [ ] Navigate to cocktail menu
- [ ] Hover over any cocktail card
- [ ] Verify ingredients text uses **Georgia**
- [ ] Check story/description text (italic) uses **Georgia**
- [ ] Confirm readability improvement over default fonts

#### UndergroundMenu (L'Ora Dorata)

- [ ] Scroll to Golden Hour section
- [ ] Verify subtitle "Dove il crepuscolo incontra l'alchimia" uses **Georgia**
- [ ] Check time text "Ogni Mercoledì..." uses **Georgia**
- [ ] Verify all cocktail descriptions use **Georgia**
- [ ] Check pairing notes (italic) use **Georgia**

#### RendezvousPoint (Location)

- [ ] Navigate to location section
- [ ] Verify subtitle "Nel cuore pulsante..." uses **Georgia**
- [ ] Check address text uses **Georgia**
- [ ] Verify hours information uses **Georgia**

#### Footer

- [ ] Scroll to footer
- [ ] Check newsletter subtitle uses **Georgia**

#### LegendBegins (Reservation)

- [ ] Navigate to reservation section
- [ ] Verify subtitle "Entra nell'underground..." uses **Georgia**

---

### **Phase 2: Amsterdam Handwriting Verification**

#### CinematicStory

- [ ] Check "Capitolo Uno" eyebrow text
- [ ] Verify it's in **handwritten script** style
- [ ] Confirm **NO clipping** on tall letters (C, l, t, etc.)
- [ ] Check adequate spacing above/below text

#### UndergroundMenu

- [ ] Scroll to L'Ora Dorata section
- [ ] Verify "L'Ora Dorata" title is **handwritten** (large, elegant script)
- [ ] Check for **NO clipping** on apostrophe or capital letters
- [ ] Confirm adequate vertical padding

#### LegendBegins

- [ ] Navigate to reservation section
- [ ] Check "Capitolo Tre" uses **handwritten** style
- [ ] Verify no character clipping
- [ ] Confirm consistent styling with "Capitolo Uno"

#### RendezvousPoint

- [ ] Scroll to location section
- [ ] Verify "Il Punto d'Incontro" uses **handwritten** style
- [ ] Check for no clipping on tall letters
- [ ] Confirm spacing is adequate

#### Footer

- [ ] Scroll to footer
- [ ] Check tagline "Dove ogni cocktail racconta..." is **handwritten**
- [ ] Verify larger size (1.25rem)
- [ ] Confirm no clipping with adequate padding

---

## 🔍 Visual Inspection Points

### **Amsterdam Handwriting (Critical)**

Look for these potential issues:

1. **Character Clipping**

   - ✓ Check capital letters: A, C, D, L, O
   - ✓ Check tall lowercase: b, d, f, h, k, l, t
   - ✓ Check descenders: g, j, p, q, y
   - ✓ Check apostrophes and accents: ', é, à, ò

2. **Spacing Verification**

   - ✓ Line height should feel airy (not cramped)
   - ✓ Letter spacing should allow breathing room
   - ✓ Top/bottom padding prevents vertical clipping

3. **Readability**
   - ✓ Text should be legible at intended size
   - ✓ Script should feel elegant, not messy
   - ✓ Contrast against backgrounds is sufficient

### **Georgia (Readability)**

Look for these quality markers:

1. **Warmth & Elegance**

   - ✓ More rounded serifs than Playfair
   - ✓ Feels inviting and readable
   - ✓ Good for longer paragraphs

2. **Hierarchy**

   - ✓ Clearly different from Playfair headings
   - ✓ Complements neon accent colors
   - ✓ Doesn't compete with titles

3. **Consistency**
   - ✓ All descriptions use same font
   - ✓ Info text is uniform
   - ✓ No random font switching

---

## 📱 Mobile Testing (Phase 3)

### **Screen Sizes to Test**

- [ ] **320px** - iPhone SE, small phones
- [ ] **375px** - iPhone 12/13 Mini
- [ ] **390px** - iPhone 12/13/14 Pro
- [ ] **414px** - iPhone 12/13 Pro Max
- [ ] **768px** - iPad portrait, tablet

### **Mobile-Specific Checks**

#### Amsterdam Handwriting on Mobile

- [ ] "Capitolo Uno" - Check clipping on small screens
- [ ] "L'Ora Dorata" - Verify large title doesn't overflow
- [ ] Footer tagline - Confirm wrapping is elegant
- [ ] All eyebrows - Ensure adequate touch target spacing

#### Georgia on Mobile

- [ ] Story paragraphs - Verify line length comfortable
- [ ] Cocktail descriptions - Check readability at small size
- [ ] Info text - Confirm doesn't feel cramped
- [ ] Form text - Ensure adequate tap targets

---

## 🎨 Font Comparison Reference

### **What to Look For:**

**Playfair Display** (Main Headings)

- Sharp, elegant serifs
- High contrast between thick/thin strokes
- Commanding presence
- Example: "L'Arte della" title

**Amsterdam Handwriting** (Signature Elements)

- Flowing, cursive script
- Connected letters (ligatures)
- Organic, hand-drawn feel
- Example: "Capitolo Uno", "L'Ora Dorata"

**Georgia** (Body Text)

- Classic serif with rounded edges
- Lower contrast than Playfair
- Warm, readable, inviting
- Example: Story paragraphs, descriptions

**Inter** (UI/Fallback)

- Clean, modern sans-serif
- Neutral, high legibility
- Used for buttons, labels
- Example: Button text, form labels

---

## ✅ Quick Visual Test Procedure

1. **Open the website** in development mode
2. **Scroll through each section** in order:

   - Hero → Story → Menu → Golden Hour → Reservation → Location → Footer

3. **For each section**, verify:

   - ✓ Fonts match expected typography (see table below)
   - ✓ No clipping or overflow issues
   - ✓ Readability is excellent
   - ✓ Visual hierarchy is clear

4. **Test responsive behavior**:
   - Resize browser from desktop → tablet → mobile
   - Check for Amsterdam clipping at breakpoints
   - Verify Georgia remains readable

---

## 📋 Expected Font Usage Table

| Section             | Eyebrow/Small            | Main Title                 | Body/Description                     |
| ------------------- | ------------------------ | -------------------------- | ------------------------------------ |
| **CinematicStory**  | Amsterdam (Capitolo Uno) | Playfair (L'Arte della...) | Georgia (paragraphs)                 |
| **UndergroundMenu** | -                        | Playfair (cocktail names)  | Georgia (descriptions)               |
| **L'Ora Dorata**    | -                        | Amsterdam (L'Ora Dorata)   | Georgia (descriptions)               |
| **LegendBegins**    | Amsterdam (Capitolo Tre) | Playfair (La Tua Leggenda) | Georgia (subtitle)                   |
| **RendezvousPoint** | Amsterdam (Il Punto...)  | Playfair (Dove Trovarci)   | Georgia (address/hours)              |
| **Footer**          | -                        | Playfair (L'Underground)   | Amsterdam (tagline) + Georgia (text) |

---

## 🚨 Common Issues to Watch For

### **Amsterdam Handwriting**

❌ **Clipping** - Tall letters cut off at top/bottom  
✅ **Fix**: Increase lineHeight or padding

❌ **Illegible** - Too small or low contrast  
✅ **Fix**: Increase font-size or adjust color

❌ **Cramped** - Letters touching or overlapping  
✅ **Fix**: Increase letterSpacing

### **Georgia**

❌ **Too similar to Playfair** - Hard to distinguish  
✅ **Solution**: Georgia is rounder, Playfair is sharper

❌ **Poor readability** - Text too small on mobile  
✅ **Fix**: Adjust responsive font sizes

❌ **Inconsistent usage** - Mixed with other fonts randomly  
✅ **Fix**: Ensure all body text uses Georgia consistently

---

## 🎯 Sign-Off Criteria

Before considering implementation complete:

- [ ] ✅ All Georgia text is readable and warm
- [ ] ✅ All Amsterdam elements have no clipping
- [ ] ✅ Font hierarchy is visually clear
- [ ] ✅ Mobile responsive behavior is smooth
- [ ] ✅ No console errors related to fonts
- [ ] ✅ All sections follow typography table above
- [ ] ✅ Contrast ratios meet accessibility standards
- [ ] ✅ Client approval on visual aesthetic

---

**Last Updated**: January 2025  
**Testing Status**: Ready for Phase 3 verification
