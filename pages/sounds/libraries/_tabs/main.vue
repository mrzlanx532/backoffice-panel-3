<script setup lang="ts">
import FlexTable, { type IItem, type IConfigItem } from '~/components/Base/FlexTable.vue'
import type { Ref } from 'vue'

const props = defineProps<{
  item?: IItem,
}>()

const config: Ref<IConfigItem[]> = ref([
  {
    name: 'description_ru',
    title: 'Описание',
    columnClass: 12,
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    columnClass: 4,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    columnClass: 4,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    columnClass: 4,
  },
])
</script>

<template>
  <FlexTable :item="props.item" :config="config"/>
</template>