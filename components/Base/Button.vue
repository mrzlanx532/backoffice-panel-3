<template>
  <button
      :class="['btn', ...classes]"
      @click="onClick"
      :type="type"
  >
    <slot/>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default() {
        return 'button'
      }
    },
    classes: {
      type: Array,
      default() {
        return []
      }
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>