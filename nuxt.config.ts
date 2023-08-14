// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    prerender: {
      ignore: ["/otp"],
    },
  },
  app: {
    baseURL: "/auth/",
    buildAssetsDir: "assets",
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
