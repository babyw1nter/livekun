import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue(),
    eslint({
      cache: true
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/typings/auto-imports.d.ts'
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      resolvers: [
        AntDesignVueResolver({ importStyle: 'less', resolveIcons: true }),
        IconsResolver(),
        (componentName) => {
          return componentName === 'ColorPicker' ? { name: 'ColorPicker', from: 'vue3-colorpicker' } : undefined
        }
      ],
      allowOverrides: true
    }),
    Icons({
      compiler: 'vue3'
    })
  ]
})
