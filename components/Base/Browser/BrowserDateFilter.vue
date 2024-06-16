<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, type Ref } from 'vue'
import moment, { type Moment } from 'moment'
import 'moment/dist/locale/ru'

moment.locale('ru')

interface IRow {
  value: string,
  moment: Moment
  isCurrentMonth: boolean,
  isSelectedValue: boolean,
  isToday: boolean
}

interface IMonth {
  value: string,
  moment: Moment,
  isCurrentMonth: boolean,
}

interface IYear {
  value: string,
  moment: Moment,
  isCurrentYear: boolean,
}

const props = defineProps({
  filter: {
    type: Object,
    required: true
  }
})

const navMonthsIsOpen = ref(false)
const navYearsIsOpen = ref(false)
const isOpen = ref(false)
const isNeedToInverse = ref(false)

const startYearMoment = moment().set('year', 1900)
const endYearMoment = moment().set('year', 2100)

let currentDate = moment()
let currentDateStartOfDay = moment().startOf('day')
let calendarNavMoment = currentDate.clone()
let pickedDateMoment = null

const calendarNavMonth = ref(calendarNavMoment.format('MMMM'))
const calendarNavYear = ref(calendarNavMoment.format('YYYY'))

const months = ref([] as IMonth[])
const years = ref([])

const calendarNumbersRows = ref([]);

const pickedDate: Ref<null|string> = ref(null)

const yearSelectedEl: Ref<null|HTMLElement> = ref(null)
const yearContainerEl: Ref<null|HTMLElement> = ref(null)
const dropdownEl: Ref<null|HTMLElement> = ref(null)

const monthDays = ref([
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'cб',
    'вс'
])

watch(
    isOpen,
    ((newVal) => {
      nextTick(() => {
        if (newVal) {
          const rect = dropdownEl.value.getBoundingClientRect()

          isNeedToInverse.value = window.innerHeight < rect.height + rect.top
          return
        }

        isNeedToInverse.value = false
      })
    })
)

const onClick = () => {
  isOpen.value = true
}

const onClickOutside = () => {
  isOpen.value = false

  navMonthsIsOpen.value = false
  navYearsIsOpen.value = false
}

const selectDate = (moment: Moment) => {

  pickedDateMoment = moment
  pickedDate.value = moment.format('DD.MM.YYYY')

  isOpen.value = false

  calendarNavMoment = moment
  calendarNavMonth.value = moment.format('MMMM')
  calendarNavYear.value = moment.format('YYYY')

  buildCalendar()
}

const onClickPrev = () => {

  calendarNavMoment.subtract(1, 'months')

  calendarNavMonth.value = calendarNavMoment.format('MMMM')
  calendarNavYear.value = calendarNavMoment.format('YYYY')

  buildCalendar()
}

const onClickNext = () => {
  calendarNavMoment.add(1, 'months')

  calendarNavMonth.value = calendarNavMoment.format('MMMM')
  calendarNavYear.value = calendarNavMoment.format('YYYY')

  buildCalendar()
}

const buildNavYears = () => {

  const _years = [];

  const countOfMonth = endYearMoment.diff(startYearMoment, 'years')

  for (let i = 0; i < countOfMonth; i++) {

    const moment = startYearMoment.clone().add(i, 'year').startOf('day')

    _years.push({
        value: moment.format('YYYY'),
        moment: moment,
        isCalendarNavYear: moment.isSame(calendarNavMoment.clone().startOf('day')),
      } as IYear
    )
  }

  years.value = _years
}

const buildNavMonths = () => {
  months.value = moment()
      .localeData()
      .monthsShort()
      .map((month, index) => {

        const momentValue = moment().month(index).startOf('day')

        return {
          value: month.replace('.', ''),
          moment: momentValue,
          isCalendarNavMonth: momentValue.isSame(calendarNavMoment.clone().startOf('day'))
        } as IMonth
      })
}

const buildCalendar = () => {
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

const onClickNavMonth = () => {
  navMonthsIsOpen.value = true
  navYearsIsOpen.value = false
}

const onClickNavYear = () => {
  navYearsIsOpen.value = true
  navMonthsIsOpen.value = false

  nextTick(() => {
    yearContainerEl.value.scrollTo({
      top: yearSelectedEl.value[0].offsetTop,
    })
  })
}

const onSelectMonth = (month: IMonth) => {
  calendarNavMoment = month.moment
  calendarNavMonth.value = month.moment.format('MMMM')

  buildNavMonths()
  buildCalendar()

  navMonthsIsOpen.value = false
}

const onSelectYear = (year) => {

  calendarNavMoment = year.moment
  calendarNavYear.value = year.moment.format('YYYY')

  buildNavYears()
  buildCalendar()

  navYearsIsOpen.value = false
  navMonthsIsOpen.value = false
}

const onDocumentVisibilityChange = () => {
  navYearsIsOpen.value = false
  navMonthsIsOpen.value = false
  isOpen.value = false
}

onMounted(() => {
  document.addEventListener('visibilitychange', onDocumentVisibilityChange)

  buildCalendar()
  buildNavMonths()
  buildNavYears()
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', onDocumentVisibilityChange)
})
</script>

<template>
  <div class="browser__filter">
    <label :for="filter.id" class="browser__filter-name">{{ filter.title }}</label>
    <div class="browser__filter-container date" v-click-outside="onClickOutside">
      <div class="date__input-container" :class="{'--is-open': isOpen, '--inverse': isNeedToInverse}">
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
        <div
            v-if="isOpen"
            class="date__dropdown"
            :class="{'--inverse': isNeedToInverse}"
            ref="dropdownEl"
        >
          <div class="date__nav">
            <div class="date__arrow-container --left" @click="onClickPrev">
              <svg height="28px"><use xlink:href="/img/sprite.svg#left_single_arrow"/></svg>
            </div>
            <div class="date__nav-center">
              <div class="date__nav-month" v-if="!navMonthsIsOpen" @click="onClickNavMonth">{{ calendarNavMonth }}</div>
              <div class="date__nav-year" v-if="!navYearsIsOpen" @click="onClickNavYear">{{ calendarNavYear }}</div>
            </div>
            <div class="date__arrow-container --right" @click="onClickNext">
              <svg height="28px"><use xlink:href="/img/sprite.svg#right_single_arrow"/></svg>
            </div>
          </div>
          <div class="date__calendar" v-if="!navMonthsIsOpen && !navYearsIsOpen">
            <div class="date__calendar-row --days">
              <div class="date__calendar-cell" v-for="monthDay in monthDays">{{ monthDay }}</div>
            </div>
            <hr/>
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
          <div class="date__months" v-if="!navYearsIsOpen && navYearsIsOpen">
            <div
                v-for="month in months"
                class="date__month"
                :class="{'--is-selected': month.isCalendarNavMonth}"
                @click="onSelectMonth(month)"
            >
              {{ month.value }}
            </div>
          </div>
          <div class="date__years" ref="yearContainerEl" v-scrollable="{classes: ['--without-track']}" v-if="navYearsIsOpen && !navMonthsIsOpen">
            <template v-for="year in years">
              <div
                  v-if="year.isCalendarNavYear"
                  class="date__year --is-selected"
                  ref="yearSelectedEl"
                  @click="onSelectYear(year)"
              >
                {{ year.value }}
              </div>
              <div
                  v-else
                  class="date__year"
                  @click="onSelectYear(year)"
              >
                {{ year.value }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
