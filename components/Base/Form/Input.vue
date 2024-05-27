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
  value: {
    required: false,
    default: ''
  },
  errors: {
    type: Array,
    required: false,
    default: []
  }
})

const localValue = defineModel()

const emit = defineEmits(['change'])

const onChange = () => emit('change', props.name, localValue)
</script>

<template>
  <div>
    <label class="input__label">{{ label }}</label>
    <div
        class="input__container"
        :class="{'input__container_error': errors && errors[0] }"
    >
      <input
          class="input"
          :name="name"
          type="text"
          autocomplete="none"
          v-model="localValue"
          @change="onChange"
          :label="label"
      >
    </div>
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>