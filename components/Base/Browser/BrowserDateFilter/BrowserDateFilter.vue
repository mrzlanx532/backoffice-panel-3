<script setup lang="ts">
// Пока что сохранил код

import BrowserDateFilterBase from './BrowserDateFilterBase.vue'

import { defineEmits } from 'vue'
import moment from 'moment'
import 'moment/dist/locale/ru'

moment.locale('ru')

const emit = defineEmits(['filterValueChanged'])

const value = []

const onFilterValueChanged = (payload) => {

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
        <BrowserDateFilterBase @change="onFilterValueChanged" :filter="filter" :range-index="0" type-of="datetime"/>
        <BrowserDateFilterBase @change="onFilterValueChanged" :filter="filter" :range-index="1" type-of="datetime" :style="{'marginTop': '2px'}"/>
      </template>
      <BrowserDateFilterBase v-else @change="onFilterValueChanged" :filter="filter" type-of="datetime"/>
    </div>
  </div>
</template>
