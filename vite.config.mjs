import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(root, 'src');

const srcAliases = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    find: new RegExp(`^${entry.name}(/|$)`),
    replacement: path.join(srcDir, entry.name) + '$1',
  }));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: srcAliases,
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    assetsDir: 'static',
    sourcemap: false,
    rolldownOptions: {
      output: {
        entryFileNames: 'static/js/[name].[hash].js',
        chunkFileNames: 'static/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? '';

          if (name.endsWith('.css')) {
            return 'static/css/[name].[hash][extname]';
          }

          return 'static/media/[name].[hash][extname]';
        },
      },
    },
  },
});
