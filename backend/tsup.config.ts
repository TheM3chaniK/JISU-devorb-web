import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],     
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: [
    'fs',
    'path',
    'url',
    'os',
    'http',
    'https',
    'stream',
    'dotenv'            
  ],
});

