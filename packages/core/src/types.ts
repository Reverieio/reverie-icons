// ── Icon Variation Types ────────────────────────────────────────────────────

/** Supported icon style variations */
export type IconVariation = 'outline' | 'solid' | 'duotone' | 'bulk'

/** A single SVG element within an icon layer */
export interface IconElement {
  /** SVG element tag: path, circle, rect, line, polyline, polygon, ellipse */
  tag: 'path' | 'circle' | 'rect' | 'line' | 'polyline' | 'polygon' | 'ellipse'
  /** SVG attributes (d, cx, cy, r, x, y, width, height, points, etc.) */
  attrs: Record<string, string | number>
}

/**
 * A layer represents a group of SVG elements rendered together.
 * Duotone and bulk icons use multiple layers with different opacities.
 */
export interface IconLayer {
  /** Elements in this layer */
  elements: IconElement[]
  /**
   * How this layer should be colored:
   * - 'fill'   → fill={color}
   * - 'stroke' → stroke={color}, fill="none"
   */
  colorMode: 'fill' | 'stroke'
  /** Opacity for this layer (0–1). Primary layers = 1, background layers < 1 */
  opacity: number
  /**
   * Which color to use:
   * - 'primary'   → uses `color` prop
   * - 'secondary' → uses `secondaryColor` prop (falls back to `color`)
   */
  colorSource: 'primary' | 'secondary'
}

// ── Icon Definition ─────────────────────────────────────────────────────────

/**
 * Framework-agnostic icon definition.
 * Contains all the data needed to render an icon in any framework.
 */
export interface IconDefinition {
  /** Unique icon name in kebab-case, e.g. "flask" */
  name: string
  /** Style variation */
  variation: IconVariation
  /** SVG viewBox (default "0 0 24 24") */
  viewBox: string
  /** Default width/height in px */
  defaultSize: number
  /** Default strokeWidth for outline variation */
  defaultStrokeWidth: number
  /** Ordered layers to render (bottom to top) */
  layers: IconLayer[]
}

/**
 * A complete icon with all 4 variations.
 * This is what consumers look up by icon name.
 */
export interface IconSet {
  /** Icon name in kebab-case */
  name: string
  /** Display name in PascalCase */
  displayName: string
  outline: IconDefinition
  solid: IconDefinition
  duotone: IconDefinition
  bulk: IconDefinition
}

// ── Icon Metadata ───────────────────────────────────────────────────────────

/** Metadata for searching, categorizing, and documenting icons */
export interface IconMetadata {
  /** Icon name (matches IconSet.name) */
  name: string
  /** Display name */
  displayName: string
  /** Human-readable description */
  description: string
  /** Searchable tags */
  tags: string[]
  /** Category grouping */
  category: string
  /** Date added (ISO 8601) */
  addedIn: string
  /** Whether this icon is deprecated */
  deprecated?: boolean
  /** Replacement icon name if deprecated */
  replacedBy?: string
}

// ── Helper type for framework adapters ──────────────────────────────────────

/** Props that all framework wrappers should support */
export interface BaseIconProps {
  /** Icon size in pixels */
  size?: number
  /** Primary color */
  color?: string
  /** Secondary color (duotone/bulk background) */
  secondaryColor?: string
  /** Secondary layer opacity (0–1, default 0.2) */
  secondaryOpacity?: number
  /** Stroke width (outline variation only) */
  strokeWidth?: number
  /** CSS class name */
  className?: string
  /** Inline styles */
  style?: Record<string, string | number>
  /** Accessible title (adds <title> in SVG) */
  title?: string
}
