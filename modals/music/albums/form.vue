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
      options: []
    }
  },
  {
    name: 'label_id',
    label: 'Лейбл',
    component: FormSelect,
    componentData: {
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
    componentData: {
      allowedTypes: ['jpg', 'jpeg', 'png'],
    }
  },
]

const onClickSave = async () => {
  let formData = formDataValues

  if (formData.picture instanceof File) {

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

  const formResponse = props.data.formResponse

  if (props.data.id !== undefined) {
    Object.keys(formDataValues).map((key) => {

      if (key === 'label_id') {
        formDataValues[key] = formResponse.entity.label === null ? null : formResponse.entity.label.id
        return
      }

      if (key === 'author_id') {
        formDataValues[key] = formResponse.entity.author === null ? null : formResponse.entity.author.id
        return
      }

      if (key === 'release_date') {
        formDataValues[key] = formResponse.entity.release_date === null ? null : moment(formResponse.entity.release_date, 'X').format('DD.MM.yyyy')
        return
      }

      formDataValues[key] = formResponse.entity[key]
    })
  }

  formResponse.authors.forEach((author) => {
    formData[2].componentData.options.push({
      id: author.id,
      title: `${author.name_en} (${author.name_en})`,
    })
  })

  formResponse.labels.forEach((label) => {
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