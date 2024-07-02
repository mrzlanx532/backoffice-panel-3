<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import 'moment/dist/locale/ru'
import { defineEmits } from 'vue'

const date = ref([]);

const emit = defineEmits(['filterValueChanged'])

const secondsToCorrectTimezone = ((new Date().getTimezoneOffset() * -1) * 60)

const props = defineProps({
  filter: {
    type: Object,
    required: true
  },
})

const prepareValue = (data: Moment|null) => {
  const momentDate = moment(data, 'DD.MM.YYYY')

  return data === null ? null : Number(momentDate.format('X')) + secondsToCorrectTimezone
}

const onUpdate = (index = 0) => {

  if (props.filter.config.range) {
    emit('filterValueChanged', {id: props.filter.id, value: [prepareValue(date.value[0]), prepareValue(date.value[1])]})

    return
  }

  emit('filterValueChanged', {id: props.filter.id, value: prepareValue(date.value[0])})
}
</script>

<template>
  <div class="browser__filter">
    <div :for="filter.id" class="browser__filter-name">{{ filter.title }}</div>
    <div class="browser__filter-container">
      <template v-if="filter.config.range">
        <VueDatePicker
            placeholder="от"
            v-model="date[0]"
            locale="ru"
            format="dd.MM.yyyy"
            class="dp__theme_filter"
            select-text="Выбрать"
            cancel-text="Отмена"
            :enable-time-picker="false"
            @update:model-value="onUpdate(0)"
            model-type="dd.MM.yyyy"
            :text-input="true"
        />
        <VueDatePicker
            :style="{'marginTop': '2px'}"
            placeholder="до"
            v-model="date[1]"
            locale="ru"
            format="dd.MM.yyyy"
            class="dp__theme_filter"
            select-text="Выбрать"
            cancel-text="Отмена"
            :enable-time-picker="false"
            @update:model-value="onUpdate(1)"
            model-type="dd.MM.yyyy"
            :text-input="true"
        />
      </template>
      <VueDatePicker
          v-else
          v-model="date[0]"
          locale="ru"
          format="dd.MM.yyyy"
          class="dp__theme_filter"
          select-text="Выбрать"
          cancel-text="Отмена"
          :enable-time-picker="false"
          @update:model-value="onUpdate($event, 0)"
          model-type="dd.MM.yyyy"
          :text-input="true"
          :range="filter.config.range"
      />
    </div>
  </div>
</template>