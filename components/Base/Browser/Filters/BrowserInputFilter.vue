<script setup lang="ts">
import type { IFilter } from '~/components/Base/Browser/Browser.vue'
import type { Ref } from 'vue'
type IValue = string | undefined

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  filter: IFilter,
  modelValue?: [IValue] | [IValue, IValue]
}>()

let unconfirmedValue1: IValue = undefined
const value1: Ref<IValue> = ref()
const value2: Ref<IValue> = ref()

watch(
    () => props.modelValue,
    (value) => {
      if (props.filter.config.multiple) {

        if (value === undefined) {
          return
        }

        value1.value = value[0]
        value2.value = value[1]

        return
      }

      value1.value = value === undefined ? undefined : value[0]
    },
    { immediate: true }
)

const mapper: [Ref<IValue>, Ref<IValue>] = [
  value1,
  value2
]

const onBlur = () => {
  if (unconfirmedValue1 !== undefined) {
    emitSingleValue(unconfirmedValue1)
  }
}

const onInput = (e: InputEvent, param: number|undefined = undefined) => {

  if (props.filter.config.range && param !== undefined) {

    if (mapper[param].value === '') {
      emitDoubleValue()
    }

    return
  }

  unconfirmedValue1 = (e.target as HTMLInputElement).value

  if (unconfirmedValue1 === '') {
    unconfirmedValue1 = undefined
  }

  if (unconfirmedValue1 === undefined && value1.value !== unconfirmedValue1) {
    emitSingleValue(unconfirmedValue1)
  }
}

const onKeyUpEnter = (param: number|undefined = undefined) => {

  if (props.filter.config.range && param !== undefined) {

    if (mapper[param].value !== '' && mapper[param].value !== null) {
      emitDoubleValue()

      return
    }
  }

  if (unconfirmedValue1 !== undefined) {
    emitSingleValue(unconfirmedValue1)
  }
}
const onClickRemoveButton = (param: number|undefined = undefined) => {

  console.log('remove')

  if (props.filter.config.range && param !== undefined) {
    mapper[param].value = null
    emitDoubleValue()

    return
  }

  unconfirmedValue1 = undefined
  emitSingleValue(unconfirmedValue1)
}

const emitSingleValue = (value: IValue) => {
  emit('update:modelValue', props.filter.type, props.filter.id, value === undefined ? undefined : [value])
}

const emitDoubleValue = (value1: IValue, value2: IValue) => {
  emit('update:modelValue', props.filter.type, props.filter.id, [value1 === undefined ? undefined : value1, value2 === undefined ? undefined : value2])
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
              spellcheck="false"
              :value="value1"
              class="input input_range"
              type="text"
              @input="onInput($event as InputEvent, 0)"
              @keyup.enter="onKeyUpEnter(0)"
          >
          <div
              class="input__remove-button input__remove-button_range"
              @click="onClickRemoveButton(0)"
              v-show="value1 !== undefined"
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
              spellcheck="false"
              :value="value2"
              class="input"
              type="text"
              @input="onInput($event as InputEvent, 1)"
              @keyup.enter="onKeyUpEnter(1)"
          >
          <div
              class="input__remove-button input__remove-button_range"
              @click="onClickRemoveButton(1)"
              v-show="value2 !== undefined"
          >
            <svg>
              <use xlink:href="/img/temp_sprite.svg#min_cross"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="input__container" v-else>
        <input
            spellcheck="false"
            :value="value1"
            class="input"
            type="text"
            @input="onInput($event as InputEvent)"
            @keyup.enter="onKeyUpEnter(0)"
            @blur="onBlur"
        >
        <div
            class="input__remove-button"
            @click="onClickRemoveButton()"
            v-show="value1 !== undefined"
        >
          <svg>
            <use xlink:href="/img/temp_sprite.svg#min_cross"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>