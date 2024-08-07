<script setup>
import { useNuxtApp } from '#app'
import { onMounted } from 'vue'
import Form from '@/components/Base/Form'
import FormInput from '@/components/Base/Form/Input.jsx'
import FormSelect from '@/components/Base/Form/Select'
import FormDate from '@/components/Base/Form/Date'
import FormTextArea from '@/components/Base/Form/TextArea'
import FormInputFile from '@/components/Base/Form/InputFile'
import moment from 'moment'

const emit = defineEmits(['modal:resolve'])

const { $authFetch } = useNuxtApp()

const errors = ref([])

const props = defineProps({
  data: {
    type: Object,
    required: false
  }
})

const formDataValues = reactive({
  'locale_id': '',
  'category_id': '',
  'name': '',
  'date': '',
  'cover': '',
  'content_short': '',
  'content': '',
})

const formData = [
  {
    name: 'locale_id',
    label: 'Язык публикации',
    class: '--full',
    component: FormSelect,
    componentData: {
      options: []
    }
  },
  {
    name: 'category_id',
    label: 'Категории',
    class: '--full',
    component: FormSelect,
    componentData: {
      options: []
    }
  },
  {
    name: 'name',
    label: 'Заголовок',
    component: FormInput,
  },
  {
    name: 'date',
    label: 'Дата',
    component: FormDate,
    componentData: {
      options: []
    }
  },
  {
    name: 'cover',
    label: 'Изображение',
    component: FormInputFile,
    class: '--full',
    componentData: {
      allowedTypes: ['jpg', 'jpeg', 'png'],
    }
  },
  {
    name: 'content_short',
    label: 'Краткое содержание',
    component: FormTextArea,
    class: '--full',
  },
  {
    name: 'content',
    label: 'Полное содержание',
    component: FormTextArea,
    class: '--full',
  }
]

const onClickSave = async () => {
  let formData = formDataValues

  if (formData.cover instanceof File) {

    formData = new FormData()

    if (props.data.id !== undefined) {
      formData.append('id', props.data.id)
    }

    Object.entries(formDataValues).map(([key, value]) => {
      formData.append(key, value)
    })
  }

  let method = 'create'

  if (props.data.id !== undefined) {
    method = 'update'
    formData.id = props.data.id
  }

  try {
    await $authFetch(`http://backoffice-api.lsmlocal.ru/blog/posts/${method}`, {
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

  formResponse.locales.forEach((locale) => {
    formData[0].componentData.options.push({
      id: locale.id,
      title: locale.title,
    })
  })

  formResponse.categories.forEach((category) => {
    formData[1].componentData.options.push({
      id: category.id,
      title: `${category.name_en} (${category.name_ru}})`
    })
  })

  if (props.data.id !== undefined) {
    Object.keys(formDataValues).map((key) => {

      if (key === 'date') {
        formDataValues[key] = formResponse.entity.date === null ? null : moment(formResponse.entity.date, 'X').format('DD.MM.yyyy')
        return
      }

      formDataValues[key] = formResponse.entity[key]
    })
  }
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
        <button class="btn --primary --big" @click="onClickSave()">Сохранить</button>
        <button class="btn --outline-primary --big" @click="$emit('modal:close')">Отмена</button>
      </div>
    </template>
  </Form>
</template>