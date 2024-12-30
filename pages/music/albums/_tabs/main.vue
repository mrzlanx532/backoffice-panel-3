<script setup lang="ts">
import FlexTable from '~/components/Base/FlexTable/FlexTable.vue'

const config = ref([
  {
    name: 'description_ru',
    title: 'Описание',
    class: 12
  },
  {
    name: 'created_at',
    title: 'Создан',
    preset: {name: 'timestampToFormatPreset'},
    class: 4
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    preset: {name: 'timestampToFormatPreset'},
    class: 4,
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    class: 4,
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