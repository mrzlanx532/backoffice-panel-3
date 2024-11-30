<script setup lang="ts">
import { definePageMeta, useNuxtApp } from "#imports"
import { default as LoginInput } from '@/components/Pages/Login/Input.vue'
import type { Ref } from 'vue'

const errors: Ref<Record<string, any>> = ref({})

definePageMeta({
  middleware: ['guest'],
  layout: 'empty',
})

const formData = ref({
  email: 'denis_danilov_97@mail.ru',
  password: '4aWvh75t'
})

const { $auth } = useNuxtApp()

async function onClick() {
  await $auth().login(formData.value).catch((err) => {
    errors.value = err.data.errors
  })
}
</script>

<template>
  <div class="login">
    <form class="login__form">
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
      <button class="login__btn" :classes="['--full-width --special']" @click.prevent="onClick">
        Войти
      </button>
    </form>
  </div>
</template>