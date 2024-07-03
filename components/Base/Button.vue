<template>
  <button
      :class="['btn', ...classes]"
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
}
</script>