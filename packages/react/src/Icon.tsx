import { forwardRef } from 'react'
import { iconRegistry } from '@reverieio/icons-core'
import type { IconVariation } from '@reverieio/icons-core'
import { createReactIcon, type ReverieIconProps } from './createReactIcon'

export interface DynamicIconProps extends ReverieIconProps {
  /** Icon name (kebab-case), e.g. "flask", "droplet" */
  name: string
  /** Variation to render */
  variation?: IconVariation
}

/**
 * Dynamic icon component — render any icon by name at runtime.
 *
 * Useful for icon pickers, data-driven UIs, and CMS integrations
 * where the icon name comes from a database or API.
 *
 * @example
 *   <Icon name="flask" variation="duotone" size={24} color="#6A89A7" />
 */
const Icon = forwardRef<SVGSVGElement, DynamicIconProps>(
  ({ name, variation = 'outline', ...props }, ref) => {
    const iconSet = iconRegistry[name]
    if (!iconSet) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[@reverie-icons/react] Unknown icon: "${name}". Available: ${Object.keys(iconRegistry).join(', ')}`)
      }
      return null
    }

    const definition = iconSet[variation]
    const Component = createReactIcon(`${iconSet.displayName}${variation.charAt(0).toUpperCase() + variation.slice(1)}`, definition)
    return <Component ref={ref} {...props} />
  }
)

Icon.displayName = 'ReverieIcon'
export default Icon
