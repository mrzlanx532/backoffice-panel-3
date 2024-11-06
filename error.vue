<script setup lang="ts">
const {
  $auth
} = useNuxtApp()

type layoutNameType = 'default' | 'empty'

const config = useRuntimeConfig()

let layoutName: layoutNameType = 'default'
const to = ref(config.public.laravelAuth.redirects.auth)
const marginTop = ref('-20px')

if ($auth().user.value === null) {
  layoutName = 'empty'
  to.value = config.public.laravelAuth.redirects.guest
  marginTop.value = '0'
}
</script>

<template>
  <NuxtLayout :name="layoutName">
    <div class="error-page error-page__container" :style="{marginTop}">
      <h1>Ошибка</h1>
      <p>Страница, которую вы ищете не существует</p>
      <NuxtLink :to="to">Перейти на главную</NuxtLink>
    </div>
  </NuxtLayout>
</template>