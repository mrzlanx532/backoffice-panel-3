<template>
  <div class="page__container">
    <h1 v-if="h1" class="page__title">{{ h1 }}</h1>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'Page',
  props: {
    h1: {
      type: String,
      required: false
    },
  }
}
</script>