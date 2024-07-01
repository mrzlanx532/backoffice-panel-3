<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import 'moment/dist/locale/ru'
import { defineEmits } from 'vue'

const date = ref();

const emit = defineEmits(['filterValueChanged'])

const secondsToCorrectTimezone = ((new Date().getTimezoneOffset() * -1) * 60)

const props = defineProps({
  filter: {
    type: Object,
    required: true
  },
})

const onUpdate = (data: Array|null|string) => {

  if (data instanceof Array) {

  }

  const momentDate = moment(data, 'DD.MM.YYYY')

  let value = data === null ? null : Number(momentDate.format('X')) + secondsToCorrectTimezone

  emit('filterValueChanged', {id: props.filter.id, value})
}
</script>

<template>
  <div class="browser__filter">
    <div :for="filter.id" class="browser__filter-name">{{ filter.title }}</div>
    <div class="browser__filter-container">
      <VueDatePicker
          v-model="date"
          locale="ru"
          format="dd.MM.yyyy"
          class="dp__theme_filter"
          select-text="Выбрать"
          cancel-text="Отмена"
          :enable-time-picker="false"
          @update:model-value="onUpdate"
          model-type="dd.MM.yyyy"
          :text-input="true"
          :range="filter.config.range"
      />
    </div>
  </div>
</template>