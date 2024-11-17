<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick, type PropType } from 'vue'

interface IOption {
  id: number,
  title: string
}

interface IComponentData {
  options: IOption[]
  isMultiple: boolean,
  inverse?: boolean
}

const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  modelValue: {
    required: false,
    type: [Number, String, Array]
  },
  errors: {
    type: Array,
    required: false,
    default: []
  },
  componentData: {
    type: Object as PropType<IComponentData>,
    required: true
  }
})

const select__dropdown = useTemplateRef<HTMLElement>('select__dropdown')
const selected__container = useTemplateRef<HTMLElement>('selected__container')

const isSelecting = ref(false)
const inverseRender = ref(false)
const selectedItems = ref({})
const selectedId = ref(null)
const topPxStyle = ref('0')
const selectedItemOrItems = ref(props.modelValue !== undefined ? props.modelValue : null)

const emit = defineEmits(['update:modelValue'])

watch(
    () => props.modelValue,
    (value) => {
      if (props.componentData.isMultiple) {
        props.componentData.options.forEach(option => {
          if (option.id === value) {
            selectedItemOrItems.value = option
          }
        })
        return
      }

      if (props.modelValue === null) {
        selectedItemOrItems.value = null
        selectedId.value = null
      }

      props.componentData.options.forEach(option => {
        if (option.id === value) {
          selectedItemOrItems.value = option
        }
      })
    }
)

const onClickOutside = () => isSelecting.value = false
const onClickSelectedValue = () => isSelecting.value = !isSelecting.value
const onDocumentVisibilityChange = () =>  {
  if (document.hidden) {
    isSelecting.value = false
  }
}
const onClickCancel = (index: number) => {
  if (props.componentData.isMultiple) {
    delete selectedItems.value[index]

    emit('update:modelValue', Object.values(selectedItems).map(item => item.id).filter(id => id !== undefined))

    return
  }

  emit('update:modelValue', null)
}
const onMouseDownOnDropdownOption = (option: IOption, index: number) => {

  if (props.componentData.isMultiple) {
    selectedItems.value[option.id] ? delete selectedItems.value[option.id] : selectedItems.value[option.id] = option

    emit('update:modelValue', Object.values(selectedItems.value).map(item => item.id).filter(id => id !== undefined))
    return
  }

  selectedItemOrItems.value = option
  selectedId.value = option.id
  isSelecting.value = false

  emit('update:modelValue', option.id)
  selected__container.value!.focus()
}

onMounted(() => {
  document.addEventListener('visibilitychange', onDocumentVisibilityChange)
})
onUnmounted(() => {
  document.removeEventListener('visibilitychange', onDocumentVisibilityChange)
})

const getInverseValue = (rect: DOMRect) => {
  if (
      props.componentData !== undefined &&
      props.componentData.inverse !== undefined &&
      props.componentData.inverse
  ) {
    return true
  }

  return window.innerHeight < (rect.height + rect.top)
}

watch(
    () => isSelecting.value,
    () => {

      nextTick(() => {
        if (select__dropdown.value === null) {
          inverseRender.value = false
          topPxStyle.value = '0';
          return
        }

        const rect = select__dropdown.value.getBoundingClientRect()

        inverseRender.value = getInverseValue(rect)

        const ro = new ResizeObserver(() => {
          if (inverseRender.value === false) {
            topPxStyle.value = '0'
            return
          }

          topPxStyle.value = ((rect.height + selected__container.value!.offsetHeight) * -1) + 'px'
        })

        ro.observe(selected__container.value!, {})
      })
    }
)

</script>

<template>
  <div>
    <div class="label">{{ label }}</div>
    <div class="select__container" v-click-outside="onClickOutside">
      <div
          tabindex="0"
          ref="selected__container"
          class="select__selected-container"
          :class="{
            '--open': isSelecting,
            '--multiple': componentData.isMultiple !== undefined ? componentData.isMultiple : false,
            '--inverse': inverseRender,
            '--has-errors': errors && errors[0]
          }"
          @click="onClickSelectedValue"
          @keyup.enter="onClickSelectedValue"
      >
        <div class="select__active-select_multiple" v-if="componentData.isMultiple">
          <transition-group name="list">
            <div
                class="select__active-select-option"
                @click.stop.prevent
                v-for="(selectedItem, index) in selectedItems"
                :key="index"
            >
              <div class="select__active-select-option-title">
                {{ selectedItem.title }}
              </div>
              <div class="select__active-select-option-cancel" @click.stop="onClickCancel(index)">
                <svg>
                  <use xlink:href="/img/sprite.svg#cancel_cross_bold"></use>
                </svg>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="select__active-select" v-else>{{ selectedItemOrItems?.title }}</div>
        <div
            class="select__active-select-remove-button"
            v-if="selectedId !== null"
            @click.stop="onClickCancel"
        >
          <svg>
            <use xlink:href="/img/temp_sprite.svg#min_cross"/>
          </svg>
        </div>
        <div
            class="select__dropdown-icon-container"
            :class="{'select__dropdown-icon-container_open': isSelecting}"
        ></div>
      </div>
      <div
          v-if="isSelecting"
          class="select__dropdown-container"
          :style="{top: topPxStyle}"
      >
        <div
            ref="select__dropdown"
            class="select__dropdown"
            :class="{'--inverse': inverseRender}"
            v-scrollable="{classes: ['--without-track', '--smart-opacity']}"
        >
          <template v-if="componentData.options.length > 0">
            <div
                v-for="(option, index) in componentData.options"
                :key="option.id"
                class="select__dropdown-option"
                :class="{'select__dropdown-option_selected': selectedItems[option.id]}"
                @mouseup="onMouseDownOnDropdownOption(option, index)"
            >{{ option.title }}</div>
          </template>
          <div v-else class="select__dropdown-option select__dropdown-option_empty">Нет записей</div>
        </div>
      </div>
    </div>
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: opacity .2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0 !important;
}
</style>