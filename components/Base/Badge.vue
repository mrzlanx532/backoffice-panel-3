<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <div class="badge">
    {{ label }}
  </div>
</template>