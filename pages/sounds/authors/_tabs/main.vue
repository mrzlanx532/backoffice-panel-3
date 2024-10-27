<script setup lang="ts">
import FlexTable from '~/components/Base/FlexTable/FlexTable.vue'
import FlexTablePicture from '~/components/Base/FlexTable/FlexTablePicture.vue'

type IItem = Record<any, string>

const config = ref([
  {
    name: 'photo',
    title: 'Изображение',
    columnClass: 12,
    component: FlexTablePicture
  },
  {
    name: 'name_ru',
    title: 'Название (ru)',
    columnClass: 6
  },
  {
    name: 'name_en',
    title: 'Название (en)',
    columnClass: 6
  },
  {
    name: 'a_list_is_active',
    title: 'A-List',
    columnClass: 12,
    toFormat(item: IItem) {
      return item.a_list_is_active ? 'Да' : 'Нет'
    }
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    columnClass: 6
  },
  {
    name: 'libraries_counter',
    title: 'Кол-во библиотек',
    columnClass: 6
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    preset: {name: 'timestampToFormatPreset'},
    columnClass: 6,
  },
  {
    name: 'updated_at',
    title: 'Измекнен',
    preset: {name: 'timestampToFormatPreset'},
    columnClass: 6,
  },
])

const props = defineProps({
  item: {
    type: Object
  }
})
</script>

<template>
  <FlexTable :item="props.item" :config="config"/>
</template>