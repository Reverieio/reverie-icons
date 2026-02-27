#!/usr/bin/env node

/**
 * generate-from-svg.mjs
 *
 * CLI to convert SVG files into @reverie-icons/core icon definition modules.
 *
 * Usage:
 *   node scripts/generate-from-svg.mjs <svg-dir-or-file> [--out <dir>] [--variation <outline|solid|duotone|bulk>] [--overwrite]
 *
 * Examples:
 *   # Generate all SVGs from a folder as outline icons
 *   node scripts/generate-from-svg.mjs ./raw-svgs --variation outline
 *
 *   # Generate a single icon file in all variations from a folder structure
 *   node scripts/generate-from-svg.mjs ./raw-svgs/flask/
 *     ├── outline.svg
 *     ├── solid.svg
 *     ├── duotone.svg
 *     └── bulk.svg
 *
 *   # Overwrite existing files
 *   node scripts/generate-from-svg.mjs ./raw-svgs --overwrite
 *
 * Folder structure conventions:
 *   1. Flat mode: <dir>/<icon-name>.svg → generates single-variation icon
 *   2. Nested mode: <dir>/<icon-name>/{outline,solid,duotone,bulk}.svg → generates full IconSet
 *
 * The generated .ts files are ready for packages/core/src/icons/
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'fs'
import { resolve, basename, dirname, extname, join } from 'path'
import { parseArgs } from 'util'

// ── CLI args ────────────────────────────────────────────────────────────────

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: 'string', default: '' },
    variation: { type: 'string', default: '' },
    overwrite: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
})

if (values.help || positionals.length === 0) {
  console.log(`
Usage: generate-from-svg.mjs <svg-dir-or-file> [options]

Options:
  --out <dir>               Output directory (default: packages/core/src/icons/)
  --variation <variation>   Force variation for flat SVG files (outline|solid|duotone|bulk)
  --overwrite               Overwrite existing icon files
  -h, --help                Show this help
`)
  process.exit(0)
}

const SCRIPT_DIR = dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'))
const ROOT = resolve(SCRIPT_DIR, '..')
const DEFAULT_OUT = resolve(ROOT, 'packages/core/src/icons')
const outDir = values.out ? resolve(values.out) : DEFAULT_OUT
const inputPath = resolve(positionals[0])
const VARIATIONS = ['outline', 'solid', 'duotone', 'bulk']

// ── SVG Parser (lightweight, no dependencies) ───────────────────────────────

/**
 * Parses an SVG string and extracts the viewBox and renderable elements.
 * Handles <path>, <circle>, <rect>, <line>, <polyline>, <polygon>, <ellipse>.
 * Skips <defs>, <clipPath>, <mask>, <style>, <title>, <desc>.
 */
function parseSVG(svgString) {
  // Extract viewBox
  const viewBoxMatch = svgString.match(/viewBox=["']([^"']+)["']/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'

  // Supported element tags
  const supportedTags = ['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse']
  const skipTags = ['defs', 'clipPath', 'mask', 'style', 'title', 'desc', 'metadata', 'linearGradient', 'radialGradient', 'pattern']

  const layers = []
  let currentElements = []

  // State: track if we're inside a skip block
  let skipDepth = 0

  // Simple regex-based element extraction
  // Match self-closing and open tags for supported elements
  const tagRegex = /<(\/?)(\w+)([^>]*?)(\/?)>/g
  let match

  // We'll collect all elements and group them into layers based on their fill/stroke pattern.
  const allElements = []

  while ((match = tagRegex.exec(svgString)) !== null) {
    const [, isClosing, tagName, attrsStr, isSelfClosing] = match
    const lowerTag = tagName.toLowerCase()

    if (isClosing) {
      if (skipTags.includes(lowerTag)) skipDepth = Math.max(0, skipDepth - 1)
      continue
    }
    if (skipTags.includes(lowerTag)) {
      if (!isSelfClosing) skipDepth++
      continue
    }
    if (skipDepth > 0) continue
    if (!supportedTags.includes(lowerTag)) continue

    // Parse attributes
    const attrs = {}
    const attrRegex = /(\w[\w-]*)=["']([^"']*?)["']/g
    let attrMatch
    while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
      let [, key, val] = attrMatch
      // Convert common SVG attributes
      attrs[key] = val
    }

    // Determine fill/stroke classification
    const hasFill = attrs.fill && attrs.fill !== 'none'
    const hasStroke = attrs.stroke && attrs.stroke !== 'none'
    const colorMode = hasFill ? 'fill' : hasStroke ? 'stroke' : 'fill'

    // Clean attrs: remove fill, stroke, stroke-width, opacity (these are controlled by the layer)
    const cleanAttrs = { ...attrs }
    const opacity = parseFloat(attrs.opacity ?? '1')
    delete cleanAttrs.fill
    delete cleanAttrs.stroke
    delete cleanAttrs['stroke-width']
    delete cleanAttrs['stroke-linecap']
    delete cleanAttrs['stroke-linejoin']
    delete cleanAttrs.opacity
    delete cleanAttrs.class
    delete cleanAttrs.style

    allElements.push({
      tag: lowerTag,
      attrs: cleanAttrs,
      colorMode,
      opacity: isNaN(opacity) ? 1 : opacity,
      isSecondary: opacity < 1 || (attrs.fill && attrs.fill !== 'none' && attrs.opacity && parseFloat(attrs.opacity) < 1),
    })
  }

  // Group elements into layers by (colorMode, opacity, isSecondary)
  const layerGroups = new Map()
  for (const el of allElements) {
    const key = `${el.colorMode}|${el.opacity}|${el.isSecondary}`
    if (!layerGroups.has(key)) {
      layerGroups.set(key, {
        elements: [],
        colorMode: el.colorMode,
        opacity: el.opacity,
        colorSource: el.isSecondary ? 'secondary' : 'primary',
      })
    }
    layerGroups.get(key).elements.push({ tag: el.tag, attrs: el.attrs })
  }

  for (const [, group] of layerGroups) {
    layers.push({
      elements: group.elements,
      colorMode: group.colorMode,
      opacity: group.opacity,
      colorSource: group.colorSource,
    })
  }

  return { viewBox, layers }
}

// ── Code generator ──────────────────────────────────────────────────────────

function attrsToString(attrs) {
  const entries = Object.entries(attrs)
  if (entries.length === 0) return '{}'
  const lines = entries.map(([k, v]) => `          '${k}': '${v}'`)
  return `{\n${lines.join(',\n')}\n        }`
}

function layerToString(layer) {
  const elements = layer.elements
    .map(
      (el) => `      { tag: '${el.tag}', attrs: ${attrsToString(el.attrs)} }`
    )
    .join(',\n')

  return `    {
      elements: [
${elements}
      ],
      colorMode: '${layer.colorMode}',
      opacity: ${layer.opacity},
      colorSource: '${layer.colorSource}',
    }`
}

function variationToString(name, variation, parsed) {
  const layers = parsed.layers.map(layerToString).join(',\n')

  return `  ${variation}: defineIcon({
    name: '${name}',
    variation: '${variation}',
    viewBox: '${parsed.viewBox}',
    layers: [
${layers}
    ],
  })`
}

function generateIconModule(iconName, variations) {
  const displayName = iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-(\w)/g, (_, c) => c.toUpperCase())

  const variationEntries = Object.entries(variations)
    .map(([variation, parsed]) => variationToString(iconName, variation, parsed))
    .join(',\n\n')

  return `import type { IconSet } from '../types'
import { defineIcon } from '../define'

const ${iconName}: IconSet = {
  name: '${iconName}',
  displayName: '${displayName}',

${variationEntries},
}

export default ${iconName}
`
}

// ── File discovery ──────────────────────────────────────────────────────────

function discoverIcons(inputPath) {
  const icons = new Map() // name → { variation: svgContent }

  const stat = statSync(inputPath)

  if (stat.isFile() && extname(inputPath) === '.svg') {
    // Single file mode
    const name = basename(inputPath, '.svg').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const variation = values.variation || 'outline'
    icons.set(name, { [variation]: readFileSync(inputPath, 'utf-8') })
    return icons
  }

  if (!stat.isDirectory()) {
    console.error(`Error: ${inputPath} is not a file or directory`)
    process.exit(1)
  }

  const entries = readdirSync(inputPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(inputPath, entry.name)

    if (entry.isDirectory()) {
      // Nested mode: directory name = icon name, files inside = variations
      const iconName = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const variationFiles = readdirSync(fullPath).filter((f) => f.endsWith('.svg'))
      const variationMap = {}

      for (const vf of variationFiles) {
        const vName = basename(vf, '.svg').toLowerCase()
        if (VARIATIONS.includes(vName)) {
          variationMap[vName] = readFileSync(join(fullPath, vf), 'utf-8')
        } else {
          console.warn(`  Warning: Skipping ${vf} — not a known variation (${VARIATIONS.join(', ')})`)
        }
      }

      if (Object.keys(variationMap).length > 0) {
        icons.set(iconName, variationMap)
      }
    } else if (entry.isFile() && entry.name.endsWith('.svg')) {
      // Flat mode: file name = icon name
      const iconName = basename(entry.name, '.svg').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const variation = values.variation || 'outline'
      icons.set(iconName, { [variation]: readFileSync(fullPath, 'utf-8') })
    }
  }

  return icons
}

// ── Main ────────────────────────────────────────────────────────────────────

function main() {
  console.log('🎨 Reverie Icons — SVG → Icon Definition Generator\n')

  if (!existsSync(inputPath)) {
    console.error(`Error: Input path does not exist: ${inputPath}`)
    process.exit(1)
  }

  const icons = discoverIcons(inputPath)

  if (icons.size === 0) {
    console.error('No SVG files found.')
    process.exit(1)
  }

  console.log(`Found ${icons.size} icon(s) to generate:\n`)

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true })
    console.log(`Created output directory: ${outDir}\n`)
  }

  let created = 0
  let skipped = 0

  for (const [name, variationMap] of icons) {
    const outFile = join(outDir, `${name}.ts`)

    if (existsSync(outFile) && !values.overwrite) {
      console.log(`  SKIP  ${name}.ts (exists, use --overwrite to replace)`)
      skipped++
      continue
    }

    // Parse each SVG variation
    const parsed = {}
    for (const [variation, svgContent] of Object.entries(variationMap)) {
      parsed[variation] = parseSVG(svgContent)
    }

    // If we only have one variation, duplicate it for all four (user can refine later)
    if (Object.keys(parsed).length === 1) {
      const [singleVar, singleParsed] = Object.entries(parsed)[0]
      for (const v of VARIATIONS) {
        if (!parsed[v]) parsed[v] = singleParsed
      }
      console.log(`  NOTE  ${name}: Only ${singleVar} SVG provided — duplicated to all 4 variations`)
    }

    const moduleCode = generateIconModule(name, parsed)
    writeFileSync(outFile, moduleCode, 'utf-8')
    console.log(`  CREATE  ${name}.ts (${Object.keys(variationMap).length} variation(s) from SVG)`)
    created++
  }

  console.log(`\n✅ Done: ${created} created, ${skipped} skipped`)
  console.log(`\nOutput: ${outDir}`)

  if (created > 0) {
    console.log(`
Next steps:
  1. Review generated files in ${outDir}
  2. Add the icon(s) to packages/core/src/index.ts barrel export
  3. Add metadata to packages/core/src/metadata.ts
  4. Run: npm run build  (from monorepo root)
`)
  }
}

main()
