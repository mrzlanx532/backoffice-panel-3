<script setup lang="ts">
const props = defineProps<{
  name: string,
  type: string,
  value?: string,
  label: string,
  errorMessage?: {}
}>()
</script>

<template>
  <div class="login__input-container">
    <div class="label" :for="name">{{ props.label }}</div>
    <input
        :label=props.label
        autocomplete="off"
        class="login__input"
        :type="type"
        :name="name"
        :id="name"
        v-model="props.value"/>
    <div
        class="login__input-error"
        :class="{'login__input-error_hidden': errorMessage && errorMessage[name] === ''}"
    >
      {{ errorMessage && errorMessage[name] ? errorMessage[name] : ''}}
    </div>
  </div>
</template>