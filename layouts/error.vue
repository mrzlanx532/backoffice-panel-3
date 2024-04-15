<template>
  <div class="error-page">
    <div class="error-page__container">
      <h1>{{ message }}</h1>
      <p>{{ error.message }}</p>
      <NuxtLink v-if="error.statusCode === 404" :to="to.link">{{ to.title }}</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout({$auth}) {
    if ($auth.$state.loggedIn) {
      return 'default'
    }

    return 'empty';
  },
  computed: {
    to: function () {
      if (this.$auth.$state.loggedIn) {
        return {
          link: '/',
          title: 'На главную'
        };
      }

      return {
        link: '/login',
        title: 'Войти'
      };
    },
    message: function () {
      if (this.error.statusCode === 404) {
        return 'Страница не найдена'
      }

      return this.error.statusCode + ' error'
    }
  }
}
</script>