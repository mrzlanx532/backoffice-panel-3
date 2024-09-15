<script setup lang="ts">
const props = withDefaults(defineProps<{
  total?: number
}>(), {
  total: 0
})
</script>

<template>
  <div class="browser-small__paginator">
    <div class="browser-small__total">
      Всего: {{props.total}}
    </div>
    <div class="browser-small__pagination">

    </div>
  </div>
</template>
