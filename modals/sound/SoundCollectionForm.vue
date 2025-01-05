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
  textArea,
  inputFile,
} = useForm()

const {
  formData,
  formDataValues,
  errors,
  getFormComponent
} = initForm(
    'sound/collections/create',
    'sound/collections/update',
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
