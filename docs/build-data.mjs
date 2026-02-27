#!/usr/bin/env node
/**
 * Build script — extracts icon data from the core package
 * and writes a static JSON file used by the docs gallery.
 *
 * Usage: node docs/build-data.mjs
 * Requires: packages/core must be built first (npm run build:core)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// Import the built core package
const corePkg = resolve(root, 'packages/core/dist/index.mjs')

const core = await import(corePkg)

const { iconRegistry, iconMetadata } = core

const output = {}

for (const [name, iconSet] of Object.entries(iconRegistry)) {
  const meta = iconMetadata[name] || {}
  output[name] = {
    name: iconSet.name,
    displayName: iconSet.displayName,
    description: meta.description || '',
    tags: meta.tags || [],
    category: meta.category || 'uncategorized',
    addedIn: meta.addedIn || '1.0.0',
    variations: {}
  }
  for (const variation of ['outline', 'solid', 'duotone', 'bulk']) {
    const def = iconSet[variation]
    if (def) {
      output[name].variations[variation] = {
        viewBox: def.viewBox,
        defaultSize: def.defaultSize,
        defaultStrokeWidth: def.defaultStrokeWidth,
        layers: def.layers
      }
    }
  }
}

const outPath = resolve(__dirname, 'icon-data.json')
writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log(`✅ Generated ${outPath} with ${Object.keys(output).length} icons`)
