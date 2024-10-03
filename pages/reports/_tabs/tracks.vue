<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'

type IItem = {[key: string]: any}

const props = defineProps<{
  item?: IItem,
}>()

const params = ref({
  'report_id': props.item!.id
})

watch(
    () => props.item,
    (value) => {
      params.value = {
        'report_id': value!.id
      }
    }
)
</script>

<template>
<BrowserSmall
    url-prefix="reports/content/list"
    :params="params"
/>
</template>