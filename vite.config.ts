import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            include: '**/*.svg?react',
        }),
    ],
    resolve: { alias: { '@': '/src' } },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    server: {
        host: '0.0.0.0',
    },
});
