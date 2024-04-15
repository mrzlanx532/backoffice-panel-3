<template>
  <div class="browser__paginator">
    <div
        class="browser__paginator-arrow-container browser__paginator-arrow-container_left-double"
        :class="{'browser__paginator-arrow-container_disabled': leftArrowsIsDisabled}"
        @click="leftDoubleArrowClick"
    >
      <svg height="15px">
        <use xlink:href="img/sprite.svg#left_double_arrow"></use>
      </svg>
    </div>
    <div
        class="browser__paginator-arrow-container browser__paginator-arrow-container_left-single"
        :class="{'browser__paginator-arrow-container_disabled': leftArrowsIsDisabled}"
        @click="leftSingleArrowClick"
    >
      <svg height="15px">
        <use xlink:href="img/sprite.svg#left_single_arrow"></use>
      </svg>
    </div>
    <div>
      <input
          :value="value"
          @keyup="onKeyUp"
          @keypress="onKeypress"
          ref="paginatorInput"
          v-if="isSelecting"
          class="browser__paginator-input"
          type="text"
          @blur="isSelecting = false"
      >
      <div v-else @click="onClickPaginatorInputLabel"  class="browser__paginator-input-label">стр. {{ page }} из {{ totalPages }}</div>
    </div>
    <div
        class="browser__paginator-arrow-container browser__paginator-arrow-container_right-single"
        :class="{'browser__paginator-arrow-container_disabled': rightArrowsIsDisabled}"
        @click="rightSingleArrowClick"
    >
      <svg height="15px">
        <use xlink:href="img/sprite.svg#right_single_arrow"></use>
      </svg>
    </div>
    <div
        class="browser__paginator-arrow-container browser__paginator-arrow-container_right-double"
        :class="{'browser__paginator-arrow-container_disabled': rightArrowsIsDisabled}"
        @click="rightDoubleArrowClick"
    >
      <svg height="15px">
        <use xlink:href="img/sprite.svg#right_double_arrow"></use>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BrowserPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: false,
      default: 1
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isSelecting: false,
      value: ''
    }
  },
  computed: {
    totalPages: function () {

      let int = parseInt(this.total / this.perPage)

      if (int === 0) {
        return 1
      }

      return int + (this.total % this.perPage > 0 ? 1 : 0)
    },
    leftArrowsIsDisabled: function () {
      return this.page === 1;
    },
    rightArrowsIsDisabled: function () {
      return this.page === this.totalPages;
    }
  },
  methods: {
    leftDoubleArrowClick() {
      this.$emit('changePage', 1)
    },
    leftSingleArrowClick() {
      if (this.page === 1) {
        return
      }

      this.$emit('changePage', this.page - 1)
    },
    rightSingleArrowClick() {
      if (this.page === this.totalPages) {
        return
      }

      this.$emit('changePage', this.page + 1)
    },
    rightDoubleArrowClick() {
      this.$emit('changePage', this.totalPages)
    },
    onClickPaginatorInputLabel() {
      this.isSelecting = true

      this.$nextTick(() => {
        this.$refs.paginatorInput.focus()
      })
    },
    onKeyUp(e) {
      if (e.keyCode === 13) {
        if (e.target.value === '') {
          this.isSelecting = false
          return
        }

        let value = parseInt(e.target.value)

        if (value > this.totalPages) {
          value = this.totalPages
        }

        if (value === 0) {
          value = 1
        }

        this.$emit('changePage', value)
        this.isSelecting = false
      }
    },
    onKeypress(e) {
      if (e.key.match(/[0-9]+/) === null)  {
        e.preventDefault()
      }
    }
  }
}
</script>