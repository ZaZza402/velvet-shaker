# CSS Architecture Documentation

## Overview

This project now follows a **component-based CSS architecture** where each component has its own dedicated stylesheet. This organization makes the codebase more maintainable, easier to debug, and simpler to modify.

---

## File Structure

### Component-Specific CSS Files

#### 1. **CinematicHero.css**

**Location:** `src/components/CinematicHero.css`

**Purpose:** Styles specific to the hero/landing section with video background

**Key Features:**

- Film grain animation effect
- Cinematic vignette overlay
- Hero-specific video rendering
- Viewport height management

**Animations:**

- `grain-movement` - 8s looping film grain effect

**Usage:** Automatically imported in `CinematicHero.tsx`

---

#### 2. **CinematicStory.css**

**Location:** `src/components/CinematicStory.css`

**Purpose:** Styles for the "Capitolo Uno - Poesia Liquida" story section

**Key Features:**

- Liquid flow animations for gradient text
- "Poesia Liquida" special effects
- Story text animations
- Video styling for spinning cocktail background

**Animations:**

- `gradientShift` - Gradient color shifting
- `liquidFlow` - Liquid poetry animation with hue rotation
- `transcendentGlow` - Pulsing glow effect
- `shimmerWave` - Shimmer sweep animation

**Usage:** Automatically imported in `CinematicStory.tsx`

---

#### 3. **UndergroundMenu.css**

**Location:** `src/components/UndergroundMenu.css`

**Purpose:** Styles for the cocktail menu section (Capitolo Due)

**Key Features:**

- Card hover effects
- Neon glow animations for menu items
- Gradient backgrounds
- Interactive card transformations

**Animations:**

- `menu-neon-pulse` - 2s neon glow pulsing effect

**Usage:** Automatically imported in `UndergroundMenu.tsx`

---

#### 4. **LegendBegins.css**

**Location:** `src/components/LegendBegins.css`

**Purpose:** Styles for the reservation form section (Capitolo Tre)

**Key Features:**

- Form input focus states
- Submit button glow effects
- Animated background elements
- Purple/pink theme styling

**Animations:**

- `legend-pulse` - 4s breathing animation for background elements

**Usage:** Automatically imported in `LegendBegins.tsx`

---

#### 5. **App.css** (Component-specific)

**Location:** `src/components/App.css`

**Purpose:** Footer and app-level component styles

**Key Features:**

- Footer styling
- Footer gradient overlay

**Usage:** Imported in `App.tsx`

---

### Global CSS Files

#### 1. **App.css** (Global)

**Location:** `src/App.css`

**Purpose:** True global styles that apply across all components

**Includes:**

- Global gradient utilities (`.bg-gradient-radial`)
- Smooth scrolling behavior
- Body and root element resets
- Mobile touch target enhancements
- Global video rendering settings

**Note:** This file should only contain styles that are truly global and used across multiple components.

---

#### 2. **index.css**

**Location:** `src/index.css`

**Purpose:** Tailwind CSS imports and global utility styles

**Includes:**

- Tailwind base, components, utilities
- Global resets
- Custom scrollbar styling
- Selection styling
- Utility animations (twinkle, fadeIn, float, etc.)
- Focus states for accessibility
- Performance optimizations

**Note:** This file handles Tailwind configuration and utility-level global styles.

---

## How to Make Changes

### Modifying Component Styles

1. **Find the Component:** Identify which component you want to modify
2. **Open Component CSS:** Navigate to `src/components/[ComponentName].css`
3. **Make Changes:** Edit the specific styles or animations
4. **Test:** The changes will hot-reload automatically

**Example:** To change the hero's film grain effect:

- Open `src/components/CinematicHero.css`
- Modify the `.cinematic-hero .film-grain` class or `grain-movement` animation
- Save and view changes instantly

### Adding New Component Styles

1. **Create CSS File:** Create `src/components/[NewComponent].css`
2. **Add Styles:** Write component-specific styles
3. **Import in Component:** Add `import "./[NewComponent].css";` at the top of your component file
4. **Add Root Class:** Add a unique class to your component's root element (e.g., `className="new-component"`)

### Modifying Global Styles

1. **Determine Scope:** Is this truly global or component-specific?
2. **Edit Appropriate File:**
   - **True globals:** Edit `src/App.css`
   - **Utility classes:** Edit `src/index.css`
3. **Test Across Components:** Ensure global changes don't break existing components

---

## Benefits of This Architecture

### ✅ **Maintainability**

- Easy to find styles for a specific component
- Changes are isolated and predictable
- No more hunting through thousands of lines of CSS

### ✅ **Performance**

- Only load CSS that's actually used
- Better code splitting and lazy loading potential
- Smaller bundle sizes per route

### ✅ **Scalability**

- New components get their own CSS files
- No style conflicts between components
- Easy to remove unused code

### ✅ **Developer Experience**

- Clear ownership of styles
- Faster debugging
- Better organization
- Easier onboarding for new developers

---

## Best Practices

### DO ✅

- Keep component-specific styles in component CSS files
- Use descriptive class names prefixed with component name
- Document complex animations and effects
- Test changes across all breakpoints

### DON'T ❌

- Add component-specific styles to global CSS files
- Use overly generic class names that might conflict
- Mix component styles with global utilities
- Forget to import the CSS file in the component

---

## Animation Reference

### CinematicHero Animations

| Animation        | Duration | Purpose                     |
| ---------------- | -------- | --------------------------- |
| `grain-movement` | 8s       | Film grain texture movement |

### CinematicStory Animations

| Animation          | Duration | Purpose                                |
| ------------------ | -------- | -------------------------------------- |
| `gradientShift`    | Variable | Gradient color transitions             |
| `liquidFlow`       | 12s      | Liquid poetry effect with hue rotation |
| `transcendentGlow` | 3s       | Pulsing glow effect                    |
| `shimmerWave`      | Variable | Light shimmer sweep                    |

### UndergroundMenu Animations

| Animation         | Duration | Purpose           |
| ----------------- | -------- | ----------------- |
| `menu-neon-pulse` | 2s       | Neon glow pulsing |

### LegendBegins Animations

| Animation      | Duration | Purpose                      |
| -------------- | -------- | ---------------------------- |
| `legend-pulse` | 4s       | Background element breathing |

---

## Troubleshooting

### Styles Not Applying

1. Check that CSS file is imported in the component
2. Verify the class name matches in both CSS and component
3. Check browser console for CSS errors
4. Clear browser cache and restart dev server

### Animation Not Working

1. Verify keyframe name matches animation name
2. Check that element has the animation class applied
3. Ensure animation duration is set
4. Check for conflicting styles

### Conflicts Between Components

1. Use component-prefixed class names
2. Scope styles to component root class
3. Avoid overly generic selectors
4. Use CSS modules if conflicts persist

---

## Migration Notes

### What Changed

- **Before:** All CSS in `App.css` and `index.css`
- **After:** Component-specific CSS in separate files

### Breaking Changes

- None! Visual appearance remains identical
- All functionality preserved
- Only internal organization changed

### Files Modified

- ✅ `CinematicHero.tsx` - Added CSS import
- ✅ `CinematicStory.tsx` - Added CSS import, removed inline `<style>` tag
- ✅ `UndergroundMenu.tsx` - Added CSS import
- ✅ `LegendBegins.tsx` - Added CSS import
- ✅ `App.tsx` - Added component CSS import
- ✅ `App.css` - Cleaned up, kept only globals
- ✅ `index.css` - No changes (already global utilities)

### Files Created

- ✨ `src/components/CinematicHero.css`
- ✨ `src/components/CinematicStory.css`
- ✨ `src/components/UndergroundMenu.css`
- ✨ `src/components/LegendBegins.css`
- ✨ `src/components/App.css`

---

## Future Recommendations

### Consider CSS Modules

For even better isolation, consider migrating to CSS Modules:

```tsx
import styles from "./Component.module.css";
<div className={styles.container}>...</div>;
```

### Consider Styled Components

For dynamic styling based on props:

```tsx
import styled from "styled-components";
const StyledDiv = styled.div`...`;
```

### Consider Tailwind JIT

Already using Tailwind - leverage JIT mode for optimal bundle size

---

**Last Updated:** October 14, 2025
**Maintained By:** Development Team
**Version:** 1.0.0
