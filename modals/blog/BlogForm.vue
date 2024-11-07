<script setup lang="ts">
import { onMounted } from 'vue'
import Form from '@/components/Base/Form.vue'
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
  onClickSave
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
    class: '--full'
  }),
  datetime({
    name: 'date',
    label: 'Дата',
    class: '--full',
    componentData: {
      format: 'DD.MM.YYYY HH:mm'
    }
  }),
  inputFile({
    name: 'cover',
    label: 'Изображение',
    class: '--full',
    componentData: {
      allowedTypes: ['jpg', 'jpeg', 'png']
    }
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
  <Form
      :title=data.title
      @close="$emit('modal:close')"
  >
    <template #content>
      <div class="grid --2x2">
        <component
            v-for="formDataItem in formData"
            :componentData="formDataItem?.componentData"
            :class="formDataItem.class"
            :label="formDataItem.label"
            :name="formDataItem.name"
            :is="formDataItem.component"
            v-model="formDataValues[formDataItem.name]"
            :errors="errors[formDataItem.name]"
        />
      </div>
    </template>
    <template #footer>
      <div class="btn__group">
        <button class="btn --primary --big" @click="onClickSave(props, emit)">Сохранить</button>
        <button class="btn --outline-primary --big" @click="emit('modal:close')">Отмена</button>
      </div>
    </template>
  </Form>
</template>