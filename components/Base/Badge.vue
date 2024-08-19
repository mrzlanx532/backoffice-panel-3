<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="badge">
    {{ title }}
  </div>
</template>