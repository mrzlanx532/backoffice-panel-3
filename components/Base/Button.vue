<template>
  <button
      class="btn"
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
  },
}
</script>