import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2020',
  format: ['esm', "cjs"],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  treeshake: false,
})