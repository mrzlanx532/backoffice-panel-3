<script setup lang="ts">
import FlexTable from '#backoffice-ui/components/FlexTable.vue'

const props = defineProps<{
  item?: IItem,
}>()

const config = ref([
  {
    name: 'description_en',
    title: 'Описание',
    class: 12
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    class: 4,
    preset: { name: 'timestampToFormatPreset' },
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    class: 4,
    preset: { name: 'timestampToFormatPreset' },
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    class: 4,
  },
])
</script>

<template>
  <FlexTable :item="props.item" :config="config"/>
</template>