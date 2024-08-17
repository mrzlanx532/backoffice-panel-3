<script setup lang="ts">
import DatePicker from '../Datepicker/DatePicker.vue'

import moment from 'moment'
import 'moment/dist/locale/ru'
import type { IPayload } from '~/components/Base/Datepicker/types'

moment.locale('ru')

const emit = defineEmits(['filterValueChanged'])

const value: (number|null|undefined)[] = []

const onFilterValueChanged = (payload: IPayload) => {

  if (payload.rangeIndex === undefined) {
    emit('filterValueChanged', {
      id: props.filter.id,
      value: payload.value,
    })

    return
  }

  value[payload.rangeIndex] = payload.value

  emit('filterValueChanged', {
    id: props.filter.id,
    value: value
  })
}

const props = defineProps({
  filter: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="browser__filter">
    <label :for="filter.id" class="browser__filter-name">{{ filter.title }}</label>
    <div class="browser__filter-container date">
      <template v-if="filter.config.range">
        <DatePicker @update:modelValue="onFilterValueChanged" :filter="filter" :range-index="0" type-of="date"/>
        <DatePicker @update:modelValue="onFilterValueChanged" :filter="filter" :range-index="1" type-of="date" :style="{'marginTop': '2px'}"/>
      </template>
      <DatePicker v-else @change="onFilterValueChanged" :filter="filter" type-of="date"/>
    </div>
  </div>
</template>
