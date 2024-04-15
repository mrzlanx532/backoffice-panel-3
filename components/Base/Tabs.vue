<template>
  <div
      class="tabs"
      ref="tabs"
      @mousedown="onMouseDown"
  >
    <div
        v-for="(tab, index) in tabs"
        class="tabs__item"
        :class="{'tabs__item_active': localSelectedItem === index}"
        @click="onClick(index)"
    >
      {{ tab.title }}
    </div>
  </div>
</template>
<script>
function documentPointerUpListener(vm) {
  vm.isDraggable = false
  vm.screenXWhenMouseDown = null
  vm.currentScrolledLeft = null

  this.removeEventListener('pointerup', vm.mouseUpListener)
  this.removeEventListener('pointermove', vm.mouseMoveListener)

  vm.mouseUpListener = null
  vm.mouseMoveListener = null
}

function documentPointerMoveListener(vm, e) {
  if (!vm.isDraggable) {
    return
  }

  vm.$refs.tabs.scrollTo(
      (vm.screenXWhenMouseDown + vm.currentScrolledLeft) - e.screenX,
      vm.$refs.tabs.offsetTop
  )
}

export default {
  name: "Tabs",
  props: {
    selectedItem: {
      required: false,
      type: Number,
      default: 0
    },
    tabs: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      localSelectedItem: this.selectedItem,

      /* Для перетаскивания */
      isDraggable: false,
      currentScrolledLeft: null,
      screenXWhenMouseDown: null,
    }
  },
  methods: {
    onClick(index) {
      this.localSelectedItem = index

      this.$emit('change', this.localSelectedItem)
    },
    onMouseDown(e) {
      this.isDraggable = true
      this.currentScrolledLeft = this.$refs.tabs.scrollLeft
      this.screenXWhenMouseDown = e.screenX

      const vm = this

      this.mouseUpListener = documentPointerUpListener.bind(document, vm)
      this.mouseMoveListener = documentPointerMoveListener.bind(null, vm)

      document.addEventListener('pointerup', this.mouseUpListener)
      document.addEventListener('pointermove', this.mouseMoveListener)
    }
  }
}
</script>