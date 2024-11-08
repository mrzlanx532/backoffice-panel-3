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
  textArea,
  inputFile,
  checkbox
} = useForm()

const {
  formData,
  formDataValues,
  errors,
  getFormComponent
} = initForm(
    'sound/authors/create',
    'sound/authors/update',
    [
      input({
        name: 'name_ru',
        label: 'Имя (ru)',
        class: '--full'
      }),
      input({
        name: 'name_en',
        label: 'Имя (en)',
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
        name: 'photo',
        label: 'Картинка',
        class: '--full',
        componentData: {
          allowedTypes: ['jpg', 'png', 'jpeg']
        }
      }),
      checkbox({
        name: 'a_list_is_active',
        label: 'A-List',
        class: '--full'
      })
    ])

const FormComponent = getFormComponent(emit, props, formData, errors)

onMounted(async () => {
  fillComponents(props, formData, formDataValues, {
    authors: {
      to: 'author_id',
      fn: (author) => {
        return {
          id: author.id,
          title: author.name_ru
        }
      }
    }
  })
})
</script>

<template>
  <FormComponent/>
</template>