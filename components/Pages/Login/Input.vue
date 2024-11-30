<script setup lang="ts">
const modelValue = defineModel()

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<{
  name: string,
  type: string,
  modelValue?: string|null
  label: string,
  errors?: {[key: string]: string[]}
}>(), {
  errors: () => {
    return {}
  }
})

const onInput = (payload: Event) => {
  emit('update:modelValue', (payload.target as HTMLInputElement).value)
}
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
        v-model="modelValue"
        @input="onInput"
    />
    <div
        class="login__input-error"
    >
      {{ props.errors && props.errors[props.name] ? props.errors[props.name][0] : undefined }}
    </div>
  </div>
</template>