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
  checkbox
} = useForm()

const {
  formData,
  formDataValues,
  errors,
  getFormComponent
} = initForm(
    'music/authors/create',
    'music/authors/update',
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
        name: 'ident',
        label: 'Идентификатор',
        class: '--full',
        componentData: {
          description: 'Только латинские буквы и цифры'
        }
      }),
      input({
        name: 'subtitle_ru',
        label: 'Страна (ru)',
        class: '--full'
      }),
      input({
        name: 'subtitle_en',
        label: 'Страна (en)',
        class: '--full'
      }),
      textArea({
        name: 'description_ru',
        label: 'Описание (ru)',
        class: '--full'
      }),
      textArea({
        name: 'description_en',
        label: 'Описание (en)',
        class: '--full'
      }),
      inputFile({
        name: 'picture',
        label: 'Изображение',
        class: '--full',
        componentData: {
          allowedTypes: ['jpg', 'jpeg', 'png'],
        }
      }),
      checkbox({
        name: 'is_exclusive',
        label: 'Exclusive'
      }),
      checkbox({
        name: 'a_list_is_active',
        label: 'A-List'
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