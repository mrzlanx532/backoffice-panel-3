<script setup lang="ts">
import FlexTable from '~/components/Base/FlexTable.vue'
import Section from '~/components/Base/Section.vue'
import { ref } from 'vue'

const props = defineProps<{
  item: IItem|null
}>()

type IItem = {[key: string]: any}

const options = ref([
  {
    name: 'category',
    title: 'Категория',
    columnClass: 6,
    toFormat(item: IItem) {
      return item?.category?.name_ru
    }
  },
  {
    name: 'date',
    title: 'Дата',
    columnClass: 6
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    columnClass: 6,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    columnClass: 6,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])
</script>

<template>
  <div class="section__group">
    <Section>
    <template v-slot:header>
      Краткое содержание
    </template>
    <template v-slot:content>
      {{ props.item?.content_short ?? '[Не заполнено]' }}
    </template>
  </Section>
  <Section>
    <template v-slot:header>
      Полное содержание
    </template>
    <template v-slot:content>
      {{ props.item?.content ?? '[Не заполнено]' }}
    </template>
    </Section>
    <FlexTable :config="options" :item="props.item"/>
  </div>
</template>