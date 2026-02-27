import type { IconSet } from '../types'
import { defineIcon, path, strokeLayer, fillLayer, circle } from '../define'

const droplet: IconSet = {
  name: 'droplet',
  displayName: 'Droplet',

  outline: defineIcon('droplet', 'outline', [
    strokeLayer([path('M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z')]),
  ]),

  solid: defineIcon('droplet', 'solid', [
    fillLayer([path('M12 1.28a1 1 0 0 1 .71.3l5.65 5.65a9 9 0 1 1-12.72 0l5.65-5.65a1 1 0 0 1 .71-.3z')]),
  ]),

  duotone: defineIcon('droplet', 'duotone', [
    fillLayer([path('M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z')], 0.2, 'secondary'),
    strokeLayer([path('M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z')]),
  ]),

  bulk: defineIcon('droplet', 'bulk', [
    fillLayer([path('M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z')], 0.12),
    fillLayer([path('M12 10a5.5 5.5 0 0 0-5.5 5.5 5.5 5.5 0 0 0 11 0A5.5 5.5 0 0 0 12 10z')], 0.3),
    fillLayer([circle(10, 14, 1.5)]),
  ]),
}

export default droplet
