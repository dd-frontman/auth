// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  alias: {
    images: fileURLToPath(new URL("~/assets/img", import.meta.url)),
    style: fileURLToPath(new URL("~/assets/scc", import.meta.url)),
  },
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    prerender: {
      ignore: ["/otp"],
    },
  },
  app: {
    baseURL: "/auth/",
    buildAssetsDir: "/_nuxt/",
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  // @ts-ignore
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["@/assets/css/main.css"],
  imports: {
    autoImport: true,
  },
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
  },
});
