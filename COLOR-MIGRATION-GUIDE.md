# Jason Holt Photography Color Palette Migration Guide

This guide documents the updated color palette and implementation changes made to the Jason Holt Photography website to achieve better visual section separation and consistent brand styling.

## Updated Color Palette

The updated color palette maintains the original earth tone colors while adding a new slate blue color and improving opacity/contrast settings:

### Core Colors

| Color Name | Light Mode | Dark Mode | HEX/HSL Value | Usage |
|------------|------------|-----------|---------------|-------|
| Isabelline | Background | Foreground | `#F3F2EE` / `hsl(48, 17%, 94%)` | Main background color |
| Black Olive | Foreground | Background | `#414836` / `hsl(83, 14%, 25%)` | Primary text color |
| Bone | Secondary | - | `#C7C6B4` / `hsl(57, 15%, 74%)` | Subtle design elements |
| Bone-2 | Muted | - | `#DAD4C4` / `hsl(44, 23%, 81%)` | Primary section backgrounds |
| Reseda Green | - | Primary | `#828069` / `hsl(55, 11%, 46%)` | Dark mode accents, buttons |
| Lion | Accent | Secondary | `#B09163` / `hsl(36, 33%, 54%)` | Call to action elements |
| Slate Blue | **New** | **New** | `#7C8D94` / `hsl(210, 8%, 53%)` | Section differentiation |

## Section Background Changes

The `SectionBackground` component has been updated to provide better visual distinction between sections:

### Light Mode Improvements
- **Primary Sections**: Increased opacity from 50% to 80% for better visibility
- **Secondary Sections**: Added slate blue influence with background overlay
- **Accent Sections**: Slightly increased opacity from 10% to 20%
- **Gradient Sections**: Enhanced with subtle background blobs and improved color transitions

### Dark Mode Refinements
- **Primary Sections**: Increased opacity from 50% to 60%
- **Secondary Sections**: Adjusted for better contrast with primary sections
- **Slate Accents**: Added subtle slate influences to complement the earthy palette

## Implementation Details

### Variants

The `SectionBackground` component supports these variants:

```tsx
// Available variants
variant = "primary" | "secondary" | "muted" | "accent" | "gradient"
```

### Usage Example

To create alternating sections with distinct backgrounds:

```tsx
<SectionBackground variant="primary">
  {/* Primary section content (bone/beige background) */}
</SectionBackground>

<SectionBackground variant="secondary">
  {/* Secondary section content (slate-influenced background) */}
</SectionBackground>

<SectionBackground variant="accent">
  {/* Accent section content (lion/golden background) */}
</SectionBackground>

<SectionBackground variant="gradient">
  {/* Gradient section with background blobs */}
</SectionBackground>
```

## Blob Animations

The background blob animations have been updated with:
- Higher opacity values for better visibility
- Slate blue color added to the palette of blob colors
- Improved dark mode blob appearance

## Using the Slate Blue Color

The new slate blue can be used in various ways:

```tsx
// Direct usage in Tailwind classes
<div className="text-slate">Slate colored text</div>
<div className="bg-slate/20">Background with 20% opacity slate</div>
<div className="border-slate-light">Border using lighter slate variant</div>

// Usage in components
<SectionBackground variant="secondary">
  {/* This will now have a subtle slate influence */}
</SectionBackground>
```

## Dark Mode

Dark mode has been preserved with improved color mapping that better complements the brand's earth tone aesthetic. The colors have been adjusted to maintain sufficient contrast while providing a cohesive experience between light and dark modes.

---

These changes ensure more visually distinct sections while maintaining a subtle, elegant aesthetic that aligns with the premium photography brand.
