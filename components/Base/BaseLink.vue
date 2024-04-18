<template>
  <div class="link">
    <div class="link__container">
      <a @click.self.prevent.stop="onClick"><slot/></a>
      <div class="link__underline"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Link",
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>