<script setup lang="ts">
import { onMounted } from 'vue'
import moment, { type Moment } from 'moment'
import 'moment/dist/locale/ru'

interface IRow {
  value: string,
  moment: Moment
  isCurrentMonth: boolean,
  isSelectedValue: boolean,
  isToday: boolean
}

moment.locale('ru')

let currentDate = moment()
let currentDateStartOfDay = moment().startOf('day')
let calendarNavMoment = currentDate.clone()
let pickedDateMoment = null

const calendarNavMonth = ref(calendarNavMoment.format('MMMM'))
const calendarNavYear = ref(calendarNavMoment.format('YYYY'))

const pickedDate: Ref<null|string> = ref(null)

const calendarNumbersRows = ref([]);

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

const selectDate = (moment: Moment) => {

  pickedDateMoment = moment
  pickedDate.value = moment.format('DD.MM.YYYY')

  isOpen.value = false

  calendarNavMoment = moment
  calendarNavMonth.value = moment.format('MMMM')
  calendarNavYear.value = moment.format('YYYY')

  rebuildCalendarNumbersRows()
}

const onClickPrev = () => {

  calendarNavMoment.subtract(1, 'months')

  calendarNavMonth.value = calendarNavMoment.format('MMMM')
  calendarNavYear.value = calendarNavMoment.format('YYYY')

  rebuildCalendarNumbersRows()
}

const onClickNext = () => {
  calendarNavMoment.add(1, 'months')

  calendarNavMonth.value = calendarNavMoment.format('MMMM')
  calendarNavYear.value = calendarNavMoment.format('YYYY')

  rebuildCalendarNumbersRows()
}

const rebuildCalendarNumbersRows = () => {
  const _calendarNumbersRows = []

  const firstDayOfMonth = calendarNavMoment.clone().startOf('months')
  const numberOfWeekDay = firstDayOfMonth.format('d')

  const firstDayOfCalender = firstDayOfMonth.clone().subtract(numberOfWeekDay - 1, 'days')

  for (let i = 0; i < 6; i++) {

    const numbersRow: IRow[] = []

    for (let j = 0; j < 7; j++) {

      const moment = firstDayOfCalender.clone().add(j + (i * 7), 'days')

      numbersRow.push({
        value: moment.format('D'),
        moment: moment,
        isCurrentMonth: firstDayOfMonth.format('M') === moment.format('M'),
        isSelectedValue: pickedDateMoment !== null && pickedDateMoment.isSame(moment),
        isToday: currentDateStartOfDay.isSame(moment)
      })
    }

    _calendarNumbersRows.push(numbersRow)
  }

  calendarNumbersRows.value = _calendarNumbersRows
}

onMounted(() => rebuildCalendarNumbersRows())
</script>

<template>
  <div class="browser__filter">
    <label :for="filter.id" class="browser__filter-name">{{ filter.title }}</label>
    <div class="browser__filter-container date" v-click-outside="onClickOutside">
      <div class="date__input-container" :class="{'--is-open': isOpen}">
        <input type="text"
               @click="onClick"
               ref="input"
               :value="pickedDate"
        >
        <div class="date__input-icon" @click="onClick">
          <svg>
            <use xlink:href="/img/temp_sprite.svg#calendar"/>
          </svg>
        </div>
        <div v-if="isOpen" class="date__dropdown">
          <div class="date__nav">
            <div class="date__arrow-container" @click="onClickPrev">
              <svg height="28px"><use xlink:href="/img/sprite.svg#left_single_arrow"/></svg>
            </div>
            <div class="date__month">{{ calendarNavMonth }}</div>
            <div class="date__year">{{ calendarNavYear }}</div>
            <div class="date__arrow-container" @click="onClickNext">
              <svg height="28px"><use xlink:href="/img/sprite.svg#right_single_arrow"/></svg>
            </div>
          </div>
          <div class="date__calendar">
            <div class="date__calendar-row --days">
              <div class="date__calendar-cell" v-for="monthDay in monthDays">{{ monthDay }}</div>
            </div>
            <div class="date__calendar-row" v-for="calendarNumberRow in calendarNumbersRows">
              <div
                  class="date__calendar-cell"
                  :class="{
                    '--not-current': !calendarNumber.isCurrentMonth,
                    '--selected': calendarNumber.isSelectedValue,
                    '--today': calendarNumber.isToday
                  }"
                  v-for="calendarNumber in calendarNumberRow"
                  @click="selectDate(calendarNumber.moment)"
              >
                {{ calendarNumber.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
