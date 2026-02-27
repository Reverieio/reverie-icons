# @reverieio/icons

**Enterprise-grade, framework-agnostic icon library for fragrance & cosmetics applications.**

Built with a **core-data + adapter** architecture (same pattern as Lucide, Heroicons, Phosphor). SVG icon definitions are stored as pure data in `@reverieio/icons-core`, and framework-specific rendering is handled by adapter packages.

Published to **GitHub Packages** under the `@reverieio` scope.

**[Browse the interactive gallery →](https://reverieio.github.io/reverie-icons/)**

---

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| [`@reverieio/icons-core`](https://github.com/Reverieio/reverie-icons/pkgs/npm/icons-core) | Framework-agnostic icon data, types, metadata, builder API | ✅ Published |
| [`@reverieio/icons-react`](https://github.com/Reverieio/reverie-icons/pkgs/npm/icons-react) | React 17+ components (forwardRef, tree-shakeable) | ✅ Published |
| [`@reverieio/icons-vue`](https://github.com/Reverieio/reverie-icons/pkgs/npm/icons-vue) | Vue 3 components (defineComponent, h()) | ✅ Published |

## Architecture

```
                ┌──────────────────────────┐
                │   @reverieio/icons-core   │  ← Pure data (zero deps)
                │   - IconDefinition[]      │
                │   - Types & builders      │
                │   - Metadata / search     │
                └────────────┬─────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐  ┌────▼─────┐  ┌────▼──────────┐
        │   react    │  │   vue    │  │  svelte/...   │
        │ forwardRef │  │   h()    │  │  (future)     │
        │ components │  │ defineC  │  │               │
        └────────────┘  └──────────┘  └───────────────┘
```

## Installation

Packages are hosted on **GitHub Packages**. Configure your `.npmrc` first:

```ini
@reverieio:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

> Create a [Personal Access Token](https://github.com/settings/tokens) with `read:packages` scope.

### React

```bash
npm install @reverieio/icons-react
```

```tsx
import { FlaskOutline, DropletDuotone, Icon } from '@reverieio/icons-react'

// Named imports (tree-shakeable)
<FlaskOutline size={24} color="#6A89A7" />

// Duotone with secondary color
<DropletDuotone
  size={32}
  color="#2D3748"
  secondaryColor="#E8B4B8"
  secondaryOpacity={0.4}
/>

// Dynamic icon by name
<Icon name="molecule" variation="bulk" size={28} />
```

### Vue

```bash
npm install @reverieio/icons-vue
```

```vue
<script setup>
import { FlaskOutline, Icon } from '@reverieio/icons-vue'
</script>

<template>
  <FlaskOutline :size="24" color="#6A89A7" />
  <Icon name="molecule" variation="duotone" :size="28" />
</template>
```

### Core (Framework-agnostic)

```bash
npm install @reverieio/icons-core
```

```ts
import { flask, getIconVariation, searchIcons } from '@reverieio/icons-core'

// Access raw icon data
const outlineFlask = flask.outline
console.log(outlineFlask.viewBox)   // '0 0 24 24'
console.log(outlineFlask.layers)    // IconLayer[]

// Lookup by name
const def = getIconVariation('flask', 'duotone')

// Search icons by keyword
const results = searchIcons('science')  // matches flask, beaker, molecule, pipette
```

## Icon Variations

Every icon comes in **4 variations**:

| Variation | Style | Use Case |
|-----------|-------|----------|
| `outline` | Stroked paths, no fill | Default UI, navigation |
| `solid` | Filled paths | Active states, emphasis |
| `duotone` | Primary stroke + secondary translucent fill | Rich illustrations |
| `bulk` | Multi-layer fills at varying opacities | Dashboards, feature highlights |

## Available Icons

| Icon | Name | Category |
|------|------|----------|
| 🧪 | `flask` | lab |
| 💧 | `droplet` | nature |
| 🌸 | `flower` | nature |
| ⚛️ | `molecule` | lab |
| 🌬️ | `scent` | fragrance |
| 🍃 | `leaf` | nature |
| 🧫 | `beaker` | lab |
| 💉 | `pipette` | lab |
| ⚖️ | `scale` | lab |
| 🍶 | `bottle` | fragrance |
| ✨ | `sparkle` | decorative |

**[Browse all icons with live preview →](https://reverieio.github.io/reverie-icons/)**

---

## Adding New Icons

### Drop SVGs (recommended — fully automated)

Designers just drop SVG files and push. A GitHub Action handles the rest.

**1. Create a folder in `svgs/`:**

```
svgs/
  crown/
    outline.svg      ← required (stroked paths, 24×24)
    solid.svg        ← optional (auto-generated if missing)
    duotone.svg      ← optional (auto-generated if missing)
    bulk.svg         ← optional (auto-generated if missing)
    meta.json        ← optional (search metadata)
```

**2. SVG requirements:**

- Canvas: **24 × 24 px**, viewBox: `0 0 24 24`
- Outline: use `stroke="currentColor"` with `stroke-width="1.5"`
- Solid: use `fill="currentColor"`
- Duotone: mark background fills with `opacity="0.2" data-color="secondary"`
- Bulk: use multiple filled elements with different `opacity` values
- No `<style>` blocks, `<defs>`, `<clipPath>`, or transforms

**3. Optional `meta.json`:**

```json
{
  "displayName": "Crown",
  "description": "Royal crown — premium, VIP, luxury",
  "tags": ["royal", "premium", "vip", "luxury", "king"],
  "category": "decorative"
}
```

**4. Push to `main`.** The [generate workflow](.github/workflows/generate.yml) automatically:
  - Parses SVGs → generates `packages/core/src/icons/<name>.ts`
  - Auto-generates missing variations from `outline.svg`
  - Regenerates all barrel exports (core, React, Vue)
  - Updates `config/icon-metadata.json`
  - Builds all packages to verify
  - Commits generated code back to `main`
  - Docs gallery rebuilds automatically

> **Tip:** If you only provide `outline.svg`, the generator creates solid, duotone, and bulk automatically.

See [`svgs/README.md`](svgs/README.md) for the complete SVG convention guide and Figma export tips.

### Manual (using builder API)

For hand-crafted icons with precise layer control:

```ts
// packages/core/src/icons/crown.ts
import type { IconSet } from '../types'
import { defineIcon, path, strokeLayer, fillLayer } from '../define'

const crown: IconSet = {
  name: 'crown',
  displayName: 'Crown',

  outline: defineIcon('crown', 'outline', [
    strokeLayer([
      path('M2 8l4 12h12l4-12-5 4-5-8-5 8-5-4z'),
      path('M6 20h12'),
    ]),
  ]),

  solid: defineIcon('crown', 'solid', [
    fillLayer([
      path('M2 8l4 12h12l4-12-5 4-5-8-5 8-5-4z'),
    ]),
  ]),

  duotone: defineIcon('crown', 'duotone', [
    fillLayer([path('M2 8l4 12h12l4-12-5 4-5-8-5 8-5-4z')], 0.2, 'secondary'),
    strokeLayer([
      path('M2 8l4 12h12l4-12-5 4-5-8-5 8-5-4z'),
      path('M6 20h12'),
    ]),
  ]),

  bulk: defineIcon('crown', 'bulk', [
    fillLayer([path('M2 8l4 12h12l4-12-5 4-5-8-5 8-5-4z')], 0.15),
    strokeLayer([path('M6 20h12')]),
  ]),
}

export default crown
```

Then run `npm run generate` to regenerate all barrel exports, or register manually:

1. Add export in `packages/core/src/index.ts`
2. Add metadata in `config/icon-metadata.json`
3. Add React/Vue exports in adapter `index.ts` files
4. `npm run build`

## Props

### React / Vue Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Width and height in px |
| `color` | `string` | `'currentColor'` | Primary color |
| `secondaryColor` | `string` | Same as `color` | Secondary layer color (duotone/bulk) |
| `secondaryOpacity` | `number` | Per-icon default | Opacity override for secondary layers |
| `strokeWidth` | `number` | `1.5` | Stroke width for outline icons |
| `title` | `string` | — | Accessible title (sets `role="img"`) |

React components also accept all standard `SVGProps<SVGSVGElement>` and forward refs.

## Type System

```ts
type IconVariation = 'outline' | 'solid' | 'duotone' | 'bulk'

interface IconElement {
  tag: 'path' | 'circle' | 'rect' | 'line' | 'polyline' | 'polygon' | 'ellipse'
  attrs: Record<string, string | number>
}

interface IconLayer {
  elements: IconElement[]
  colorMode: 'stroke' | 'fill'
  opacity: number
  colorSource: 'primary' | 'secondary'
}

interface IconDefinition {
  name: string
  variation: IconVariation
  viewBox: string
  defaultSize: number
  defaultStrokeWidth: number
  layers: IconLayer[]
}

interface IconSet {
  name: string
  displayName: string
  outline: IconDefinition
  solid: IconDefinition
  duotone: IconDefinition
  bulk: IconDefinition
}
```

## Building

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Build individual packages
npm run build:core
npm run build:react
npm run build:vue

# Run the SVG → code generator
npm run generate

# Preview without writing files
npm run generate:dry

# Build docs (icon-data.json for gallery)
npm run build:docs
```

## CI/CD & Publishing

All automation is handled by GitHub Actions:

| Workflow | Trigger | Action |
|----------|---------|--------|
| [CI](.github/workflows/ci.yml) | Push / PR to `main` | Build + typecheck (Node 18/20/22 matrix) |
| [Generate](.github/workflows/generate.yml) | Push to `main` changing `svgs/**` | SVG → code, commits generated files |
| [Publish](.github/workflows/publish.yml) | `v*` tag push or manual dispatch | Publish all packages to GitHub Packages |
| [Docs](.github/workflows/docs.yml) | Push to `main` | Build docs gallery, deploy to GitHub Pages |

### Publishing a new version

```bash
git tag v1.1.0
git push --tags
```

The publish workflow bumps versions (on manual dispatch) and publishes `@reverieio/icons-core`, `@reverieio/icons-react`, and `@reverieio/icons-vue` to GitHub Packages.

## Documentation Site

An interactive gallery is deployed at **[reverieio.github.io/reverie-icons](https://reverieio.github.io/reverie-icons/)**

Features:
- Search by name, description, or tags
- Variation toggle (outline / solid / duotone / bulk)
- Live color picker (primary + secondary)
- Size slider (16–64 px)
- Category filter pills
- Click-to-copy React, Vue, and Core import snippets
- Dark / light mode

The gallery auto-rebuilds when icons are added.

## Project Structure

```
reverie-icons/
├── package.json                # Monorepo root (npm workspaces)
├── tsconfig.base.json          # Shared TypeScript config
├── .github/
│   └── workflows/
│       ├── ci.yml              # Build + typecheck matrix
│       ├── generate.yml        # SVG → code automation
│       ├── publish.yml         # Publish to GitHub Packages
│       └── docs.yml            # Deploy docs to GitHub Pages
├── svgs/                       # ← DESIGNERS DROP SVGs HERE
│   ├── README.md               # SVG conventions & format guide
│   ├── _template/              # Reference example (ignored by generator)
│   └── <icon-name>/            # One folder per icon
│       ├── outline.svg
│       ├── solid.svg
│       ├── duotone.svg
│       ├── bulk.svg
│       └── meta.json
├── scripts/
│   └── generate-icons.mjs      # SVG → TypeScript code generator
├── config/
│   └── icon-metadata.json      # Single source of truth for metadata
├── docs/
│   ├── index.html              # Interactive gallery (self-contained)
│   └── build-data.mjs          # Extracts icon data for gallery
└── packages/
    ├── core/                    # @reverieio/icons-core
    │   ├── src/
    │   │   ├── types.ts         # Type system
    │   │   ├── define.ts        # Builder API (path, circle, etc.)
    │   │   ├── metadata.ts      # Searchable tags, categories (generated)
    │   │   ├── index.ts         # Barrel export + registry (generated)
    │   │   └── icons/           # One file per icon (hand-coded or generated)
    │   ├── tsup.config.ts
    │   └── package.json
    ├── react/                   # @reverieio/icons-react
    │   ├── src/
    │   │   ├── createReactIcon.tsx
    │   │   ├── Icon.tsx         # Dynamic <Icon name="..." /> component
    │   │   └── index.ts         # Named exports (generated)
    │   ├── tsup.config.ts
    │   └── package.json
    └── vue/                     # @reverieio/icons-vue
        ├── src/
        │   └── index.ts         # createVueIcon + named exports (generated)
        ├── tsup.config.ts
        └── package.json
```

## Roadmap

- [x] Interactive icon gallery website
- [x] Automated SVG-to-code pipeline
- [x] CI/CD with GitHub Actions
- [x] Published to GitHub Packages
- [ ] `@reverieio/icons-svelte` adapter
- [ ] `@reverieio/icons-web-components` adapter
- [ ] Figma plugin for exporting icons
- [ ] Animated icon variants
- [ ] Icon font generation (`.woff2`)
- [ ] VS Code icon theme extension

## License

MIT © Reverie Fragrance Co.
