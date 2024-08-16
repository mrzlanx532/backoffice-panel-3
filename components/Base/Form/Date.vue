<script setup lang="ts">
import moment, { type Moment } from 'moment'
import 'moment/dist/locale/ru'
import DatePicker from '@/components/Base/Datepicker/DatePicker.vue'
import type { IPayload } from '@/components/Base/Datepicker/types'
import type { PropType } from 'vue'

const emit = defineEmits(['update:modelValue'])

const selectedDate = ref();

const secondsToCorrectTimezone = ((new Date().getTimezoneOffset() * -1) * 60)

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

watch(
    () => props.modelValue,
    (value) => {
      if (value === null) {
        selectedDate.value = null

        return
      }

      selectedDate.value = moment(value, props.componentData.returnFormat).format(props.componentData.returnFormat)
    }
)

const prepareValue = (data: Moment|null) => {
  const momentDate = moment(data, 'DD.MM.YYYY')

  if (data === null) {
    return null
  }

  if (props?.componentData?.returnFormat) {
    return momentDate.format(props.componentData.returnFormat)
  }

  return Number(momentDate.format('X')) + secondsToCorrectTimezone
}

const onChange = (payload: IPayload) => {
  emit('update:modelValue', payload.value)
}
</script>

<template>
  <div>
    <div class="label">{{ label }}</div>
    <DatePicker @change="onChange" :force-inverse="props?.componentData?.forceInverse" type-of="date"/>
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>