<script setup lang="ts">
import { definePageMeta, useNuxtApp } from "#imports"
import { default as LoginInput } from '@/components/Pages/Login/Input.vue'
import type { Ref } from 'vue'

const errors: Ref<Record<string, any>> = ref({})

const isWait = ref(false)

definePageMeta({
  middleware: ['guest'],
  layout: 'empty',
})

const formData = ref({
  email: 'denis_danilov_97@mail.ru',
  password: '4aWvh75t'
})

const { $auth, $notification } = useNuxtApp()

async function onClick() {
  isWait.value = true

  await $auth().login(formData.value).catch((err) => {

    if (err.status === undefined) {
      $notification.push({type: 'danger', message: ['Сервер недоступен,', 'попробуйте позже']})

      return
    }

    errors.value = err.data.errors

  }).finally(() => {
    isWait.value = false
  })
}
</script>

<template>
  <div class="login">
    <form class="login__form">
      <div class="login__img">
        <img src="/img/logo.png" alt="logo" style="height: 20px; width: 20px;">
        <div>Digital Dyatel</div>
      </div>
      <div class="login__header">
        Авторизация
      </div>
      <LoginInput
          type="text"
          label="Логин"
          name="email"
          v-model="formData.email"
          :errors="errors"
      />
      <LoginInput
          type="password"
          label="Пароль"
          name="password"
          v-model="formData.password"
          :errors="errors"
      />
      <button
          class="login__btn"
          type="button"
          @click.prevent="onClick" :disabled="isWait"
      >
        Войти
      </button>
    </form>
  </div>
</template>

<style scoped>
.login__img {
  display: flex;
  place-items: center center;
  flex-direction: column;
  opacity: .5;
}
</style>