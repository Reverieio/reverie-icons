import type { IconSet } from '../types'
import { defineIcon, path, circle, strokeLayer, fillLayer } from '../define'

const sparkle: IconSet = {
  name: 'sparkle',
  displayName: 'Sparkle',

  outline: defineIcon('sparkle', 'outline', [
    strokeLayer([
      path('M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z'),
    ]),
  ]),

  solid: defineIcon('sparkle', 'solid', [
    fillLayer([
      path('M12 1a1 1 0 0 1 .95.68l2.04 6.13 6.13 2.04a1 1 0 0 1 0 1.9l-6.13 2.04-2.04 6.13a1 1 0 0 1-1.9 0l-2.04-6.13-6.13-2.04a1 1 0 0 1 0-1.9l6.13-2.04 2.04-6.13A1 1 0 0 1 12 1z'),
    ]),
  ]),

  duotone: defineIcon('sparkle', 'duotone', [
    fillLayer(
      [path('M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z')],
      0.2, 'secondary'
    ),
    strokeLayer([
      path('M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z'),
    ]),
  ]),

  bulk: defineIcon('sparkle', 'bulk', [
    fillLayer(
      [path('M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z')],
      0.12
    ),
    fillLayer(
      [path('M12 6l1.5 4.5L18 12l-4.5 1.5L12 18l-1.5-4.5L6 12l4.5-1.5L12 6z')],
      0.3
    ),
    fillLayer([circle(12, 12, 2)]),
  ]),
}

export default sparkle
