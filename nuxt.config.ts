export default defineNuxtConfig({
  app: {
    head: {
      title: 'LSM Backoffice',
    }
  },

  devtools: { enabled: true },

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
      '@mrzlanx532/nuxt-3-laravel-auth-module',
      '@mrzlanx532/nuxt-3-backoffice-ui'
  ],

  compatibilityDate: '2024-07-05'
})