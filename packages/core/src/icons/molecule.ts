import type { IconSet } from '../types'
import { defineIcon, circle, line, strokeLayer, fillLayer } from '../define'

const molecule: IconSet = {
  name: 'molecule',
  displayName: 'Molecule',

  outline: defineIcon('molecule', 'outline', [
    strokeLayer([
      circle(12, 12, 2.5),
      circle(5, 7, 2), circle(19, 7, 2),
      circle(5, 19, 2), circle(19, 19, 2),
      line(9.8, 10.5, 6.7, 8.5), line(14.2, 10.5, 17.3, 8.5),
      line(9.8, 13.5, 6.7, 17.5), line(14.2, 13.5, 17.3, 17.5),
    ]),
  ]),

  solid: defineIcon('molecule', 'solid', [
    fillLayer([
      circle(12, 12, 3.5),
      circle(5, 7, 2.5), circle(19, 7, 2.5),
      circle(5, 19, 2.5), circle(19, 19, 2.5),
    ]),
    strokeLayer([
      line(9.8, 10.5, 6.7, 8.5), line(14.2, 10.5, 17.3, 8.5),
      line(9.8, 13.5, 6.7, 17.5), line(14.2, 13.5, 17.3, 17.5),
    ]),
  ]),

  duotone: defineIcon('molecule', 'duotone', [
    strokeLayer([
      line(9.8, 10.5, 6.7, 8.5), line(14.2, 10.5, 17.3, 8.5),
      line(9.8, 13.5, 6.7, 17.5), line(14.2, 13.5, 17.3, 17.5),
    ], 0.2, 'secondary'),
    fillLayer([
      circle(12, 12, 3), circle(5, 7, 2.5), circle(19, 7, 2.5),
      circle(5, 19, 2.5), circle(19, 19, 2.5),
    ]),
  ]),

  bulk: defineIcon('molecule', 'bulk', [
    strokeLayer([
      line(9.8, 10.5, 6.7, 8.5), line(14.2, 10.5, 17.3, 8.5),
      line(9.8, 13.5, 6.7, 17.5), line(14.2, 13.5, 17.3, 17.5),
    ], 0.12),
    fillLayer([
      circle(5, 7, 2.5), circle(19, 7, 2.5),
      circle(5, 19, 2.5), circle(19, 19, 2.5),
    ], 0.3),
    fillLayer([circle(12, 12, 3.5)]),
  ]),
}

export default molecule
