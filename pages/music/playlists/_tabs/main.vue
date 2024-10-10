<script setup lang="ts">
const props = defineProps<{
  item?: IItem,
}>()

const config = ref([
  {
    name: 'description_en',
    title: 'Описание',
    columnClass: 12
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    columnClass: 4,
    preset: { name: 'timestampToFormatPreset' },
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    columnClass: 4,
    preset: { name: 'timestampToFormatPreset' },
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    columnClass: 4,
  },
])

import FlexTable from '~/components/Base/FlexTable.vue'
</script>

<template>
  <FlexTable :item="props.item" :config="config"/>
</template>