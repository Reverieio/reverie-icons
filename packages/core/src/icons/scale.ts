import type { IconSet } from '../types'
import { defineIcon, path, circle, strokeLayer, fillLayer } from '../define'

const scale: IconSet = {
  name: 'scale',
  displayName: 'Scale',

  outline: defineIcon('scale', 'outline', [
    strokeLayer([
      path('M12 3v17'),
      path('M5 21h14'),
      path('M3 7l4 8h2l4-8'),
      path('M11 7l4 8h2l4-8'),
      path('M12 3l-9 4'),
      path('M12 3l9 4'),
    ]),
  ]),

  solid: defineIcon('scale', 'solid', [
    fillLayer([
      path('M12 2a1 1 0 0 1 .92.61l.08.2L21.38 6a1 1 0 0 1 .55 1.15l-.04.13-3.5 8a1 1 0 0 1-.84.6L17 15.9h-2a1 1 0 0 1-.92-.61l-.04-.13-2-5V20h4a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3V10.16l-2 5a1 1 0 0 1-.8.72L8 15.9H6a1 1 0 0 1-.92-.61l-.04-.13-3-8a1 1 0 0 1 .42-1.2l.13-.07L11 3.2V2z'),
    ]),
  ]),

  duotone: defineIcon('scale', 'duotone', [
    fillLayer([path('M3 7l4 8h2l4-8z'), path('M11 7l4 8h2l4-8z')], 0.2, 'secondary'),
    strokeLayer([
      path('M12 3v17'), path('M5 21h14'),
      path('M3 7l4 8h2l4-8'), path('M11 7l4 8h2l4-8'),
      path('M12 3l-9 4'), path('M12 3l9 4'),
    ]),
  ]),

  bulk: defineIcon('scale', 'bulk', [
    fillLayer([path('M3 7l4 8h2l4-8z'), path('M11 7l4 8h2l4-8z')], 0.12),
    strokeLayer([path('M12 3v17'), path('M5 21h14')], 0.3),
    fillLayer([circle(3, 7, 1.5), circle(21, 7, 1.5), circle(12, 3, 2)]),
  ]),
}

export default scale
