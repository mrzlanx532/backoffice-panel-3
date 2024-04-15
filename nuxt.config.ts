// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    autoImport: false
  },
  plugins: [
    'plugins/modal.js',
    'plugins/scrollable.js',
    'plugins/click-outside.ts'
  ],
  css: [
    'assets/scss/main.scss',
  ],
})
