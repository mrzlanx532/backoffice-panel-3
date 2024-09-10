<script setup lang="ts">
import Browser, { type IItem } from '@/components/Base/Browser/Browser.vue';

import { definePageMeta } from '#imports'
import { prepareDuration } from '~/helpers/functions-for-table-columns'

definePageMeta({
  middleware: ['auth']
})

const item: Ref<IItem|null> = ref(null)

const columns = ref([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'description_ru',
    title: 'Описание'
  },
  {
    name: 'library',
    title: 'Библиотека',
    toFormat(item: IItem) {
      return item.library?.name_ru
    }
  },
  {
    name: 'variation',
    title: 'Длительность',
    toFormat(item: IItem) {
      return prepareDuration(item.variation?.duration)
    }
  },
  {
    name: 'author',
    title: 'Автор',
    toFormat(item: IItem) {
      return item.author?.name_ru
    }
  },
  {
    name: 'downloads_counter',
    title: 'Кол-во скачиваний',
  },
  {
    name: 'created_at',
    title: 'Загружен',
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])

const requestProperties = ref([
  'id',
  'description_ru',
  'library',
  'variation',
  'author',
  'downloads_counter',
  'created_at'
])

const onItemUpdated = (item: IItem) => {
  item.value = item
}
</script>

<template>
  <Browser
      h1="Каталог шумовых треков"
      url-prefix="sound/tracks"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="description_ru"
      detail-page-url-prefix="sounds"
      @itemUpdated="onItemUpdated"
  />
</template>