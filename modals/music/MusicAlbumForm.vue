<script setup lang="ts">
import { onMounted } from 'vue'
import type { IUseFormDefaultProps } from '#backoffice-ui/types'
import moment from 'moment'

const props = defineProps<IUseFormDefaultProps>()

const emit = defineEmits([
  'modal:resolve',
  'modal:close'
])

const {
  initForm,

  fillComponents,

  select,
  input,
  date,
  inputFile,
  textArea,
} = useForm()

const {
  formData,
  formDataValues,
  errors,
  getFormComponent
} = initForm(
    'music/albums/create',
    'music/albums/update',
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
  }),
  select({
    name: 'label_id',
    label: 'Лейбл',
  }),
  date({
    name: 'release_date',
    label: 'Дата релиза',
    class: '--full',
    componentData: {
      format: 'DD.MM.yyyy',
    }
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
          title: `${author.name_en} (${author.name_ru})`
        }
      }
    },
    labels: {
      to: 'label_id',
      fn: (label) => {
        return {
          id: label.id,
          title: `${label.name_en} (${label.name_ru})`
        }
      }
    },
  },
  {
    release_date: {
      fn: (releaseDate) => {
        return releaseDate ? moment(releaseDate, 'X').format('DD.MM.yyyy') : null
      }
    }
  })
})
</script>

<template>
  <FormComponent/>
</template>