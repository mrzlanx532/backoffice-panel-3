<script setup lang="ts">
import {type IRow, type IMonth, type IYear} from './types'
import { nextTick, onMounted, onUnmounted, defineEmits, type Ref } from 'vue'
import moment, { type Moment } from 'moment'
import 'moment/dist/locale/ru'
import { maskDate } from './mask'

moment.locale('ru')

const emit = defineEmits(['change'])

const props = defineProps({
  filter: {
    type: Object,
    required: true
  },
  rangeIndex: {
    type: Number,
    required: false
  },
  typeOf: {
    type: String,
    required: true,
    default: 'date'
  }
})

const secondsToCorrectTimezone = ((new Date().getTimezoneOffset() * -1) * 60)

const navMonthsIsOpen = ref(false)
const navYearsIsOpen = ref(false)
const isOpen = ref(false)
const isNeedToInverse = ref(false)

const startYearMoment = moment().subtract(100, 'year')
const endYearMoment = moment().add(100, 'year')

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
const timeInputEl: Ref<null|HTMLElement> = ref(null)

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

watch(
    pickedDate,
    ((newVal) => {
      if (newVal === null) {
        return
      }

      if (newVal.length === 10) {

        if (!moment(newVal, 'DD.MM.YYYY').isValid()) {
          return;
        }

        selectDate(moment(newVal, 'DD.MM.YYYY'), false)
      }
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

const selectDate = (moment: Moment, isNeedClose: boolean = true) => {

  pickedDateMoment = moment
  pickedDate.value = moment.format('DD.MM.YYYY')

  if (isNeedClose) {
    isOpen.value = false
  }

  calendarNavMoment = moment
  calendarNavMonth.value = moment.format('MMMM')
  calendarNavYear.value = moment.format('YYYY')

  buildCalendar()

  emit('change', {'value': pickedDateMoment.unix() + secondsToCorrectTimezone, 'rangeIndex': props.rangeIndex})
}

const onClickPrev = () => {

  calendarNavMoment = calendarNavMoment.clone().subtract(1, 'months')

  calendarNavMonth.value = calendarNavMoment.format('MMMM')
  calendarNavYear.value = calendarNavMoment.format('YYYY')

  buildCalendar()
}

const onClickNext = () => {
  calendarNavMoment = calendarNavMoment.clone().add(1, 'months')

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
  const numberOfWeekDay = Number(firstDayOfMonth.format('d'))
  const firstDayOfCalender = firstDayOfMonth.clone().subtract(numberOfWeekDay === 0 ? 6 : numberOfWeekDay - 1, 'days')

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

const onClickTimeInput = () => {
  if (timeInputEl.value.selectionStart < 3) {
    timeInputEl.value.setSelectionRange(0, 2)
  } else {
    timeInputEl.value.setSelectionRange(3, 5)
  }
}

const onClickRemove = () => {
  pickedDate.value = null

  emit('change', {'value': null, 'rangeIndex': props.rangeIndex})
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

const onKeydown = (e) => {
  maskDate(e, pickedDate)
}

const onKeydownEnter = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="date__input-container" v-click-outside="onClickOutside" :class="{'--is-open': isOpen, '--inverse': isNeedToInverse}">
    <div class="date__multiple-label" v-if="rangeIndex !== undefined">{{ rangeIndex === 0 ? 'от' : 'до' }}</div>
    <input
        @keydown.enter="onKeydownEnter"
        @keydown="onKeydown"
        :value="pickedDate"
        @click="onClick"
        ref="input"
    />
    <div class="date__input-remove-icon" @click="onClickRemove" v-if="pickedDate !== null">
      <svg>
        <use xlink:href="/img/temp_sprite.svg#min_cross"/>
      </svg>
    </div>
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
              @click="selectDate(calendarNumber.moment, false, props.typeOf === 'datetime')"
          >
            {{ calendarNumber.value }}
          </div>
        </div>
        <div class="date__time" v-if="typeOf === 'datetime'">
          <div class="date__time-label">
            Время
          </div>
          <input type="text" ref="timeInputEl" value="23" @click="onClickTimeInput">
          <div class="date__time-delimiter">:</div>
          <input type="text" ref="timeInputEl" value="59" @click="onClickTimeInput">
          <div class="date__time-icon">
            <svg>
              <use xlink:href="/img/temp_sprite.svg#time"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="date__months" v-if="navMonthsIsOpen">
        <div
            v-for="month in months"
            class="date__month"
            :class="{'--is-selected': month.isCalendarNavMonth}"
            @click="onSelectMonth(month)"
        >
          {{ month.value }}
        </div>
      </div>
      <div class="date__years" ref="yearContainerEl" v-scrollable="{classes: ['--without-track']}" v-if="navYearsIsOpen">
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
</template>