<script setup>
import Form from '@/components/Base/Form'
import FormInput from '~/components/Base/Form/Input.jsx'
import FormSelect from '~/components/Base/Form/Select'
import FormDate from '~/components/Base/Form/Date'
import FormTextArea from '~/components/Base/Form/TextArea'

const errors = ref([])

const props = defineProps({
  data: {
    type: Object,
    required: false
  }
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
      options: [

      ]
    }
  },
  {
    name: 'label_id',
    label: 'Лейбл',
    component: FormSelect,
    componentData: {
      isMultiple: false,
      options: [

      ]
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
]

const onClickSave = () => {
  console.log('saving...')
}
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