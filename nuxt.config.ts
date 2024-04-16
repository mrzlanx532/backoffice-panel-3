// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  plugins: [
    //'plugins/modal.js',
    'plugins/scrollable.ts',
    'plugins/click-outside.ts'
  ],

  css: [
    'assets/scss/main.scss',
  ],

  modules: ['@pinia/nuxt']
})