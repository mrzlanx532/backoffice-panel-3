<template>
  <div class="grid --2x2">
    <FormInput name="first_name" label="Имя" @change="onChange"/>
    <FormInput name="second_name" label="Фамилия" @change="onChange"/>
    <FormInput name="email" label="E-mail" @change="onChange"/>
    <FormInput name="phone" label="Телефон" @change="onChange"/>
    <FormInput name="language" label="Язык" class="--full" @change="onChange"/>
    <FormInput name="about" label="О себе" class="--full" @change="onChange"/>
    <FormInput name="photo" label="Фотография" class="--full"/>
  </div>
</template>
<script>
import FormInput from "@/components/Base/Form/Input";

export default {
  name: 'InfoTab',
  components: {
    FormInput
  },
  methods: {
    onChange(param, value) {
      this.$emit('change', param, value)
    }
  }
}
</script>