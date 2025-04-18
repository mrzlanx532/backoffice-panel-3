export default defineNuxtConfig({
  app: {
    head: {
      title: 'DD | Backoffice',
    }
  },

  devtools: { enabled: false },

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

  modules: [
      '@pinia/nuxt',
      '@mrzlanx532/nuxt-3-laravel-auth-module',
      '@mrzlanx532/nuxt-3-backoffice-ui'
  ],

  compatibilityDate: '2024-07-05'
})