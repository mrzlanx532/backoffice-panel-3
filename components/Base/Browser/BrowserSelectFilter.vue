<template>
  <div class="browser__filter">
    <div :for="filter.id" class="browser__filter-name">{{ filter.title }}</div>
    <div class="browser__filter-container select__container" tabindex="0" v-click-outside="onClickOutside">
      <div
          class="select__selected-container"
          :class="{
            'select__selected-container_open': isSelecting,
            'select__selected-container_multiple': filter.config.multiple
          }"
          @click="onClickSelectedValue"
      >
        <div class="select__active-select_multiple" v-if="filter.config.multiple">
          <div
              class="select__active-select-option"
              @click.stop.prevent
              v-for="(selectedItem, index) in selectedItems" :v-key="selectedItem.id"
          >
            <div class="select__active-select-option-title">
              {{ selectedItem.title }}
            </div>
            <div class="select__active-select-option-cancel" @click.stop="onClickCancel(filter.id, index)">
              <svg>
                <use xlink:href="img/sprite.svg#cancel_cross_bold"></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="select__active-select" v-else>{{ selectedTitle }}</div>
        <div class="select__active-select-remove-button"
             v-if="selectedId !== null"
             @click.stop="onCrossClick(filter.id)"
        >
          <svg>
            <use xlink:href="img/sprite.svg#cancel_cross_bold"/>
          </svg>
        </div>
        <div
            class="select__dropdown-icon-container"
            :class="{'select__dropdown-icon-container_open': isSelecting}"
        ></div>
      </div>
      <div v-if="isSelecting" class="select__dropdown-container">
        <div class="select__dropdown" v-scrollable="{classes: ['--without-track', '--smart-opacity']}">
          <template v-if="filter.options.length > 0">
            <div
                v-for="(option, index) in filter.options"
                class="select__dropdown-option"
                :class="{'select__dropdown-option_selected': selectedItems[option.id]}"
                @mouseup="onMouseDownOnDropdownOption(filter.id, option, index)"
            >{{ option.title }}</div>
          </template>
          <div class="select__dropdown-option select__dropdown-option_empty">Нет записей</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'BrowserSelectFilter',
  props: {
    filter: {
      type: Object,
      required: true
    },
    optionsById: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      selectedItems: {},
      selectedId: null,
      selectedTitle: null,
      isSelecting: false
    }
  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.onDocumentVisibilityChange)
  },
  created() {
    this.filteredOptions = this.filter.options

    document.addEventListener('visibilitychange', this.onDocumentVisibilityChange)
  },
  methods: {
    onDocumentVisibilityChange() {
      if (document.hidden) {
        this.isSelecting = false
      }
    },
    onClickSelectedValue() {
      this.isSelecting = !this.isSelecting
    },
    onMouseDownOnDropdownOption(filterName, option) {
      if (this.filter.config.multiple) {

        this.selectedItems[option.id] ? this.$delete(this.selectedItems, option.id) : this.$set(this.selectedItems, option.id, option)

        this.$emit('filterValueChanged', {'id': filterName, 'value': Object.values(this.selectedItems).map(item => item.id)})
        return
      }

      this.selectedId = option.id
      this.selectedTitle = option.title
      this.isSelecting = false

      this.$emit('filterValueChanged', {'id': filterName, 'value': option.id})
    },
    onClickOutside() {
      this.isSelecting = false
    },
    onClickCancel(filterName, index) {
      if (this.filter.config.multiple) {
        this.$delete(this.selectedItems, index)

        this.$emit('filterValueChanged', {'id': filterName, 'value': Object.values(this.selectedItems).map(item => item.id)})
      }
    },
    onCrossClick(filterName) {
      this.selectedId = null
      this.selectedTitle = null

      this.$emit('filterValueChanged', {'id': filterName, 'value': null})
    }
  }
}
</script>