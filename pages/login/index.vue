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
          @change="onChange"
          :value="formData.email"
          :errorMessage="errorsMessages"
      />
      <LoginInput
          type="password"
          label="Пароль"
          name="password"
          @change="onChange"
          :value="formData.password"
          :errorMessage="errorsMessages"
      />
      <div
          class="login__error"
          :class="{login__error_hidden: errorGlobal === null}"
      >
        {{ errorGlobal }}
      </div>
      <LoginButton :classes="['--full-width --special']" text="Войти" @click="onClick">
        Войти
      </LoginButton>
    </form>
  </div>
</template>
<script>

import { definePageMeta } from "#imports";

definePageMeta({
  layout: 'empty',
  middleware: ['sanctum:guest']
})

import { default as LoginInput } from "@/components/Pages/Login/Input";
import { default as LoginButton } from "@/components/Base/Button";

export default {
  layout: 'empty',
  components: {
    LoginInput,
    LoginButton
  },
  data: function () {
    return {
      formData: {
        email: "denis_danilov_97@mail.ru",
        password: "4aWvh75t",
      },
      errorsMessages: {
        email: '',
        name: '',
        password: ''
      },
      errorGlobal: null,
      errorClass: 'enter_container__error_empty'
    }
  },
  methods: {
    onChange(e) {
      this.formData[e.target.name] = e.target.value
    },
    onClick() {
      this.submit()
    },
    async submit() {
      await this.$auth.loginWith('custom', {
        data: this.formData
      }).catch((res) => {
        this.setErrors(res)
      })
    },
    setErrors(res) {

      this.errorGlobal = null;

      for (let errorMessage in this.errorsMessages) {
        this.errorsMessages[errorMessage] = '';
      }

      if (res.response === undefined) {
        this.errorGlobal = 'Сервис недоступен';

        return
      }

      if (res.response.status === 409) {
        this.errorGlobal = res.response.data.message
      }

      if (res.response.status === 422) {

        let errors = Object.entries(res.response.data.errors);

        errors.map((item) => {
          this.errorsMessages[item[0]] = item[1][0]
        })
      }
    }
  }
}
</script>