<script setup>
import { useNuxtApp } from '#app'
import { onMounted } from 'vue'
import Form from '@/components/Base/Form'
import FormInput from '@/components/Base/Form/Input.jsx'
import FormTextArea from '@/components/Base/Form/TextArea'
import FormInputFile from '@/components/Base/Form/InputFile'
import { getFormDataValues, formRequestBody } from '~/helpers/common.ts'

const emit = defineEmits(['modal:resolve'])

const { $authFetch } = useNuxtApp()

const errors = ref([])

const props = defineProps({
  data: {
    type: Object,
    required: false
  }
})

const formDataValues = getFormDataValues([
  'name_ru',
  'name_en',
  'subtitle',
  'ident',
  'description_ru',
  'description_en',
  'logo',
])

const formData = [
  {
    name: 'name_ru',
    label: 'Название (ru)',
    class: '--full',
    component: FormInput,
  },
  {
    name: 'name_en',
    label: 'Название (en)',
    class: '--full',
    component: FormInput,
  },
  {
    name: 'subtitle',
    label: 'Подзаголовок',
    class: '--full',
    component: FormInput,
  },
  {
    name: 'ident',
    label: 'Идентификатор',
    class: '--full',
    component: FormInput,
  },
  {
    name: 'description_ru',
    label: 'Описание (ru)',
    component: FormTextArea,
    class: '--full',
  },
  {
    name: 'description_en',
    label: 'Описание (en)',
    component: FormTextArea,
    class: '--full',
  },
  {
    name: 'logo',
    label: 'Изображение',
    component: FormInputFile,
    class: '--full',
    componentData: {
      allowedTypes: ['jpg', 'jpeg', 'png'],
    }
  },
]

const onClickSave = async () => {
  let formData = formRequestBody(formDataValues, props.data.id)

  const method = props.data.id === undefined ? 'create' : 'update'

  try {
    await $authFetch(`music/labels/${method}`, {
      method: 'POST',
      body: formData,
    })

    emit('modal:resolve')

  } catch (err) {
    if (err.status === 422 && err.data.errors) {
      errors.value = err.data.errors
    }
  }
}

onMounted(async () => {

  const formResponse = props.data.formResponse

  if (props.data.id !== undefined) {
    Object.keys(formDataValues).map((key) => {
      formDataValues[key] = formResponse.entity[key]
    })
  }
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
        <button class="btn --primary --big" @click="onClickSave()">Сохранить</button>
        <button class="btn --outline-primary --big" @click="emit('modal:close')">Отмена</button>
      </div>
    </template>
  </Form>
</template>