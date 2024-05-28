<script setup>
import { onMounted, onUnmounted, watch, nextTick } from 'vue'

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
    type: [Number, String, Array]
  },
  errors: {
    type: Array,
    required: false,
    default: []
  },
  componentData: {
    type: Object,
    required: false
  }
})

const select__dropdown = ref(null)
const selected__container = ref(null)

const isSelecting = ref(false)
const inverseRender = ref(false)
const selectedItems = ref({})
const selectedTitle = ref(null)
const selectedId = ref(null)
const topPxStyle = ref(0)

const emit = defineEmits(['update:modelValue'])

const onClickOutside = () => isSelecting.value = false
const onClickSelectedValue = () => isSelecting.value = !isSelecting.value
const onDocumentVisibilityChange = () =>  {
  if (document.hidden) {
    isSelecting.value = false
  }
}
const onClickCancel = (index) => {
  if (props.componentData.isMultiple) {
    delete selectedItems.value[index]

    emit('update:modelValue', Object.values(selectedItems).map(item => item.id).filter(id => id !== undefined))
  }
}
const onMouseDownOnDropdownOption = (option, index) => {
  if (props.componentData.isMultiple) {
    selectedItems.value[option.id] ? delete selectedItems.value[option.id] : selectedItems.value[option.id] = option

    emit('update:modelValue', Object.values(selectedItems.value).map(item => item.id).filter(id => id !== undefined))
    return
  }

  selectedId.value = option.id
  selectedTitle.value = option.title
  isSelecting.value = false

  emit('update:modelValue', option.id)
}

onMounted(() => {
  document.addEventListener('visibilitychange', onDocumentVisibilityChange)
})
onUnmounted(() => {
  document.removeEventListener('visibilitychange', onDocumentVisibilityChange)
})

watch(
    () => isSelecting.value,
    () => {

      nextTick(() => {
        if (select__dropdown.value === null) {
          inverseRender.value = false
          topPxStyle.value = 0;
          return
        }

        const rect = select__dropdown.value.getBoundingClientRect()

        inverseRender.value = window.innerHeight < (rect.height + rect.top)

        const ro = new ResizeObserver(() => {
          if (window.innerHeight >= (rect.height + rect.top)) {
            topPxStyle.value = 0
            return
          }

          topPxStyle.value = ((rect.height + selected__container.value.offsetHeight) * -1) + 'px'
        })

        ro.observe(selected__container.value, {})
      })
    }
)

</script>

<template>
  <div>
    <div class="label">{{ label }}</div>
    <div class="select__container" tabindex="0" v-click-outside="onClickOutside">
      <div
          ref="selected__container"
          class="select__selected-container"
          :class="{
            '--open': isSelecting,
            '--multiple': componentData.isMultiple,
            '--inverse': inverseRender
          }"
          @click="onClickSelectedValue"
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
        <div class="select__active-select" v-else>{{ selectedTitle }}</div>
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