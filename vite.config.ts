import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'unplugin-vue-components/vite';
import visualizer from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
    vue({ reactivityTransform: true }),
    ViteComponents({
      directoryAsNamespace: true,
      resolvers: [IconsResolver({ customCollections: ['s'] })]
    }),
    visualizer({
      filename: './dist/stats.html',
      template: 'sunburst',
      gzipSize: true
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        // key as the collection name
        s: FileSystemIconLoader('./src/assets/icons', svg =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    dedupe: ['@popperjs/core']
  },
  test: {
    open: true,
    environment: 'happy-dom'
  }
});
