<script setup lang="ts">
import type { Ref } from 'vue'
import { definePageMeta } from '#imports'

import Browser, { type IItem } from '~/components/Base/Browser/Browser.vue'

definePageMeta({
  middleware: ['auth']
})

const item: Ref<IItem|null> = ref(null)

const requestProperties = ref([
  'id',
  'name_ru',
  'tracks_counter',
  'albums_counter',
  'created_at'
])

const columns = ref([
  {
    name: 'id',
    title: 'ID',
    classes: [
      '--min-width'
    ]
  },
  {
    name: 'name_ru',
    title: 'Имя',
    classes: [
      '--max-width-200'
    ]
  },
  {
    name: 'tracks_counter',
    title: 'Треки',
    classes: [
      '--max-width-200'
    ]
  },
  {
    name: 'albums_counter',
    title: 'Альбомы',
    classes: [
      '--max-width-200'
    ]
  },
  {
    name: 'created_at',
    title: 'Создан',
    classes: [
      '--min-width'
    ],
    preset: {
      name: 'timestampToFormatPreset',
    },
  },
])

const onItemUpdated = (item: IItem) => {
  item.value = item
}
</script>

<template>
  <Browser
      h1="Авторы музыкальных треков"
      url-prefix="music/authors/browse"

      detail-url-prefix="music/authors/detail"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="music/authors"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  />
</template>