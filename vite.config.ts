import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
import antdDayjs from 'antd-dayjs-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }),
    antdDayjs(),
    // 打包分析
    visualizer(),
    // antd 样式按需引入
    createStyleImportPlugin({
      resolves: [AntdResolve()],
    }),
  ],
  // 1. 如果使用的是ant-design 系列的 需要配置这个
  // 2. 确保less安装在依赖 `yarn add less -D`
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
});
