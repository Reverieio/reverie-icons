# SVG Icon Source Files

This directory is where **designers drop SVG files** to add new icons to the library.
A GitHub Action automatically converts these SVGs into TypeScript code, regenerates
all barrel exports, builds all packages, and commits the result.

## Directory Convention

```
svgs/
  <icon-name>/
    outline.svg        ← Required (stroked paths)
    solid.svg          ← Optional (single filled shape)
    duotone.svg        ← Optional (fill bg + stroked fg)
    bulk.svg           ← Optional (multi-layer fills)
    meta.json          ← Optional (search metadata)
  _template/           ← Reference example (ignored by generator)
```

- **Folder name** = icon name (lowercase, hyphens OK → converted to camelCase)
- Folders starting with `_` or `.` are **ignored**
- If only `outline.svg` is provided, the other 3 variations are auto-generated

## SVG Requirements

| Rule | Detail |
|------|--------|
| **Canvas** | 24 × 24 px |
| **viewBox** | `0 0 24 24` |
| **Stroke width** | 1.5 px (outline) |
| **No embedded styles** | Use attributes, not `<style>` blocks |
| **No transforms** | Flatten transforms before export |
| **No `<defs>` / `<clipPath>`** | Expand all effects |
| **Colors** | Use `currentColor` or `#000000` (will be stripped) |

## SVG Variation Guide

### `outline.svg` — Stroked (Required)

All elements use `stroke`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 21s-9-7.5-9-12.5C3 5.42 5.42 3 8.5 3c1.74 0 3 .81 3.5 2 .5-1.19 1.76-2 3.5-2C18.58 3 21 5.42 21 8.5c0 5-9 12.5-9 12.5z"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### `solid.svg` — Filled

All elements use `fill`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 21s-9-7.5-9-12.5C3 5.42 5.42 3 8.5 3c1.74 0 3 .81 3.5 2 .5-1.19 1.76-2 3.5-2C18.58 3 21 5.42 21 8.5c0 5-9 12.5-9 12.5z"
        fill="currentColor"/>
</svg>
```

### `duotone.svg` — Fill background + Stroke foreground

Use **two layers**: a translucent fill (secondary color) behind the stroked outline.
Mark the background layer with `opacity` and `data-color="secondary"`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <!-- Background — secondary color, translucent -->
  <path d="M12 21s-9-7.5-9-12.5C3 5.42 ..."
        fill="currentColor" opacity="0.2" data-color="secondary"/>
  <!-- Foreground — primary strokes -->
  <path d="M12 21s-9-7.5-9-12.5C3 5.42 ..."
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### `bulk.svg` — Multi-layer fills

Multiple filled layers at different opacities for a dimensional look.
Use `opacity` to distinguish layers. Group with `<g>` if needed:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 21s-9-7.5-9-12.5 ..." fill="currentColor" opacity="0.15"/>
  <path d="M16 10a4 4 0 0 0-8 0"     fill="currentColor" opacity="0.4"/>
  <path d="M8 14h8"                   stroke="currentColor" stroke-width="1.5"/>
</svg>
```

## Layer Detection Rules

The generator auto-detects layers from SVG attributes:

| SVG Attribute | Detected As |
|---------------|-------------|
| `stroke="..."` (no fill) | `strokeLayer(…, 'primary')` |
| `fill="..."` (no stroke) | `fillLayer(…, 'primary')` |
| `opacity="0.2"` | Layer opacity = 0.2 |
| `data-color="secondary"` | `colorSource: 'secondary'` |
| Filled element + `opacity < 1` in duotone | Auto-assigned `'secondary'` |

### Using `<g>` groups

Group attributes are inherited by children:

```svg
<g opacity="0.2" data-color="secondary">
  <path d="..." fill="currentColor"/>
  <circle cx="12" cy="12" r="5" fill="currentColor"/>
</g>
```

## `meta.json` (Optional)

Provides search metadata for the docs gallery and icon pickers:

```json
{
  "displayName": "Heart",
  "description": "Heart shape — love, favorite, like",
  "tags": ["love", "favorite", "like", "heart"],
  "category": "decorative",
  "addedIn": "1.1.0"
}
```

If omitted, defaults are generated from the folder name.

**Categories:** `lab`, `nature`, `fragrance`, `decorative` (or create new ones)

## Workflow

1. Designer creates SVGs following the conventions above
2. Drop folder into `svgs/` and push to `main`
3. GitHub Action runs `scripts/generate-icons.mjs`:
   - Parses SVGs → generates `packages/core/src/icons/<name>.ts`
   - Auto-generates missing variations from `outline.svg`
   - Regenerates barrel exports for core, React, and Vue
   - Updates `config/icon-metadata.json`
4. Action commits generated code and pushes
5. Docs site auto-rebuilds to include the new icon

## Figma Export Tips

1. Select the icon frame (24×24)
2. **Outline Stroke** to convert strokes to paths (for solid/bulk)
3. **Flatten Selection** to remove groups and transforms
4. Export as SVG with these settings:
   - ☑ Include "id" attribute → OFF
   - ☑ Outline text → ON
   - ☑ Flatten transforms → ON
