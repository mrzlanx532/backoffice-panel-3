<script setup>
const props = defineProps({
  label: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  value: {
    required: false,
    default: ''
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

const localValue = defineModel()

const isSelecting = ref(false)
const inverseRender = ref(false)
const selectedItems = ref({})
const selectedTitle = ref(null)
const selectedId = ref(null)
const topPxStyle = ref(0)

const emit = defineEmits(['change'])

const onChange = () => emit('change', props.name, localValue)
const onClickOutside = () => isSelecting.value = false
const onClickSelectedValue = () => isSelecting.value = !isSelecting.value
const onClickCancel = (index) => {
  if (props.componentData.isMultiple) {
    delete selectedItems[index]

    emit('change', props.name, Object.values(selectedItems).map(item => item.id))
  }
}
const onCrossClick = () => {
  selectedId.value = null
  selectedTitle.value = null

  emit('change', props.name, null)
}
const onMouseDownOnDropdownOption = (option) => {
  if (props.componentData.isMultiple) {

    selectedItems[option.id] ? delete selectedItems[option.id] : selectedItems[option.id] = option

    emit('change', props.name, Object.values(selectedItems).map(item => item.id))
    return
  }

  selectedId.value = option.id
  selectedTitle.value = option.title
  isSelecting.value = false

  emit('change', props.name, option.id)
}
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
          <div
              class="select__active-select-option"
              @click.stop.prevent
              v-for="(selectedItem, index) in selectedItems" :key="selectedItem.id"
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
        </div>
        <div class="select__active-select" v-else>{{ selectedTitle }}</div>
        <div class="select__active-select-remove-button"
             v-if="selectedId !== null"
             @click.stop="onCrossClick"
        >
          <svg>
            <use xlink:href="/img/sprite.svg#cancel_cross_bold"/>
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
                class="select__dropdown-option"
                :class="{'select__dropdown-option_selected': selectedItems[option.id]}"
                @mouseup="onMouseDownOnDropdownOption(index)"
            >{{ option.title }}</div>
          </template>
          <div v-else class="select__dropdown-option select__dropdown-option_empty">Нет записей</div>
        </div>
      </div>
    </div>
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>