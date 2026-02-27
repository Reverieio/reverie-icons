# @reverie-icons

**Enterprise-grade, framework-agnostic icon library for fragrance & cosmetics applications.**

Built with a **core-data + adapter** architecture (same pattern as Ant Design, Lucide, Heroicons). SVG icon definitions are stored as pure data in `@reverie-icons/core`, and framework-specific rendering is handled by adapter packages.

---

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@reverie-icons/core` | Framework-agnostic icon data, types, metadata, builder API | ✅ Ready |
| `@reverie-icons/react` | React 17+ components (forwardRef, tree-shakeable) | ✅ Ready |
| `@reverie-icons/vue` | Vue 3 components (defineComponent, h()) | ✅ Ready |

## Architecture

```
           ┌─────────────────────┐
           │  @reverie-icons/core │   ← Pure data (no framework deps)
           │  - IconDefinition[]  │
           │  - Types & builders  │
           │  - Metadata / search │
           └──────────┬──────────┘
                      │
          ┌───────────┼───────────┐
          │           │           │
    ┌─────▼─────┐ ┌──▼──────┐ ┌──▼──────────┐
    │   react   │ │   vue   │ │  svelte/... │
    │ forwardRef│ │   h()   │ │  (future)   │
    │ components│ │ defineC │ │             │
    └───────────┘ └─────────┘ └─────────────┘
```

## Quick Start

### React

```bash
npm install @reverie-icons/react
```

```tsx
import { FlaskOutline, DropletDuotone, Icon } from '@reverie-icons/react'

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
npm install @reverie-icons/vue
```

```vue
<script setup>
import { FlaskOutline, Icon } from '@reverie-icons/vue'
</script>

<template>
  <FlaskOutline :size="24" color="#6A89A7" />
  <Icon name="molecule" variation="duotone" :size="28" />
</template>
```

### Core (Framework-agnostic)

```bash
npm install @reverie-icons/core
```

```ts
import { flask, getIconVariation, searchIcons } from '@reverie-icons/core'

// Access raw icon data
const outlineFlask = flask.outline
console.log(outlineFlask.viewBox)   // '0 0 24 24'
console.log(outlineFlask.layers)    // IconLayer[]

// Lookup by name
const def = getIconVariation('flask', 'duotone')

// Search icons by keyword
const results = searchIcons('science')  // ['flask', 'beaker', 'molecule', 'pipette']
```

## Icon Variations

Every icon comes in **4 variations**:

| Variation | Style | Use Case |
|-----------|-------|----------|
| `outline` | Stroked paths, no fill | Default UI, navigation |
| `solid` | Filled paths | Active states, emphasis |
| `duotone` | Primary + secondary opacity layers | Rich illustrations |
| `bulk` | Bold filled with accent elements | Dashboards, feature highlights |

## Available Icons

| Icon | Name | Category |
|------|------|----------|
| 🧪 | `flask` | laboratory |
| 💧 | `droplet` | elements |
| 🌸 | `flower` | botanical |
| ⚛️ | `molecule` | laboratory |
| 🌬️ | `scent` | fragrance |
| 🍃 | `leaf` | botanical |
| 🧫 | `beaker` | laboratory |
| 💉 | `pipette` | laboratory |
| ⚖️ | `scale` | measurement |
| 🍶 | `bottle` | packaging |
| ✨ | `sparkle` | decorative |

## Adding New Icons

### From SVG files (recommended)

Place SVG files in a folder structured as:

```
raw-svgs/
  my-icon/
    outline.svg
    solid.svg
    duotone.svg
    bulk.svg
```

Then run the generator:

```bash
node scripts/generate-from-svg.mjs ./raw-svgs
```

This creates `packages/core/src/icons/my-icon.ts` with all four variations.

### Manual (using builder API)

```ts
// packages/core/src/icons/my-icon.ts
import type { IconSet } from '../types'
import { defineIcon, path, circle, strokeLayer, fillLayer } from '../define'

const myIcon: IconSet = {
  name: 'my-icon',
  displayName: 'MyIcon',

  outline: defineIcon({
    name: 'my-icon', variation: 'outline', viewBox: '0 0 24 24',
    layers: [
      strokeLayer([path({ d: 'M12 2L2 22h20L12 2z' })])
    ],
  }),

  solid: defineIcon({
    name: 'my-icon', variation: 'solid', viewBox: '0 0 24 24',
    layers: [
      fillLayer([path({ d: 'M12 2L2 22h20L12 2z' })])
    ],
  }),

  // ... duotone, bulk
}

export default myIcon
```

Then:

1. Add to `packages/core/src/index.ts` barrel export
2. Add metadata to `packages/core/src/metadata.ts`
3. Add React/Vue named exports in the adapter `index.ts` files
4. Run `npm run build`

## Props

### React / Vue Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Width and height in px |
| `color` | `string` | `'currentColor'` | Primary color |
| `secondaryColor` | `string` | Same as `color` | Secondary layer color (duotone/bulk) |
| `secondaryOpacity` | `number` | Per-icon default | Opacity for secondary layers |
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
  layers: IconLayer[]
  defaultSize?: number
  defaultStrokeWidth?: number
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

# Build individual package
npm run build --workspace=packages/core
npm run build --workspace=packages/react
npm run build --workspace=packages/vue
```

## Publishing

```bash
# Bump versions
npm version patch --workspaces

# Publish all packages
npm publish --workspaces --access public
```

Packages are published under the `@reverie-icons` npm scope.

## Project Structure

```
reverie-icons/
├── package.json              # Monorepo root (npm workspaces)
├── tsconfig.base.json        # Shared TypeScript config
├── README.md
├── scripts/
│   └── generate-from-svg.mjs # SVG → icon definition CLI
└── packages/
    ├── core/                  # @reverie-icons/core
    │   ├── src/
    │   │   ├── types.ts       # Type system
    │   │   ├── define.ts      # Builder API (path, circle, defineIcon, etc.)
    │   │   ├── metadata.ts    # Searchable tags, categories
    │   │   ├── index.ts       # Barrel export + icon registry
    │   │   └── icons/         # One file per icon (pure data)
    │   │       ├── flask.ts
    │   │       ├── droplet.ts
    │   │       └── ...
    │   ├── tsup.config.ts
    │   └── package.json
    ├── react/                 # @reverie-icons/react
    │   ├── src/
    │   │   ├── createReactIcon.tsx
    │   │   ├── Icon.tsx       # Dynamic <Icon name="..." /> component
    │   │   └── index.ts       # 44 named exports
    │   ├── tsup.config.ts
    │   └── package.json
    └── vue/                   # @reverie-icons/vue
        ├── src/
        │   └── index.ts       # createVueIcon + 44 named exports
        ├── tsup.config.ts
        └── package.json
```

## Roadmap

- [ ] `@reverie-icons/svelte` adapter
- [ ] `@reverie-icons/web-components` adapter
- [ ] Figma plugin for exporting icons
- [ ] Interactive icon gallery website
- [ ] Animated icon variants
- [ ] Icon font generation (`.woff2`)
- [ ] VS Code icon theme extension

## License

MIT © Reverie Fragrance Co.
