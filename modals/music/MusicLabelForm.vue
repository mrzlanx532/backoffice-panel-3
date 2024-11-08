<script setup lang="ts">
import { onMounted } from 'vue'
import type { defaultProps } from '~/composables/useForm'

const props = defineProps<defaultProps>()

const emit = defineEmits([
  'modal:resolve',
  'modal:close'
])

const {
  initForm,

  fillComponents,

  input,
  inputFile,
  textArea,
} = useForm()

const {
  formData,
  formDataValues,
  errors,
  getFormComponent
} = initForm(
    'music/labels/create',
    'music/labels/update',
    [
      input({
        name: 'name_ru',
        label: 'Название (ru)',
        class: '--full'
      }),
      input({
        name: 'name_en',
        label: 'Название (en)',
        class: '--full'
      }),
      input({
        name: 'subtitle',
        label: 'Подзаголовок',
        class: '--full'
      }),
      input({
        name: 'ident',
        label: 'Идентификатор',
        class: '--full',
        componentData: {
          disabled: !!props.data.id,
          description: 'Только латинские буквы и цифры'
        }
      }),
      textArea({
        name: 'description_ru',
        label: 'Описание (ru)',
        class: '--full',
      }),
      textArea({
        name: 'description_en',
        label: 'Описание (en)',
        class: '--full',
      }),
      inputFile({
        name: 'logo',
        label: 'Изображение',
        class: '--full',
        componentData: {
          allowedTypes: ['jpg', 'jpeg', 'png'],
        }
      })
    ])

const FormComponent = getFormComponent(emit, props, formData, errors)

onMounted(async () => {
  fillComponents(props, formData, formDataValues)
})
</script>

<template>
  <FormComponent/>
</template>