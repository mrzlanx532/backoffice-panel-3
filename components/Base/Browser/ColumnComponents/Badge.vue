<script setup lang="ts">
import Badge from '@/components/Base/Badge.vue'

const props = defineProps<{
  item: {[key: string]: any}
}>()
</script>

<template>
  <Badge :label="item.state.title" class="--success"/>
</template>