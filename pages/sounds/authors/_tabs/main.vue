<script setup lang="ts">
import FlexTable from '~/components/Base/FlexTable/FlexTable.vue'
import FlexTablePicture from '~/components/Base/FlexTable/FlexTablePicture.vue'

type IItem = Record<any, string>

const config = ref([
  {
    name: 'photo',
    title: 'Изображение',
    class: 12,
    component: FlexTablePicture
  },
  {
    name: 'name_ru',
    title: 'Название (ru)',
    class: 6
  },
  {
    name: 'name_en',
    title: 'Название (en)',
    class: 6
  },
  {
    name: 'a_list_is_active',
    title: 'A-List',
    class: 12,
    toFormat(item: IItem) {
      return item.a_list_is_active ? 'Да' : 'Нет'
    }
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    class: 6
  },
  {
    name: 'libraries_counter',
    title: 'Кол-во библиотек',
    class: 6
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    preset: {name: 'timestampToFormatPreset'},
    class: 6,
  },
  {
    name: 'updated_at',
    title: 'Измекнен',
    preset: {name: 'timestampToFormatPreset'},
    class: 6,
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