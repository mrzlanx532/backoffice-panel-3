<template>
  <div class="browser__pagination-count select">
    <div class="select__label">Показывать по</div>
    <div class="select__container" tabindex="0" v-click-outside="onClickOutside">
      <div
          class="select__selected-container"
          :class="{'select__selected-container_open': isSelecting}"
          @click="onClickSelectedValue"
      >
        <div class="select__active-select">{{ localSelectedValue }}</div>
        <div
            class="select__dropdown-icon-container"
            :class="{'select__dropdown-icon-container_open': isSelecting}"
        ></div>
      </div>
      <div v-if="isSelecting" class="select__dropdown-container">
        <div class="select__dropdown">
          <div
              class="select__dropdown-option"
              v-for="option in options"
              @mousedown="onMouseDownOnDropdownOption(option)"
          >{{ option }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'BrowserPaginationCountSelect',
  props: {
    optionsById: {
      type: Object,
      required: false
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    selectedValue: {
      type: Number,
      required: true
    }
  },
  created() {
    this.localSelectedValue = this.selectedValue;
  },
  data() {
    return {
      localSelectedValue: null,
      isSelecting: false
    }
  },
  methods: {
    onClickSelectedValue() {
      this.isSelecting = !this.isSelecting
    },
    onMouseDownOnDropdownOption(option) {

      this.localSelectedValue = option
      this.isSelecting = false

      this.$emit('change', this.localSelectedValue)
    },
    onClickOutside() {
      this.isSelecting = false
    },
  }
}
</script>