<script setup lang="ts">
import { nextTick } from 'vue'

const emit = defineEmits(['update:modelValue'])

const textareaEl: Ref<HTMLElement, null> = ref(null)

const internalValue = ref('')

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
    type: [Number, String, Array]
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
      internalValue.value = value

      nextTick(() => {
        onInput()
      })
    }
)

const onInput = () => {
  textareaEl.value.style.height = "50px";
  textareaEl.value.style.height = textareaEl.value.scrollHeight + 2 + "px";

  emit('update:modelValue', internalValue.value)
}
</script>

<template>
  <div>
    <label class="label">{{ label }}</label>
    <textarea class="textarea" @input="onInput" ref="textareaEl" v-model="internalValue"/>
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>
