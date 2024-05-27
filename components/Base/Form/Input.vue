<script setup>
const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  modelValue: {
    type: String
  },
  errors: {
    type: Array,
    required: false,
    default: []
  }
})

const emit = defineEmits(['change', 'update:modelValue'])
</script>

<template>
  <div>
    <label class="label">{{ label }}</label>
    <div
        class="input__container"
        :class="{'input__container_error': errors && errors[0] }"
    >
      <input
          class="input"
          :name="name"
          type="text"
          autocomplete="none"
          :value="props.modelValue"
          @input="emit('update:modelValue', $event.target.value)"
          :label="label"
      >
    </div>
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>