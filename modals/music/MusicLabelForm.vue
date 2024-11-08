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

  input,
  inputFile,
  textArea,
} = useForm()

const {
  formData,
  formDataValues,
  errors,
  onClickSave
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
          disabled: true
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

onMounted(async () => {
  fillComponents(props, formData, formDataValues)
})
</script>

<template>
  <Form
      :title=data.title
      @close="emit('modal:close')"
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