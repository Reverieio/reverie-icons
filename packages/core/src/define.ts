import type { IconDefinition, IconElement, IconLayer, IconVariation } from './types'

// ── Element builders (shorthand for creating SVG elements) ──────────────────

export function path(d: string, extra: Record<string, string | number> = {}): IconElement {
  return { tag: 'path', attrs: { d, ...extra } }
}

export function circle(cx: number, cy: number, r: number, extra: Record<string, string | number> = {}): IconElement {
  return { tag: 'circle', attrs: { cx, cy, r, ...extra } }
}

export function rect(x: number, y: number, w: number, h: number, extra: Record<string, string | number> = {}): IconElement {
  return { tag: 'rect', attrs: { x, y, width: w, height: h, ...extra } }
}

export function line(x1: number, y1: number, x2: number, y2: number, extra: Record<string, string | number> = {}): IconElement {
  return { tag: 'line', attrs: { x1, y1, x2, y2, ...extra } }
}

export function polyline(points: string, extra: Record<string, string | number> = {}): IconElement {
  return { tag: 'polyline', attrs: { points, ...extra } }
}

export function polygon(points: string, extra: Record<string, string | number> = {}): IconElement {
  return { tag: 'polygon', attrs: { points, ...extra } }
}

export function ellipse(cx: number, cy: number, rx: number, ry: number, extra: Record<string, string | number> = {}): IconElement {
  return { tag: 'ellipse', attrs: { cx, cy, rx, ry, ...extra } }
}

// ── Layer builders ──────────────────────────────────────────────────────────

/** Stroked layer (outline style) */
export function strokeLayer(elements: IconElement[], opacity = 1, colorSource: 'primary' | 'secondary' = 'primary'): IconLayer {
  return { elements, colorMode: 'stroke', opacity, colorSource }
}

/** Filled layer (solid/duotone/bulk style) */
export function fillLayer(elements: IconElement[], opacity = 1, colorSource: 'primary' | 'secondary' = 'primary'): IconLayer {
  return { elements, colorMode: 'fill', opacity, colorSource }
}

// ── Icon definition builder ─────────────────────────────────────────────────

export function defineIcon(
  name: string,
  variation: IconVariation,
  layers: IconLayer[],
  options: { viewBox?: string; defaultSize?: number; defaultStrokeWidth?: number } = {}
): IconDefinition {
  return {
    name,
    variation,
    viewBox: options.viewBox ?? '0 0 24 24',
    defaultSize: options.defaultSize ?? 24,
    defaultStrokeWidth: options.defaultStrokeWidth ?? 1.5,
    layers,
  }
}
