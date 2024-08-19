<script setup lang="ts">
import type { Ref } from 'vue'
import type { IPayload } from '~/components/Base/Datepicker/types'
import DatePicker from '../Datepicker/DatePicker.vue'
import 'moment/dist/locale/ru'
import moment from 'moment'

moment.locale('ru')

const emit = defineEmits(['filterValueChanged'])

interface IFilter {
  id: string,
  type: string
  title: string,
  options?: [],
  config: {
    filter: boolean,
    hidden: false,
    mask: null|string,
    multiple: boolean,
    range: boolean,
  }
}

const props = defineProps<{
  modelValue?: number|string|[number]|[number,number],
  filter: IFilter
}>()

const localValue: Ref<null|number|string> = ref(null)

watch(
    () => props.modelValue,
    (value) => {

      if (props.filter.config.range) {
        return
      }

      if (value === undefined) {
        localValue.value = null
        return
      }

      if (Array.isArray(value)) {
        localValue.value = value[0]
      }
    }
)

const onFilterValueChanged = (payload: IPayload) => {

  if (props.filter.config.range) {
    return
  }

  if (payload.rangeIndex === undefined) {
    emit('filterValueChanged', {
      id: props.filter.id,
      value: payload.value ? Number(payload.value) : payload.value,
    })

    return
  }
}
</script>
<template>
  <div class="browser__filter">
    <label :for="filter.id" class="browser__filter-name">{{ filter.title }}</label>
    <div class="browser__filter-container date">
      <template v-if="filter.config.range">
        <DatePicker
            @update:modelValue="onFilterValueChanged"
            :filter="filter"
            :range-index="0"
            type-of="date"
        />
        <DatePicker
            @update:modelValue="onFilterValueChanged"
            :filter="filter"
            :range-index="1"
            type-of="date"
            :style="{'marginTop': '2px'}"
        />
      </template>
      <DatePicker
          v-else
          :model-value="localValue!"
          @update:modelValue="onFilterValueChanged"
          :filter="filter"
          type-of="date"
      />
    </div>
  </div>
</template>
