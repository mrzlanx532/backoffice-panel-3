<script setup lang="ts">
import { Record } from 'immutable'

type IItem = Record<string, any>

const props = defineProps<{
  item?: IItem,
}>()

const config = ref([
  {
    name: 'name_en',
    title: 'Название (en)',
    columnClass: 6
  },
  {
    name: 'name_ru',
    title: 'Название (ru)',
    columnClass: 6,
  },
  {
    name: 'description_en',
    title: 'Описание (en)',
    columnClass: 6,
  },
  {
    name: 'description_ru',
    title: 'Описание (ru)',
    columnClass: 6,
  },
  {
    name: 'is_exclusive',
    title: 'Exclusive',
    columnClass: 6,
    toFormat(item: IItem) {
      return item.is_exclusive ? 'Да' : 'Нет'
    }
  },
  {
    name: 'a_list_is_active',
    title: 'A-List',
    columnClass: 6,
    toFormat(item: IItem) {
      return item.a_list_is_active ? 'Да' : 'Нет'
    }
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

import FlexTable from '~/components/Base/FlexTable.vue'
</script>

<template>
  <FlexTable :item="props.item" :config="config"/>
</template>