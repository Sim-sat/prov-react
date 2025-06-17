import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig(({ command}) => {
    if (command === 'serve') { //dev environment
        return {
            plugins: [
                react(),
                tailwindcss()],
            server: {
                proxy: {
                    '/protocol': {
                        target: 'http://localhost:8080',
                        changeOrigin: true,
                        secure: false,
                    }
                }
            }
        }
    } else {
        // build environment
        return {
            plugins: [
                react(),
                tailwindcss()],

        }
    }
})