import type { IconSet } from '../types'
import { defineIcon, path, circle, strokeLayer, fillLayer } from '../define'

const flower: IconSet = {
  name: 'flower',
  displayName: 'Flower',

  outline: defineIcon('flower', 'outline', [
    strokeLayer([
      circle(12, 12, 3),
      path('M12 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6z'),
      path('M19.07 4.93a3 3 0 0 0-4.24 4.24 3 3 0 0 0 4.24-4.24z'),
      path('M22 12a3 3 0 0 0-6 0 3 3 0 0 0 6 0z'),
      path('M19.07 19.07a3 3 0 0 0-4.24-4.24 3 3 0 0 0 4.24 4.24z'),
      path('M12 22a3 3 0 0 0 0-6 3 3 0 0 0 0 6z'),
      path('M4.93 19.07a3 3 0 0 0 4.24-4.24 3 3 0 0 0-4.24 4.24z'),
      path('M2 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0z'),
      path('M4.93 4.93a3 3 0 0 0 4.24 4.24A3 3 0 0 0 4.93 4.93z'),
    ]),
  ]),

  solid: defineIcon('flower', 'solid', [
    fillLayer([
      circle(12, 4.5, 3.5), circle(17.3, 7, 3.5), circle(19.5, 12, 3.5),
      circle(17.3, 17, 3.5), circle(12, 19.5, 3.5), circle(6.7, 17, 3.5),
      circle(4.5, 12, 3.5), circle(6.7, 7, 3.5), circle(12, 12, 4),
    ]),
  ]),

  duotone: defineIcon('flower', 'duotone', [
    fillLayer([
      circle(12, 4.5, 3.5), circle(17.3, 7, 3.5), circle(19.5, 12, 3.5),
      circle(17.3, 17, 3.5), circle(12, 19.5, 3.5), circle(6.7, 17, 3.5),
      circle(4.5, 12, 3.5), circle(6.7, 7, 3.5),
    ], 0.2, 'secondary'),
    fillLayer([circle(12, 12, 4)]),
  ]),

  bulk: defineIcon('flower', 'bulk', [
    fillLayer([
      circle(12, 4.5, 3.5), circle(17.3, 7, 3.5), circle(19.5, 12, 3.5),
      circle(17.3, 17, 3.5), circle(12, 19.5, 3.5), circle(6.7, 17, 3.5),
      circle(4.5, 12, 3.5), circle(6.7, 7, 3.5),
    ], 0.12),
    fillLayer([circle(12, 12, 5)], 0.3),
    fillLayer([circle(12, 12, 2.5)]),
  ]),
}

export default flower
