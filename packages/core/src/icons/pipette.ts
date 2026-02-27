import type { IconSet } from '../types'
import { defineIcon, path, strokeLayer, fillLayer } from '../define'

const pipette: IconSet = {
  name: 'pipette',
  displayName: 'Pipette',

  outline: defineIcon('pipette', 'outline', [
    strokeLayer([
      path('M2 22l1-1h3l9-9'),
      path('M3 21l9-9'),
      path('M14.5 5.5L18 2l4 4-3.5 3.5'),
      path('M12 8l4 4'),
    ]),
  ]),

  solid: defineIcon('pipette', 'solid', [
    fillLayer([
      path('M18.4 1.3a1 1 0 0 1 1.4 0l2.9 2.9a1 1 0 0 1 0 1.4l-3.2 3.2-1.1 1.1-4.2-4.2 1.1-1.1 3.1-3.3zm-5.6 5.6l4.2 4.2-7.5 7.5A1 1 0 0 1 8.8 19H5.5a1 1 0 0 1-.7-.3l-2.5-2.5a1 1 0 0 1 0-1.4l10.5-7.9z'),
    ]),
  ]),

  duotone: defineIcon('pipette', 'duotone', [
    fillLayer(
      [path('M3 17l6-6 4 4-6 6H3v-4z')],
      0.2, 'secondary'
    ),
    strokeLayer([
      path('M2 22l1-1h3l9-9'),
      path('M3 21l9-9'),
      path('M14.5 5.5L18 2l4 4-3.5 3.5'),
      path('M12 8l4 4'),
    ]),
  ]),

  bulk: defineIcon('pipette', 'bulk', [
    fillLayer([path('M2 22l1-1h3l9-9-4-4-9 9v3l0 2z')], 0.12),
    strokeLayer([path('M6 17l6-6')], 0.3),
    fillLayer([path('M16 1l6 6-3.5 3.5-6-6L16 1z')]),
  ]),
}

export default pipette
