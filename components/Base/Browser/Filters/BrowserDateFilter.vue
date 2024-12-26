<script setup lang="ts">
import type { Ref } from 'vue'
import type { IPayload, IPayloadMultiple } from '~/components/Base/Datepicker/types'
import DatePicker from '../../Datepicker/DatePicker.vue'
import 'moment/dist/locale/ru'
import moment from 'moment'

moment.locale('ru')

const emit = defineEmits(['update:modelValue'])

type IValue = number | string | undefined

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
  modelValue?: number|string|[number|string]|[(number|string),(number|string)],
  filter: IFilter
}>()

const localValue: Ref<IValue> = ref(undefined)
const localValues: Ref<[IValue,IValue]> = ref([undefined, undefined])

watch(
    () => props.modelValue,
    (value) => {

      if (props.filter.config.range) {

        if (value === undefined) {
          localValues.value = [undefined, undefined]
        }

        if (Array.isArray(value)) {
          localValues.value = [
            value[0] === '' ? undefined : value[0],
            value[1] === '' ? undefined : value[1],
          ]
        }

        return
      }

      if (value === undefined) {
        localValue.value = undefined
        return
      }

      if (Array.isArray(value)) {
        localValue.value = value[0]
      }
    },
    {
      immediate: true
    }
)

const onFilterValueChangedMultiple = (payload: IPayloadMultiple) => {

  let preparedValue: ([IValue,IValue] | undefined) = ['', '']
  preparedValue[0] = localValues.value[0]
  preparedValue[1] = localValues.value[1]

  preparedValue[payload.rangeIndex] = payload.value ? Number(payload.value) : payload.value

  if (preparedValue[0] === undefined && preparedValue[1]) {
    preparedValue[0] = ''
  } else if (preparedValue[1] === undefined && preparedValue[0]) {
    preparedValue[1] = ''
  } else if (preparedValue[0] === undefined && preparedValue[1] === undefined) {
    preparedValue = undefined
  }

  emit('update:modelValue', props.filter.type, props.filter.id, preparedValue)
}

const onFilterValueChanged = (payload: IPayload) => {
  emit('update:modelValue', props.filter.type, props.filter.id, payload.value ? [Number(payload.value)] : payload.value)
}
</script>
<template>
  <div class="browser__filter">
    <div :for="filter.id" class="browser__filter-name">{{ filter.title }}</div>
    <div class="browser__filter-container date">
      <template v-if="filter.config.range">
        <DatePicker
            @update:modelValue="onFilterValueChangedMultiple"
            :model-value="localValues[0]"
            :filter="filter"
            :range-index="0"
        />
        <DatePicker
            @update:modelValue="onFilterValueChangedMultiple"
            :model-value="localValues[1]"
            :filter="filter"
            :range-index="1"
            :style="{'marginTop': '2px'}"
        />
      </template>
      <DatePicker
          v-else
          :model-value="localValue"
          @update:modelValue="onFilterValueChanged"
          :filter="filter"
      />
    </div>
  </div>
</template>
