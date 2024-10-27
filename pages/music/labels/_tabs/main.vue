<script setup lang="ts">
import FlexTable, { type IItem } from '~/components/Base/FlexTable/FlexTable.vue'

const props = defineProps<{
  item?: IItem,
}>()

const config = ref([
  {
    name: 'name_ru',
    title: 'Название',
    columnClass: 6
  },
  {
    name: 'subtitle',
    title: 'Подзаголовок',
    columnClass: 6
  },
  {
    name: 'description_ru',
    title: 'Описание',
    columnClass: 12,
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    columnClass: 3,
  },
  {
    name: 'albums_counter',
    title: 'Кол-во альбомов',
    columnClass: 3,
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    columnClass: 3,
    preset: { name: 'timestampToFormatPreset' },
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    columnClass: 3,
    preset: { name: 'timestampToFormatPreset' },
  },
])
</script>

<template>
  <FlexTable :item="props.item" :config="config"/>
</template>