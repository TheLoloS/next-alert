import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2020',
  format: ['esm', "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  treeshake: false,
})