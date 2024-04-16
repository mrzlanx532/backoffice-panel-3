<script setup>
import { definePageMeta, useCookie } from "#imports"
import { ref } from 'vue'
import { default as LoginInput } from '@/components/Pages/Login/Input'
import { useAuthStore } from "@/stores/useAuthStore";

definePageMeta({
  middleware: ['guest'],
  layout: 'empty',
})

const formData = ref({
  email: 'denis_danilov_97@mail.ru',
  password: '4aWvh75t'
})

const auth = useAuthStore()

async function onClick() {
  await auth.login(formData.value).catch((err) => {
    console.log(err)
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
          :value="formData.email"
      />
      <LoginInput
          type="password"
          label="Пароль"
          name="password"
          :value="formData.password"
      />
      <button class="login__btn" :classes="['--full-width --special']" @click.prevent="onClick">
        Войти
      </button>
    </form>
  </div>
</template>