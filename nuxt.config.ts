// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  plugins: [
    //'plugins/modal.js',
    'plugins/scrollable.ts',
    'plugins/click-outside.ts',
  ],

  laravelAuth: {
    domain: 'http://backoffice-api.lsmlocal.ru',
    redirects: {
      guest: '/login',
      auth: '/'
    },
    endpoints: {
      login: 'managers/self/auth',
      logout: 'managers/self/logout',
      fetchUser: 'managers/self/detail',
      register: 'managers/self/register', // Опционально
    },
  },

  css: [
    'assets/scss/main.scss',
  ],

  modules: [
      '@pinia/nuxt',
      '@mrzlanx532/laravel-auth'
  ]
})