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

  select,
  input,
  datetime,
  inputFile,
  textArea,
} = useForm()

const {
  formData,
  formDataValues,
  errors,
  getFormComponent
} = initForm(
    'blog/posts/create',
    'blog/posts/update',
    [
  select({
    name: 'locale_id',
    label: 'Язык публикации',
    class: '--full'
  }),
  select({
    name: 'category_id',
    label: 'Категории',
    class: '--full'
  }),
  input({
    name: 'name',
    label: 'Заголовок',
    class: '--full',
  }),
  datetime({
    name: 'date',
    label: 'Дата',
    class: '--full',
    componentData: {
      format: 'DD.MM.yyyy HH:mm'
    }
  }),
  inputFile({
    name: 'cover',
    label: 'Изображение',
    class: '--full',
  }),
  textArea({
    name: 'content_short',
    label: 'Краткое содержание',
    class: '--full'
  }),
  textArea({
    name: 'content',
    label: 'Содержание',
    class: '--full'
  }),
])

const FormComponent = getFormComponent(emit, props, formData, errors)

onMounted(async () => {

  fillComponents(props, formData, formDataValues, {
    locales: {
      to: 'locale_id',
      fn: (locale) => {
        return {
          id: locale.id,
          title: locale.title
        }
      }
    },
    categories: {
      to: 'category_id',
      fn: (category) => {
        return {
          id: category.id,
          title: `${category.name_en} (${category.name_ru})`
        }
      }
    }
  })
})
</script>
<template>
  <FormComponent/>
</template>