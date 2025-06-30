// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
      },
    },
  },
  integrations: [preact()],
});
