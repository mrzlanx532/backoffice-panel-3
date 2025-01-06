<script setup lang="ts">
import FlexTable, { type IItem, type IConfigItem } from '#backoffice-ui/components/FlexTable.vue'
import type { Ref } from 'vue'

const props = defineProps<{
  item?: IItem,
}>()

const config: Ref<IConfigItem[]> = ref([
  {
    name: 'description_en',
    title: 'Описание',
    class: 12,
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    class: 4,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    class: 4,
    preset: {
      name: 'timestampToFormatPreset',
    }
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