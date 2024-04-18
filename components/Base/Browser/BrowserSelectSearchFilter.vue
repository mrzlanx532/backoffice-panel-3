<template>
  <div class="browser__filter">
    <div :for="filter.id" class="browser__filter-name">{{ filter.title }}</div>
    <div class="browser__filter-container select__container" v-click-outside="onClickOutside">
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
                <use xlink:href="/img/sprite.svg#cancel_cross_bold"></use>
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
            <use xlink:href="/img/sprite.svg#cancel_cross_bold"/>
          </svg>
        </div>
        <div
            class="select__dropdown-icon-container"
            :class="{'select__dropdown-icon-container_open': isSelecting}"
        ></div>
      </div>
      <div class="select__search-input-container">
        <input
            autocomplete="off"
            name="search"
            v-show="isSelecting"
            ref="input"
            type="text"
            class="select__search-input select__search-input_open"
            v-model="searchString"
        >
      </div>
      <div v-if="isSelecting" class="select__dropdown-container">
        <div class="select__dropdown select__dropdown_select-search" v-scrollable="{classes: ['--without-track', '--smart-opacity']}">
          <template v-if="filteredOptions.length > 0">
            <div
                v-for="(option, index) in filteredOptions"
                class="select__dropdown-option"
                :class="{'select__dropdown-option_selected': selectedItems[option.id]}"
                @mouseup="onMouseDownOnDropdownOption(filter.id, option, index)"
            >{{ option.title }}</div>
          </template>
          <div class="select__dropdown-option select__dropdown-option_empty" v-else>Нет записей</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'BrowserSelectSearchFilter',
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
      isSelecting: false,
      searchString: '',
      options: [],
      filteredOptions: []
    }
  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.onDocumentVisibilityChange)
  },
  created() {
    this.filteredOptions = this.filter.options

    document.addEventListener('visibilitychange', this.onDocumentVisibilityChange)
  },
  watch: {
    searchString: function (newValue) {
      this.filteredOptions = this.filter.options

      this.filteredOptions = this.filteredOptions.filter((option) => {
        return option.title.toLowerCase().includes(newValue.toLowerCase())
      })
    }
  },
  methods: {
    onDocumentVisibilityChange() {
      if (document.hidden) {
        this.isSelecting = false
      }
    },
    onClickSelectedValue() {
      this.searchString = ''

      this.$nextTick(() => {
        this.$nextTick(() => {
          if (this.$refs.input !== undefined) {
            this.$refs.input.focus()
          }
        })
      })

      this.isSelecting = !this.isSelecting
    },
    onMouseDownOnDropdownOption(filterName, option) {

      if (this.filter.config.multiple) {

        this.selectedItems[option.id] ? delete this.selectedItems[option.id] : this.selectedItems[option.id] = option

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
        delete this.selectedItems[index]

        this.$emit('filterValueChanged', {'id': filterName, 'value': Object.values(this.selectedItems).map(item => item.id)})
      }
    },
    onCrossClick(filterName) {
      this.selectedId = null
      this.selectedTitle = null

      this.$emit('filterValueChanged', {'id': filterName, 'value': null})
    },
  }
}
</script>