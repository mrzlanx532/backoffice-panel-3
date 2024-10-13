<script setup lang="ts">
const props = defineProps<{
  name: string,
  type: string,
  value?: string,
  label: string,
  errorMessage?: {}
}>()

const localValue = ref(props.value)
const localLabel = ref(props.label)
</script>

<template>
  <div class="login__input-container">
    <div class="label" :for="name">{{ localLabel }}</div>
    <input
        class="login__input"
        :type="type"
        :name="name"
        :id="name"
        v-model="localValue"/>
    <div
        class="login__input-error"
        :class="{'login__input-error_hidden': errorMessage && errorMessage[name] === ''}"
    >
      {{ errorMessage && errorMessage[name] ? errorMessage[name] : ''}}
    </div>
  </div>
</template>