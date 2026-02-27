import type { IconSet } from '../types'
import { defineIcon, path, circle, strokeLayer, fillLayer } from '../define'

const scent: IconSet = {
  name: 'scent',
  displayName: 'Scent',

  outline: defineIcon('scent', 'outline', [
    strokeLayer([
      path('M12 2C8 2 5 5.5 5 9c0 2.5 1.5 4.5 3.5 5.5L8 22h8l-.5-7.5C17.5 13.5 19 11.5 19 9c0-3.5-3-7-7-7z'),
      path('M10 13c0 1.1.9 2 2 2s2-.9 2-2'),
    ]),
  ]),

  solid: defineIcon('scent', 'solid', [
    fillLayer([
      path('M12 1C7.5 1 4 5 4 9c0 3 1.8 5.3 4 6.3L7.5 22a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1l-.5-6.7C18.2 14.3 20 12 20 9c0-4-3.5-8-8-8z'),
    ]),
  ]),

  duotone: defineIcon('scent', 'duotone', [
    fillLayer(
      [path('M12 2C8 2 5 5.5 5 9c0 2.5 1.5 4.5 3.5 5.5L8 22h8l-.5-7.5C17.5 13.5 19 11.5 19 9c0-3.5-3-7-7-7z')],
      0.2, 'secondary'
    ),
    strokeLayer([
      path('M12 2C8 2 5 5.5 5 9c0 2.5 1.5 4.5 3.5 5.5L8 22h8l-.5-7.5C17.5 13.5 19 11.5 19 9c0-3.5-3-7-7-7z'),
      path('M10 13c0 1.1.9 2 2 2s2-.9 2-2'),
    ]),
  ]),

  bulk: defineIcon('scent', 'bulk', [
    fillLayer(
      [path('M12 2C8 2 5 5.5 5 9c0 2.5 1.5 4.5 3.5 5.5L8 22h8l-.5-7.5C17.5 13.5 19 11.5 19 9c0-3.5-3-7-7-7z')],
      0.12
    ),
    fillLayer([path('M8 14.5L8 22h8l-.5-7.5z')], 0.3),
    fillLayer([circle(12, 9, 3)]),
  ]),
}

export default scent
