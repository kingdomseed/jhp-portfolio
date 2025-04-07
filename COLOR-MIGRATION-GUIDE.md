# Color Migration Guide

This document details the migration from the previous teal/blue color scheme to the new earth tone color palette implemented in the Jason Holt Photography website.

## Overview of Changes

The website's color palette has been completely updated from a teal/blue-based scheme to an earth tone palette. This change affects all UI components, styling, and design elements throughout the site.

## New Color Palette

The new color system uses the following earth tones:

| Color Name | Hex | HSL | Description |
|------------|-----|-----|-------------|
| Isabelline | #F3F2EE | hsla(48, 17%, 94%, 1) | Light background color |
| Black Olive | #414836 | hsla(83, 14%, 25%, 1) | Primary text and UI elements |
| Reseda Green | #828069 | hsla(55, 11%, 46%, 1) | Primary light and secondary UI |
| Bone | #DAD4C4 | hsla(44, 23%, 81%, 1) | Muted backgrounds and borders |
| Lion | #B09163 | hsla(36, 33%, 54%, 1) | Accent color for highlights |
| Bone-2 | #C7C6B4 | hsla(57, 15%, 74%, 1) | Secondary elements |

## Color Role Assignments

### Light Mode
- **Background**: Isabelline (#F3F2EE)
- **Text/Foreground**: Black Olive (#414836)
- **Primary**: Black Olive (#414836)
- **Primary Light**: Reseda Green (#828069)
- **Secondary**: Bone-2 (#C7C6B4)
- **Muted**: Bone (#DAD4C4)
- **Accent**: Lion (#B09163)

### Dark Mode
- **Background**: Black Olive (#414836)
- **Text/Foreground**: Isabelline (#F3F2EE)
- **Primary**: Reseda Green (#828069)
- **Primary Light**: Bone (#DAD4C4)
- **Secondary**: Lion (#B09163)
- **Muted**: Darker Black Olive
- **Accent**: Bone-2 (#C7C6B4)

## Gradient System

The following gradients have been implemented for premium visual elements:

```css
--gradient-top: linear-gradient(0deg, #f3f2ee, #414836, #dad4c4, #828069, #b09163, #c7c6b4);
--gradient-right: linear-gradient(90deg, #f3f2ee, #414836, #dad4c4, #828069, #b09163, #c7c6b4);
--gradient-bottom: linear-gradient(180deg, #f3f2ee, #414836, #dad4c4, #828069, #b09163, #c7c6b4);
--gradient-left: linear-gradient(270deg, #f3f2ee, #414836, #dad4c4, #828069, #b09163, #c7c6b4);
--gradient-radial: radial-gradient(#f3f2ee, #414836, #dad4c4, #828069, #b09163, #c7c6b4);
```

## Files Updated

1. **Global CSS Variables**: Updated in `app/globals.css`
   - Replaced all color HSL values
   - Updated blob animations to use new colors
   - Added gradient definitions

2. **Tailwind Configuration**: Updated in `tailwind.config.ts`
   - Removed teal and blue direct color references
   - Added custom earth tone palette
   - Updated glow shadow to use Reseda Green

3. **Theme Documentation**: Updated in `current-theme.md`
   - Documented new color palette
   - Added color role assignments
   - Added dark mode information

4. **ShadCN Configuration**: Updated in `components.json`
   - Changed baseColor from "zinc" to "stone" to better align with earth tones

## Visual Impact

This color migration creates a warmer, more organic look that better complements photography content, particularly:

- Portrait photography with natural skin tones
- Outdoor photography with natural landscapes
- Wedding and event photography with warm lighting

## Usage Guidelines

When creating new components or modifying existing ones:

1. Always use CSS variables (e.g., `hsl(var(--primary))`) instead of direct color references
2. For primary CTAs, use the primary color (#414836) with white text for high contrast
3. For secondary CTAs, use the accent color (#B09163) with white text
4. For subtle UI elements like borders and dividers, use the muted color (Bone: #DAD4C4)
5. Use gradients sparingly for premium or featured elements only

## Testing

After this migration, all pages should be tested in both light and dark mode to ensure proper contrast and readability.
