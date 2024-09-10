<script setup lang="ts">
import Section from '@/components/Base/Section.vue'
import FlexTable from '@/components/Base/FlexTable.vue'

const config = ref([
  {
    name: 'description',
    title: 'Описание',
    columnClass: 12
  },
  {
    name: 'created_at',
    title: 'Создан',
    preset: {name: 'timestampToFormatPreset'},
    columnClass: 6
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    preset: {name: 'timestampToFormatPreset'},
    columnClass: 6,
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
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
  <Section>
    <template #header>
      Инфо
    </template>
    <template #content>
      <FlexTable :item="item" :config="config"/>
    </template>
  </Section>
</template>