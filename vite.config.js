import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import legacy from "@vitejs/plugin-legacy";

import postcssPresetEnv from "postcss-preset-env";

export default defineConfig({
    plugins: [
        createVuePlugin(),
        legacy({
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        }),
    ],
    base: "./",
    build: {
        outDir: "./build",
    },
    css: {
        postcss: {
            plugins: [
                postcssPresetEnv({
                    importFrom: "./src/variables.css",
                }),
            ],
        },
    },
});
