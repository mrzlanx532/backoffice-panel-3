<script setup lang="ts">
import BrowserPagination from '~/components/Base/Browser/BrowserPagination.vue'

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
    <BrowserPagination
        :per-page="20"
        :total="props.total"
        style="margin-top: 6px;"
    />
  </div>
</template>
