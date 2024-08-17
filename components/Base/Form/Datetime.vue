<script setup lang="ts">
import 'moment/dist/locale/ru'
import DatePicker from '@/components/Base/Datepicker/DatePicker.vue'
import type { IPayload } from '@/components/Base/Datepicker/types'
import type { PropType } from 'vue'

const emit = defineEmits(['update:modelValue'])

interface IComponentData {
  forceInverse?: boolean,
  returnFormat?: string
}

const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  modelValue: {
    required: false,
    type: [Number, String, Array]
  },
  errors: {
    type: Array,
    required: false,
    default: []
  },
  componentData: {
    type: Object as PropType<IComponentData>,
    required: false
  }
})

const onUpdateModelValue = (payload: IPayload) => {
  emit('update:modelValue', payload.value)
}
</script>

<template>
  <div>
    <div class="label">{{ label }}</div>
    <DatePicker :model-value="props.modelValue" @update:model-value="onUpdateModelValue" :force-inverse="props?.componentData?.forceInverse" type-of="datetime"/>
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>