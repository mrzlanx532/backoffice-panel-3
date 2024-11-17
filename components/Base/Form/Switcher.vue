<script setup lang="ts">
const checked = ref(false)

const emit = defineEmits(['update:modelValue'])

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
    required: false,
    type: [Number, String, Array, Boolean]
  },
  errors: {
    type: Array,
    required: false,
    default: []
  },
  componentData: {
    type: Object,
    required: false
  }
})

watch(
    () => props.modelValue,
    (value) => {
      checked.value = value as boolean
    }
)

const onClick = () => {
  checked.value = !checked.value

  emit('update:modelValue', checked.value)
}
</script>

<template>
  <div class="switch">
    <div class="switch__container">
      <div class="switch__wrapper">
        <input type="checkbox" v-model="checked" hidden="hidden">
        <span class="switch__slider round" @click="onClick"></span>
      </div>
      <span class="switch__label" @click="onClick">{{ props.label }}</span>
    </div>
    <div class="input__error">{{ props.errors && props.errors[0] ? props.errors[0] : null }}</div>
  </div>
</template>