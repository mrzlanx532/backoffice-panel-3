<script setup lang="ts">
import BrowserDateFilterBase from './BrowserDateFilter/BrowserDateFilterBase.vue'

import { defineEmits } from 'vue'
import moment from 'moment'
import 'moment/dist/locale/ru'

moment.locale('ru')

const emit = defineEmits(['filterValueChanged'])

const onFilterValueChanged = (payload) => {
  emit('filterValueChanged', payload)
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
        <BrowserDateFilterBase :filter="filter" :range-index="0"/>
        <BrowserDateFilterBase :filter="filter" :range-index="1" :style="{'marginTop': '2px'}"/>
      </template>
      <BrowserDateFilterBase v-else :filter="filter" @filterValueChanged="onFilterValueChanged"/>
    </div>
  </div>
</template>
