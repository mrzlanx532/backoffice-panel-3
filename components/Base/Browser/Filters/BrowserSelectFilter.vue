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
  filter: IFilter,
  optionsById?: {}
}>()

const emit = defineEmits(['filterValueChanged'])

const selectedItems = ref({})
const selectedId = ref(null)
const selectedTitle = ref(null)
const isSelecting = ref(false)
const inverseRender = ref(false)
const topPxStyle = ref(0)

const selectDropdownEl = ref(null)
const selectContainerEl = ref(null)

const onDocumentVisibilityChange = () => {
  if (document.hidden) {
    isSelecting.value = false
  }
}

const onClickSelectedValue = () => {
  isSelecting.value = !isSelecting.value
}

const onMouseDownOnDropdownOption = (filterName, option) => {
  if (props.filter.config.multiple) {

    selectedItems.value[option.id] ? delete selectedItems.value[option.id] : selectedItems.value[option.id] = option

    emit('filterValueChanged', {'id': filterName, 'value': Object.values(selectedItems.value).map(item => item.id)})
    return
  }

  selectedId.value = option.id
  selectedTitle.value = option.title
  isSelecting.value = false

  emit('filterValueChanged', {'id': filterName, 'value': option.id})
}

const onClickOutside = () => {
  isSelecting.value = false
}

const onClickCancel = (filterName, index) => {
  if (props.filter.config.multiple) {
    delete selectedItems.value[index]

    emit('filterValueChanged', {'id': filterName, 'value': Object.values(selectedItems.value).map(item => item.id)})
  }
}

const onCrossClick = (filterName) => {
  selectedId.value = null
  selectedTitle.value = null

  emit('filterValueChanged', {'id': filterName, 'value': null})
}

watch(
    isSelecting,
    () => {
      nextTick(() => {
        if (selectDropdownEl.value === null) {
          inverseRender.value = false
          topPxStyle.value = 0;
          return
        }

        const rect = selectDropdownEl.value.getBoundingClientRect()

        inverseRender.value = window.innerHeight < (rect.height + rect.top)

        const ro = new ResizeObserver(() => {
          if (window.innerHeight >= (rect.height + rect.top)) {
            topPxStyle.value = 0
            return
          }

          topPxStyle.value = ((rect.height + selectContainerEl.value.offsetHeight) * -1) + 'px'
        })

        ro.observe(selectContainerEl.value, {})
      })
    }
)

onMounted(() => {
  document.addEventListener('visibilitychange', onDocumentVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', onDocumentVisibilityChange)
})
</script>

<template>
  <div class="browser__filter">
    <div :for="filter.id" class="browser__filter-name">{{ filter.title }}</div>
    <div class="browser__filter-container select__container" tabindex="0" v-click-outside="onClickOutside">
      <div
          ref="selectContainerEl"
          class="select__selected-container"
          :class="{
            '--open': isSelecting,
            '--multiple': filter.config.multiple,
            '--inverse': inverseRender
          }"
          @click="onClickSelectedValue"
      >
        <div class="select__active-select_multiple" v-if="filter.config.multiple">
          <transition-group name="list">
            <div
                class="select__active-select-option"
                @click.stop.prevent
                v-for="(selectedItem, index) in selectedItems" :key="selectedItem.id"
            >
              <div class="select__active-select-option-title">
                {{ selectedItem.title }}
              </div>
              <div class="select__active-select-option-cancel" @click.stop="onClickCancel(filter.id, index)">
                <svg>
                  <use xlink:href="/img/temp_sprite.svg#min_cross"/>
                </svg>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="select__active-select" v-else>{{ selectedTitle }}</div>
        <div class="select__active-select-remove-button"
             v-if="selectedId !== null"
             @click.stop="onCrossClick(filter.id)"
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
            ref="selectDropdownEl"
            class="select__dropdown"
            :class="{'--inverse': inverseRender}"
            v-scrollable="{classes: ['--without-track', '--smart-opacity']}"
        >
          <template v-if="filter.options.length > 0">
            <div
                v-for="(option, index) in filter.options"
                class="select__dropdown-option"
                :class="{'select__dropdown-option_selected': selectedItems[option.id]}"
                @mouseup="onMouseDownOnDropdownOption(filter.id, option, index)"
            >{{ option.title }}</div>
          </template>
          <div v-else class="select__dropdown-option select__dropdown-option_empty">Нет записей</div>
        </div>
      </div>
    </div>
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