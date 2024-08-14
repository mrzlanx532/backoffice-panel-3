<script setup lang="ts">
import moment from 'moment'
import 'moment/dist/locale/ru'
import BrowserDateFilterBase from '~/components/Base/Browser/BrowserDateFilter/BrowserDateFilterBase.vue'

const emit = defineEmits(['update:modelValue'])

const selectedDate = ref();

const secondsToCorrectTimezone = ((new Date().getTimezoneOffset() * -1) * 60)

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
    type: Object,
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

const onUpdate = () => {
  emit('update:modelValue', prepareValue(selectedDate.value))
}
</script>

<template>
  <div>
    <div class="label">{{ label }}</div>
    <BrowserDateFilterBase @change="onUpdate" type-of="date"/>
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>