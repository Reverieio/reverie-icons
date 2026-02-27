import type { IconSet } from '../types'
import { defineIcon, path, strokeLayer, fillLayer } from '../define'

const leaf: IconSet = {
  name: 'leaf',
  displayName: 'Leaf',

  outline: defineIcon('leaf', 'outline', [
    strokeLayer([
      path('M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18'),
      path('M17 8c3-1.18 5-3 5-7-4 0-5.82 2-7 5'),
      path('M17 8C14 12 8 16 3.82 21.34'),
    ]),
  ]),

  solid: defineIcon('leaf', 'solid', [
    fillLayer([
      path('M22 2c-4.5 0-7 2.2-8.5 5C10 12.5 5.5 17 3 21.5a1 1 0 0 0 1.8.8C7 18 10 14 14 10c1.5-1.5 3.5-3 6-3.5a1 1 0 0 0 .8-.8C21.7 3.5 22 2 22 2z'),
    ]),
  ]),

  duotone: defineIcon('leaf', 'duotone', [
    fillLayer(
      [path('M22 2c-4 0-5.82 2-7 5-3.5 5.5-7 9-10.18 14.34')],
      0.2, 'secondary'
    ),
    strokeLayer([
      path('M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18'),
      path('M17 8c3-1.18 5-3 5-7-4 0-5.82 2-7 5'),
      path('M17 8C14 12 8 16 3.82 21.34'),
    ]),
  ]),

  bulk: defineIcon('leaf', 'bulk', [
    fillLayer(
      [path('M22 2c-4 0-5.82 2-7 5C11.5 12.5 7 16.5 3.82 21.34l1.89.66c2-4 6-9 10-12 1.5-1.5 3.5-3 6-3.5.5-1 .5-2.5.3-4.5z')],
      0.12
    ),
    fillLayer([path('M17 8C14 12 8 16 3.82 21.34l1.89.66L7 18')], 0.3),
    fillLayer([path('M17 8c3-1.18 5-3 5-7-4 0-5.82 2-7 5')]),
  ]),
}

export default leaf
