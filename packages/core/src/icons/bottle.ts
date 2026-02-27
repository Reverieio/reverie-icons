import type { IconSet } from '../types'
import { defineIcon, path, rect, strokeLayer, fillLayer } from '../define'

const bottle: IconSet = {
  name: 'bottle',
  displayName: 'Bottle',

  outline: defineIcon('bottle', 'outline', [
    strokeLayer([
      path('M10 2h4v3l2 2v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7l2-2V2z'),
      path('M8 14h8'),
    ]),
  ]),

  solid: defineIcon('bottle', 'solid', [
    fillLayer([
      path('M9 1a1 1 0 0 0 0 2h1v2.3L7.5 7.8A1 1 0 0 0 7 8.5V20a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V8.5a1 1 0 0 0-.5-.7L14 5.3V3h1a1 1 0 1 0 0-2H9z'),
    ]),
  ]),

  duotone: defineIcon('bottle', 'duotone', [
    fillLayer(
      [path('M10 2h4v3l2 2v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7l2-2V2z')],
      0.2, 'secondary'
    ),
    strokeLayer([
      path('M10 2h4v3l2 2v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7l2-2V2z'),
      path('M8 14h8'),
    ]),
  ]),

  bulk: defineIcon('bottle', 'bulk', [
    fillLayer([path('M10 2h4v3l2 2v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7l2-2V2z')], 0.12),
    fillLayer([path('M8 14h8v6a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-6z')], 0.3),
    fillLayer([rect(10, 2, 4, 3)]),
  ]),
}

export default bottle
