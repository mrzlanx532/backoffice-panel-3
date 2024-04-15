// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  imports: {
    autoImport: false
  },

  plugins: [
    //'plugins/modal.js',
    'plugins/scrollable.ts',
    'plugins/click-outside.ts'
  ],

  css: [
    'assets/scss/main.scss',
  ],

  modules: ["nuxt-auth-sanctum"],

  sanctum: {
    baseUrl: 'http://backoffice-api.lsmlocal.ru',
    endpoints: {
      user: '/managers/self/detail',
      login: '/managers/self/auth',
      logout: '/managers/self/logout'
    },
    redirect: {
      onAuthOnly: '/login',
      onGuestOnly: '/'
    },
  },
})