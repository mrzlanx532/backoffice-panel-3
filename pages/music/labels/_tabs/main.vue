<script setup lang="ts">
import FlexTable, { type IItem } from '#backoffice-ui/components/FlexTable.vue'

const props = defineProps<{
  item?: IItem,
}>()

const config = ref([
  {
    name: 'name_ru',
    title: 'Название',
    class: 6
  },
  {
    name: 'subtitle',
    title: 'Подзаголовок',
    class: 6
  },
  {
    name: 'description_ru',
    title: 'Описание',
    class: 12,
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    class: 3,
  },
  {
    name: 'albums_counter',
    title: 'Кол-во альбомов',
    class: 3,
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    class: 3,
    preset: { name: 'timestampToFormatPreset' },
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    class: 3,
    preset: { name: 'timestampToFormatPreset' },
  },
])
</script>

<template>
  <FlexTable :item="props.item" :config="config"/>
</template>