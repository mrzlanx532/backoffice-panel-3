<script setup lang="ts">
import FlexTable from '~/components/Base/FlexTable.vue'

const config = ref([
  {
    name: 'description_ru',
    title: 'Описание',
    columnClass: 12
  },
  {
    name: 'created_at',
    title: 'Создан',
    preset: {name: 'timestampToFormatPreset'},
    columnClass: 4
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    preset: {name: 'timestampToFormatPreset'},
    columnClass: 4,
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    columnClass: 4,
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