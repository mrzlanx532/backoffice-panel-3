<script setup lang="ts">
import type { Ref } from 'vue'
import { definePageMeta } from '#imports'

import Browser, { type IItem } from '@/components/Base/Browser/Browser.vue'

definePageMeta({
  middleware: ['auth']
})

const item: Ref<IItem|null> = ref(null)

const requestProperties = ref([
  'id',
  'name_ru',
  'ident',
  'tracks_counter',
  'albums_counter',
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
    name: 'albums_counter',
    title: 'Альбомы',
  },
  {
    name: 'created_at',
    title: 'Дата создания',
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
      h1="Музыкальные лейблы"
      url-prefix="music/labels"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      @itemUpdated="onItemUpdated"
  />
</template>