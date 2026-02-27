import type { IconSet } from '../types'
import { defineIcon, path, rect, strokeLayer, fillLayer } from '../define'

const beaker: IconSet = {
  name: 'beaker',
  displayName: 'Beaker',

  outline: defineIcon('beaker', 'outline', [
    strokeLayer([
      path('M4.5 3h15'),
      path('M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3'),
      path('M6 14h12'),
    ]),
  ]),

  solid: defineIcon('beaker', 'solid', [
    fillLayer([
      path('M4 2a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4h1a1 1 0 1 0 0-2H4zm3 12V4h10v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z'),
    ]),
  ]),

  duotone: defineIcon('beaker', 'duotone', [
    fillLayer([rect(6, 3, 12, 16, { rx: 2 })], 0.2, 'secondary'),
    strokeLayer([
      path('M4.5 3h15'),
      path('M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3'),
      path('M6 14h12'),
    ]),
  ]),

  bulk: defineIcon('beaker', 'bulk', [
    fillLayer([rect(6, 3, 12, 18, { rx: 2 })], 0.12),
    fillLayer([rect(6, 14, 12, 7, { rx: 1 })], 0.3),
    strokeLayer([path('M4.5 3h15')]),
  ]),
}

export default beaker
