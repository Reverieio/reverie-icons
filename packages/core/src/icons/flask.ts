import type { IconSet } from '../types'
import { defineIcon, path, strokeLayer, fillLayer } from '../define'

const flask: IconSet = {
  name: 'flask',
  displayName: 'Flask',

  outline: defineIcon('flask', 'outline', [
    strokeLayer([
      path('M9 3h6'),
      path('M10 3v7.4L4.6 19.2A1.5 1.5 0 0 0 5.9 21h12.2a1.5 1.5 0 0 0 1.3-1.8L14 10.4V3'),
      path('M8.5 14h7'),
    ]),
  ]),

  solid: defineIcon('flask', 'solid', [
    fillLayer([
      path('M9 2a1 1 0 0 0 0 2h.5v6.18L4.03 19.1A2 2 0 0 0 5.76 22h12.48a2 2 0 0 0 1.73-2.9L14.5 10.18V4H15a1 1 0 1 0 0-2H9z'),
    ]),
  ]),

  duotone: defineIcon('flask', 'duotone', [
    // Background — flask body (translucent)
    fillLayer(
      [path('M4.6 19.2L10 10.4V3h4v7.4l5.4 8.8a1.5 1.5 0 0 1-1.3 2.3H5.9a1.5 1.5 0 0 1-1.3-2.3z')],
      0.2, 'secondary'
    ),
    // Foreground — strokes
    strokeLayer([
      path('M9 3h6'),
      path('M10 3v7.4L4.6 19.2A1.5 1.5 0 0 0 5.9 21h12.2a1.5 1.5 0 0 0 1.3-1.8L14 10.4V3'),
      path('M8.5 14h7'),
    ]),
  ]),

  bulk: defineIcon('flask', 'bulk', [
    // Layer 1 — lightest
    fillLayer(
      [path('M4.6 19.2L10 10.4V3h4v7.4l5.4 8.8a1.5 1.5 0 0 1-1.3 2.3H5.9a1.5 1.5 0 0 1-1.3-2.3z')],
      0.12
    ),
    // Layer 2 — liquid
    fillLayer(
      [path('M8.5 14L4.6 19.2A1.5 1.5 0 0 0 5.9 21h12.2a1.5 1.5 0 0 0 1.3-1.8L15.5 14H8.5z')],
      0.3
    ),
    // Layer 3 — neck and line
    strokeLayer([path('M9 3h6')], 1),
    strokeLayer([path('M8.5 14h7')], 1),
  ]),
}

export default flask
