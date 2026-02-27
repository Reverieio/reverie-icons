import { forwardRef, createElement } from 'react'
import type { SVGProps, CSSProperties } from 'react'
import type { IconDefinition, IconLayer, IconElement, IconVariation } from '@reverieio/icons-core'

// ── Props ───────────────────────────────────────────────────────────────────

export interface ReverieIconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Icon size in pixels (applied to width & height) */
  size?: number
  /** Primary color (default: "currentColor") */
  color?: string
  /** Secondary color for duotone/bulk background layers (defaults to `color`) */
  secondaryColor?: string
  /** Opacity for secondary layers (default: 0.2) */
  secondaryOpacity?: number
  /** Stroke width override (outline variation only) */
  strokeWidth?: number
  /** Accessible title — adds a <title> element inside SVG */
  title?: string
}

// ── Renderer ────────────────────────────────────────────────────────────────

function renderElement(el: IconElement, key: number, layerProps: Record<string, unknown>) {
  return createElement(el.tag, { key, ...el.attrs, ...layerProps })
}

function renderLayer(
  layer: IconLayer,
  layerIndex: number,
  color: string,
  secondaryColor: string,
  strokeWidth: number
) {
  const resolvedColor = layer.colorSource === 'secondary' ? secondaryColor : color

  const layerProps: Record<string, unknown> = {}
  if (layer.colorMode === 'fill') {
    layerProps.fill = resolvedColor
    layerProps.stroke = 'none'
  } else {
    layerProps.fill = 'none'
    layerProps.stroke = resolvedColor
    layerProps.strokeWidth = strokeWidth
    layerProps.strokeLinecap = 'round'
    layerProps.strokeLinejoin = 'round'
  }
  if (layer.opacity < 1) {
    layerProps.opacity = layer.opacity
  }

  return createElement(
    'g',
    { key: `layer-${layerIndex}` },
    layer.elements.map((el, i) => renderElement(el, i, layerProps))
  )
}

// ── Factory ─────────────────────────────────────────────────────────────────

/**
 * Create a React icon component from a core IconDefinition.
 *
 * @param displayName — Component name (e.g. "FlaskOutline")
 * @param definition  — IconDefinition from @reverie-icons/core
 */
export function createReactIcon(displayName: string, definition: IconDefinition) {
  const Icon = forwardRef<SVGSVGElement, ReverieIconProps>(
    (
      {
        size = definition.defaultSize,
        color = 'currentColor',
        secondaryColor,
        secondaryOpacity,
        strokeWidth = definition.defaultStrokeWidth,
        title,
        className = '',
        style,
        ...rest
      },
      ref
    ) => {
      const secColor = secondaryColor ?? color
      // Apply secondaryOpacity override to layers that use secondary color source
      const layers = secondaryOpacity != null
        ? definition.layers.map((l) =>
            l.colorSource === 'secondary' ? { ...l, opacity: secondaryOpacity } : l
          )
        : definition.layers

      const svgStyle: CSSProperties = { flexShrink: 0, ...style }

      return createElement(
        'svg',
        {
          ref,
          xmlns: 'http://www.w3.org/2000/svg',
          width: size,
          height: size,
          viewBox: definition.viewBox,
          fill: 'none',
          className: `reverie-icon reverie-icon-${definition.variation} ${className}`.trim(),
          style: svgStyle,
          role: title ? 'img' : 'presentation',
          'aria-hidden': title ? undefined : true,
          ...rest,
        },
        title ? createElement('title', null, title) : null,
        ...layers.map((layer, i) => renderLayer(layer, i, color, secColor, strokeWidth))
      )
    }
  )

  Icon.displayName = displayName
  return Icon
}

/**
 * Create all 4 variation components for an icon set.
 * Returns { Outline, Solid, Duotone, Bulk } with proper display names.
 */
export function createReactIconSet(iconSet: import('@reverie-icons/core').IconSet) {
  const name = iconSet.displayName
  return {
    [`${name}Outline`]: createReactIcon(`${name}Outline`, iconSet.outline),
    [`${name}Solid`]: createReactIcon(`${name}Solid`, iconSet.solid),
    [`${name}Duotone`]: createReactIcon(`${name}Duotone`, iconSet.duotone),
    [`${name}Bulk`]: createReactIcon(`${name}Bulk`, iconSet.bulk),
  } as Record<string, ReturnType<typeof createReactIcon>>
}
