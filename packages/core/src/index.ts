/**
 * @reverie-icons/core
 *
 * Framework-agnostic SVG icon data.
 * This package contains pure data — no framework dependencies.
 *
 * Use this package directly to:
 *  - Build your own rendering layer for any framework
 *  - Generate SVG files or sprites
 *  - Access icon metadata for search/documentation
 *
 * For React components, use @reverie-icons/react instead.
 */

// ── Types ───────────────────────────────────────────────────────────────────
export type {
  IconVariation,
  IconElement,
  IconLayer,
  IconDefinition,
  IconSet,
  IconMetadata,
  BaseIconProps,
} from './types'

// ── Builders (for creating custom icons) ────────────────────────────────────
export {
  path,
  circle,
  rect,
  line,
  polyline,
  polygon,
  ellipse,
  strokeLayer,
  fillLayer,
  defineIcon,
} from './define'

// ── Icon data ───────────────────────────────────────────────────────────────
export { default as flask } from './icons/flask'
export { default as droplet } from './icons/droplet'
export { default as flower } from './icons/flower'
export { default as molecule } from './icons/molecule'
export { default as scent } from './icons/scent'
export { default as leaf } from './icons/leaf'
export { default as beaker } from './icons/beaker'
export { default as pipette } from './icons/pipette'
export { default as scale } from './icons/scale'
export { default as bottle } from './icons/bottle'
export { default as sparkle } from './icons/sparkle'

// ── Registry (all icons in one map) ─────────────────────────────────────────
import type { IconSet } from './types'

import _flask from './icons/flask'
import _droplet from './icons/droplet'
import _flower from './icons/flower'
import _molecule from './icons/molecule'
import _scent from './icons/scent'
import _leaf from './icons/leaf'
import _beaker from './icons/beaker'
import _pipette from './icons/pipette'
import _scale from './icons/scale'
import _bottle from './icons/bottle'
import _sparkle from './icons/sparkle'

/** Complete registry of all icons, keyed by name */
export const iconRegistry: Record<string, IconSet> = {
  flask: _flask,
  droplet: _droplet,
  flower: _flower,
  molecule: _molecule,
  scent: _scent,
  leaf: _leaf,
  beaker: _beaker,
  pipette: _pipette,
  scale: _scale,
  bottle: _bottle,
  sparkle: _sparkle,
}

/** Get an icon set by name (returns undefined if not found) */
export function getIcon(name: string): IconSet | undefined {
  return iconRegistry[name]
}

/** Get a specific variation of an icon */
export function getIconVariation(name: string, variation: 'outline' | 'solid' | 'duotone' | 'bulk'): import('./types').IconDefinition | undefined {
  return iconRegistry[name]?.[variation]
}

// ── Metadata re-exports ─────────────────────────────────────────────────────
export { iconMetadata, searchIcons, getIconsByCategory, getIconNames, iconCategories } from './metadata'
export type { IconCategory } from './metadata'
