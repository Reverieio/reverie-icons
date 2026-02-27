import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    metadata: 'src/metadata.ts',
    // Each icon gets its own entry for maximum tree-shaking
    'icons/flask': 'src/icons/flask.ts',
    'icons/droplet': 'src/icons/droplet.ts',
    'icons/flower': 'src/icons/flower.ts',
    'icons/molecule': 'src/icons/molecule.ts',
    'icons/scent': 'src/icons/scent.ts',
    'icons/leaf': 'src/icons/leaf.ts',
    'icons/beaker': 'src/icons/beaker.ts',
    'icons/pipette': 'src/icons/pipette.ts',
    'icons/scale': 'src/icons/scale.ts',
    'icons/bottle': 'src/icons/bottle.ts',
    'icons/sparkle': 'src/icons/sparkle.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  sourcemap: true,
  minify: false,
  outExtension({ format }) {
    return { js: format === 'esm' ? '.mjs' : '.cjs' }
  },
})
