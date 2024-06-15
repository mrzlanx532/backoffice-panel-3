<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'
import 'moment/dist/locale/ru'

moment.locale('ru')

const currentData = moment()

const currentMonth = computed(() => {
  return currentData.format('MMMM')
})

const currentYear = computed(() => {
  return currentData.format('YYYY')
})

const pickedDate: Ref<null|string> = ref(null)

const firstDayOfMonth = moment().startOf('month')
const numberOfWeekDay = firstDayOfMonth.format('d')
const firstDayOfCalender = firstDayOfMonth.clone().subtract(numberOfWeekDay - 1, 'days')

const props = defineProps({
  filter: {
    type: Object,
    required: true
  }
})

const monthDays = ref([
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'cб',
    'вс'
])

const isOpen = ref(false)

const onClick = () => {
  isOpen.value = true
}

const onClickOutside = () => {
  isOpen.value = false
}

const calculateDate = (index) => {
  return firstDayOfCalender.clone().add(index, 'days').format('D')
}

const pickDate = (index) => {
  pickedDate.value = firstDayOfCalender.clone().add(index, 'days').format('DD.MM.YYYY')

  isOpen.value = false
}

const isNotCurrentMonth = (index) => {

  const currentMonth = Number(firstDayOfMonth.format('M'))
  const iterationMonth = Number(firstDayOfCalender.clone().add(index, 'days').format('M'))

  return iterationMonth < currentMonth || iterationMonth > currentMonth
}
</script>

<template>
  <div class="browser__filter">
    <label :for="filter.id" class="browser__filter-name">{{ filter.title }}</label>
    <div class="browser__filter-container date" v-click-outside="onClickOutside">
      <div class="date__input-container">
        <input type="text"
               @click="onClick"
               ref="input"
               :value="pickedDate"
        >
        <div class="date__input-icon">
          <svg>
            <use xlink:href="/img/temp_sprite.svg#calendar"/>
          </svg>
        </div>
        <div v-if="isOpen" class="date__dropdown">
          <div class="date__nav">
            <div class="date__arrow-container">
              <svg height="28px"><use xlink:href="/img/sprite.svg#left_single_arrow"/></svg>
            </div>
            <div class="date__month">{{ currentMonth }}</div>
            <div class="date__year">{{ currentYear }}</div>
            <div class="date__arrow-container">
              <svg height="28px"><use xlink:href="/img/sprite.svg#right_single_arrow"/></svg>
            </div>
          </div>
          <div class="date__calendar">
            <div class="date__calendar-row --days">
              <div class="date__calendar-cell" v-for="monthDay in monthDays">{{ monthDay }}</div>
            </div>
            <div class="date__calendar-row" v-for="(_, rowIndex) in Array(6)">
              <div class="date__calendar-cell" :class="{'--not-current': isNotCurrentMonth((rowIndex * 7) + rowCell)}" v-for="(_, rowCell) in Array(7)" @click="pickDate((rowIndex * 7) + rowCell)">{{ calculateDate((rowIndex * 7) + rowCell) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
