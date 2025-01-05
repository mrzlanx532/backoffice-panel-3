<script setup lang="ts">
import { onMounted } from 'vue'
import { type IUseFormDefaultProps } from '#backoffice-ui/types'

const props = defineProps<IUseFormDefaultProps>()

const emit = defineEmits([
  'modal:resolve',
  'modal:close'
])

const {
  initForm,
  fillComponents,

  input,
  select,
  textArea,
  inputFile,
} = useForm()

const {
  formData,
  formDataValues,
  errors,
  getFormComponent
} = initForm(
    'sound/libraries/create',
    'sound/libraries/update',
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
      select({
        name: 'author_id',
        label: 'Автор',
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
        label: 'Картинка',
        class: '--full',
        componentData: {
          allowedTypes: ['jpg', 'png', 'jpeg']
        }
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
