<script setup lang="ts">
import type { IFilter } from '~/components/Base/Browser/Browser.vue'
import type { Ref } from 'vue'

interface IOption {
  id: number|string,
  title: string
}

const props = defineProps<{
  modelValue?: any,
  filter: IFilter,
}>()

const emit = defineEmits(['update:modelValue'])

const selectedItems: Ref<{[key: string]: IOption}> = ref({})
const selectedId: Ref<string | number | null> = ref(null)
const selectedTitle: Ref<string | null> = ref(null)
const isSelecting = ref(false)
const inverseRender = ref(false)
const topPxStyle = ref('0')

const selectDropdownEl = useTemplateRef<HTMLDivElement>('selectDropdownEl')
const selectContainerEl = useTemplateRef<HTMLDivElement>('selectContainerEl')

const onDocumentVisibilityChange = () => {
  if (document.hidden) {
    isSelecting.value = false
  }
}

const onClickSelectedValue = () => {
  isSelecting.value = !isSelecting.value
}

const onMouseDownOnDropdownOption = (filterName: string, option: IOption) => {
  if (props.filter.config.multiple) {

    selectedItems.value[option.id] ? delete selectedItems.value[option.id] : selectedItems.value[option.id] = option

    emit('update:modelValue', props.filter.type, filterName, Object.values(selectedItems.value).map(item => item.id))
    return
  }

  selectedId.value = option.id
  selectedTitle.value = option.title
  isSelecting.value = false

  emit('update:modelValue', props.filter.type, filterName, option.id)
}

const onClickOutside = () => {
  isSelecting.value = false
}

const onClickCancel = (filterName: string, index: number) => {
  if (props.filter.config.multiple) {
    delete selectedItems.value[index]

    emit('update:modelValue', props.filter.type, filterName, Object.values(selectedItems.value).map(item => item.id))
  }
}

const onCrossClick = (filterName: string) => {
  selectedId.value = null
  selectedTitle.value = null

  emit('update:modelValue', props.filter.type, filterName, undefined)
}

watch(
    isSelecting,
    () => {
      nextTick(() => {
        if (selectDropdownEl.value === null) {
          inverseRender.value = false
          topPxStyle.value = '0';
          return
        }

        const rect = selectDropdownEl.value.getBoundingClientRect()

        inverseRender.value = window.innerHeight < (rect.height + rect.top)

        const ro = new ResizeObserver(() => {
          if (window.innerHeight >= (rect.height + rect.top)) {
            topPxStyle.value = '0'
            return
          }

          topPxStyle.value = ((rect.height + selectContainerEl.value!.offsetHeight) * -1) + 'px'
        })

        ro.observe(selectContainerEl.value!, {})
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
              <div class="select__active-select-option-cancel" @click.stop="onClickCancel(filter.id, index as number)">
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
          <template v-if="props.filter.options!.length > 0">
            <div
                v-for="option in props.filter.options"
                class="select__dropdown-option"
                :class="{'select__dropdown-option_selected': selectedItems[option.id]}"
                @mouseup="onMouseDownOnDropdownOption(props.filter.id, option)"
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