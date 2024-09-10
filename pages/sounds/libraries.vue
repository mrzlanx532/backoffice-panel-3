<script setup lang="ts">
import Browser, { type IItem } from '@/components/Base/Browser/Browser.vue';

import { definePageMeta } from '#imports'

definePageMeta({
  middleware: ['auth']
})

const item: Ref<IItem|null> = ref(null)

const requestProperties = ref([
  'id',
  'name_ru',
  'ident',
  'tracks_counter',
  'author',
  'created_at'
])

const columns = ref([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'name_ru',
    title: 'Название'
  },
  {
    name: 'ident',
    title: 'Идентификатор',
  },
  {
    name: 'tracks_counter',
    title: 'Треки',
  },
  {
    name: 'author',
    title: 'Автор',
    toFormat(item: IItem) {
      return item.author?.name_ru
    }
  },
  {
    name: 'created_at',
    title: 'Создан',
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])

const onItemUpdated = (item: IItem) => {
  item.value = item
}
</script>

<template>
  <Browser
      h1="Библиотеки шумов"
      url-prefix="sound/libraries"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="sounds/libraries"
      @itemUpdated="onItemUpdated"
  />
</template>