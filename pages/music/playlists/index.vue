<script setup lang="ts">
import type { Ref } from 'vue'
import { definePageMeta } from '#imports'

import Browser, { type IItem } from '~/components/Base/Browser/Browser.vue';

definePageMeta({
  middleware: ['auth']
})

const item: Ref<IItem|null> = ref(null)

const requestProperties = ref([
  'id',
  'name_ru',
  'tracks_counter'
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
    name: 'tracks_counter',
    title: 'Кол-во треков',
  },
])

const onItemUpdated = (item: IItem) => {
  item.value = item
}
</script>

<template>
  <Browser
      h1="Плейлисты музыкальных треков"
      url-prefix="music/playlists"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      @itemUpdated="onItemUpdated"
  />
</template>