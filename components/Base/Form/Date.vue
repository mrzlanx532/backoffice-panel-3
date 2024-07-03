<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import 'moment/dist/locale/ru'

const date = ref();

const emit = defineEmits(['update:modelValue'])

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

const prepareValue = (data: Moment|null) => {
  const momentDate = moment(data, 'DD.MM.YYYY')

  if (data === null) {
    return null
  }

  if (props?.componentData?.returnFormat) {

    console.log(momentDate.format(props.componentData.returnFormat))

    return momentDate.format(props.componentData.returnFormat)
  }

  return Number(momentDate.format('X')) + secondsToCorrectTimezone
}

const onUpdate = () => {
  emit('update:modelValue', prepareValue(date.value))
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
        v-model="date"
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