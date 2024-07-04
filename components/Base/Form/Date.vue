<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import 'moment/dist/locale/ru'

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

      selectedDate.value = moment(value, 'X').format(props.componentData.returnFormat)
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

let altPosition = null;

if (props?.componentData?.altPosition) {
  altPosition =  props?.componentData.altPosition
}
</script>

<template>
  <div>
    <div class="label">{{ label }}</div>
    <VueDatePicker
        v-model="selectedDate"
        class="dp__theme_form date"
        locale="ru"
        format="dd.MM.yyyy"
        select-text="Выбрать"
        :alt-position="altPosition"
        cancel-text="Отмена"
        :enable-time-picker="false"
        @update:model-value="onUpdate()"
        model-type="dd.MM.yyyy"
    />
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>