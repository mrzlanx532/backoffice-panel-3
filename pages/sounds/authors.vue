<script setup lang="ts">
import Browser, { type IItem } from '@/components/Base/Browser/Browser.vue';

import type { Ref } from 'vue'
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
  'libraries_counter',
  'created_at'
])

const columns = ref([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'name_ru',
    title: 'Имя'
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
    name: 'libraries_counter',
    title: 'Библиотеки',
  },
  {
    name: 'created_at',
    title: 'Создан',
    preset: {
      name: 'timestampToFormatPreset'
    }
  },
])

const onItemUpdated = (item: IItem) => {
  item.value = item
}
</script>

<template>
  <Browser
      h1="Авторы шумовых треков"
      url-prefix="sound/authors"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="sounds/authors"
      @itemUpdated="onItemUpdated"
  />
</template>