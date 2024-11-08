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
  date,
  inputFile,
  textArea,
  checkbox
} = useForm()

const {
  formData,
  formDataValues,
  errors,
  onClickSave
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

onMounted(async () => {
  fillComponents(props, formData, formDataValues)
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
        <button class="btn --outline-primary --big" @click="$emit('modal:close')">Отмена</button>
      </div>
    </template>
  </Form>
</template>