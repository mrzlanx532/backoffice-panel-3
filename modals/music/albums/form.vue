<script setup>
import { useNuxtApp } from '#app'
import { onMounted } from 'vue'
import Form from '@/components/Base/Form'
import FormInput from '@/components/Base/Form/Input.jsx'
import FormSelect from '@/components/Base/Form/Select'
import FormDate from '@/components/Base/Form/Date'
import FormTextArea from '@/components/Base/Form/TextArea'
import FormInputFile from '@/components/Base/Form/InputFile'

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
  'name_ru': '',
  'name_en': '',
  'author_id': '',
  'label_id': '',
  'release_date': '',
  'description_ru': '',
  'description_en': '',
  'picture': '',
})

const formData = [
  {
    name: 'name_ru',
    label: 'Название (ru)',
    class: '--full',
    component: FormInput,
  },
  {
    name: 'name_en',
    label: 'Направление (en)',
    class: '--full',
    component: FormInput,
  },
  {
    name: 'author_id',
    label: 'Автор',
    component: FormSelect,
    componentData: {
      isMultiple: false,
      options: []
    }
  },
  {
    name: 'label_id',
    label: 'Лейбл',
    component: FormSelect,
    componentData: {
      isMultiple: false,
      options: []
    }
  },
  {
    name: 'release_date',
    label: 'Дата релиза',
    component: FormDate,
    class: '--full',
    componentData: {
      returnFormat: 'DD.MM.yyyy',
    }
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
    name: 'picture',
    label: 'Изображение',
    component: FormInputFile,
    class: '--full',
  },
]

const onClickSave = async () => {
  let formData = formDataValues

  if (formData.picture instanceof File) {

    formData = new FormData()

    if (props.data.id !== undefined) {
      formData.append('id', props.data.id)
    }

    Object.entries(this.formData).map(([key, value]) => {
      formData.append(key, value)
    })
  }

  let method = 'create'

  if (props.data.id !== undefined) {
    method = 'update'
    formData.id = props.data.id
  }

  try {
    await $authFetch(`http://backoffice-api.lsmlocal.ru/music/albums/${method}`, {
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

  const params = {}

  if (props.data.id !== undefined) {
    params.id = props.data.id
  }

  const response = await $authFetch('http://backoffice-api.lsmlocal.ru/music/albums/form', {
    method: 'GET',
    params
  })

  if (props.data.id !== undefined) {
    Object.keys(formDataValues).map((key) => {

      if (key === 'label_id') {
        formDataValues[key] = response.entity.label === null ? null : response.entity.label.id
        return
      }

      formDataValues[key] = response.entity[key]
    })
  }

  response.authors.forEach((author) => {
    formData[2].componentData.options.push({
      id: author.id,
      title: `${author.name_en} (${author.name_en})`,
    })
  })

  response.labels.forEach((label) => {
    formData[3].componentData.options.push({
      id: label.id,
      title: `${label.name_en} (${label.name_en})`,
    })
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
        <button class="btn --primary --big" @click="onClickSave()">Сохранить</button>
        <button class="btn --outline-primary --big" @click="$emit('modal:close')">Отмена</button>
      </div>
    </template>
  </Form>
</template>