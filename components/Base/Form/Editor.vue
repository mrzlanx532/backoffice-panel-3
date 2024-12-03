<script setup lang="ts">
import EditorJS from '~/components/Base/EditorJS.vue'
import { useNuxtApp } from '#app'
import type { OutputData } from '@editorjs/editorjs'

const emit = defineEmits(['update:modelValue'])

const editorEl = useTemplateRef<HTMLElement>('editorEl')

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

const onChange = (data: OutputData) => {
  emit('update:modelValue', JSON.stringify(data))
}
</script>

<template>
  <div>
    <label class="label">{{ props.label }}</label>
    <ClientOnly>
      <div class="editorjs__wrapper">
        <EditorJS @change="onChange" :data="props.modelValue as undefined"/>
      </div>
    </ClientOnly>
    <div class="input__error">{{ props.errors && props.errors[0] ? props.errors[0] : null }}</div>
  </div>
</template>

<style scoped>
.editorjs__wrapper {
  margin-top: 10px;
  padding: 0 10px;
  border: 1px solid var(--color-2, #dbdbdb);
  border-radius: 5px;
}
</style>