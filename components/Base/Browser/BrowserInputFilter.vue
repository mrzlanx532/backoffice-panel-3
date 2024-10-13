<script setup lang="ts">
interface IFilter {
  id: string,
  title: string,
  type: keyof typeof FilterType,
  options?: {
    id: string,
    title: string,
  }[]
  config: {
    filter: boolean,
    hidden: boolean,
    mask: string|null,
    multiple: boolean,
    range: boolean,
    url: string
  }
}

const props = defineProps<{
  filter: IFilter
}>()

const singleValue = ref(null)
const doubleValueFirst = ref(null)
const doubleValueSecond = ref(null)

const emit = defineEmits(['filterValueChanged'])

const mapper = [
  doubleValueFirst,
  doubleValueSecond
]

const onBlur = () => {
  if (props.filter.config.range) {
    return
  }

  if (singleValue.value === null || singleValue.value === '') {
    return
  }

  emitSingleValue()
}

const onInput = (param: number|undefined = undefined) => {
  if (props.filter.config.range) {

    if (mapper[param].value === '') {
      emitDoubleValue()
    }

    return
  }

  if (singleValue.value === '') {
    emitSingleValue()
  }
}

const onKeyUpEnter = (param: number|undefined = undefined) => {
  if (props.filter.config.range) {

    if (mapper[param].value !== '' && mapper[param].value !== null) {
      emitDoubleValue()

      return
    }
  }

  if (singleValue.value !== '' && singleValue.value !== null) {
    emitSingleValue()
  }
}
const onClickRemoveButton = (param: number|undefined = undefined) => {
  if (props.filter.config.range) {
    mapper[param].value = null
    emitDoubleValue()

    return
  }

  singleValue.value = null
  emitSingleValue()
}

const emitSingleValue = () => {
  emit('filterValueChanged', {
    'id': props.filter.id,
    'value': singleValue.value
  })
}

const emitDoubleValue = () => {
  emit('filterValueChanged', {
    'id': props.filter.id,
    'value': [doubleValueFirst.value, doubleValueSecond.value]
  })
}
</script>

<template>
  <div class="browser__filter">
    <div :for="filter.id" class="browser__filter-name">{{ filter.title }}</div>
    <div class="browser__filter-container">
      <div class="input__container-flex" v-if="filter.config.range">
        <div class="input__container input__container_range">
          <div class="input__label">
            От
          </div>
          <input
              v-model="doubleValueFirst"
              class="input input_range"
              type="text"
              @input="onInput(0)"
              @keyup.enter="onKeyUpEnter(0)"
              @blur="onBlur"
          >
          <div
              class="input__remove-button input__remove-button_range"
              @click="onClickRemoveButton(0)"
              v-show="doubleValueFirst !== '' && doubleValueFirst !== null"
          >
            <svg>
              <use xlink:href="/img/temp_sprite.svg#min_cross"/>
            </svg>
          </div>
        </div>
        <div class="input__container input__container_range">
          <div class="input__label">
            До
          </div>
          <input
              v-model="doubleValueSecond"
              class="input"
              type="text"
              @input="onInput(1)"
              @keyup.enter="onKeyUpEnter(1)"
              @blur="onBlur"
          >
          <div
              class="input__remove-button input__remove-button_range"
              @click="onClickRemoveButton(1)"
              v-show="doubleValueSecond !== '' && doubleValueSecond !== null"
          >
            <svg>
              <use xlink:href="/img/temp_sprite.svg#min_cross"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="input__container" v-else>
        <input
            v-model="singleValue"
            class="input"
            type="text"
            @input="onInput"
            @keyup.enter="onKeyUpEnter"
            @blur="onBlur"
        >
        <div
            class="input__remove-button"
            @click="onClickRemoveButton"
            v-show="singleValue !== '' && singleValue !== null"
        >
          <svg>
            <use xlink:href="/img/temp_sprite.svg#min_cross"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>