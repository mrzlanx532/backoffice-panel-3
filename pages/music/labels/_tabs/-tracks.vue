<script setup lang="ts">
import type { Component, PropType } from 'vue'
import BrowserSmall from '~/components/Base/Browser/BrowserSmall.vue'

type IItem = {[key: string]: any}

const props = defineProps({
  item: {
    type: Object as PropType<IItem>,
    required: false
  }
})

const columns = [
  {
    name: 'name_en',
    title: 'Трек',
  },
  {
    name: 'duration',
    title: 'Трек',

  },
]

const filters = ref({
  'label_id': [props.item!.id]
})
</script>

<template>
  <BrowserSmall
      :filters="filters"
      :columns="columns"
      url-prefix="music/labels/tracks"
  />
</template>