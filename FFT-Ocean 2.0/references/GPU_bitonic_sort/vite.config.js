import restart from 'vite-plugin-restart'
import glsl from 'vite-plugin-glsl'
import { defineConfig } from 'vite';
import topLevelAwait from "vite-plugin-top-level-await";

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    esbuild: {
        target: 'esnext'  // Ensures latest JavaScript features, including top-level await, are supported
    },
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    plugins:
        [
            restart({ restart: ['../static/**',] }), // Restart server on static file change
            glsl(), // Handle shader files
            topLevelAwait({
                // The export name of top-level await promise for each chunk module
                promiseExportName: "__tla",
                // The function to generate import names of top-level await promise in each chunk module
                promiseImportName: i => `__tla_${i}`
            })
        ]
}