<script setup lang="ts">
import Browser, { type IItem } from '@/components/Base/Browser/Browser.vue';

import { definePageMeta } from '#imports'

const item: Ref<IItem|null> = ref(null)

definePageMeta({
  middleware: ['auth']
})

const requestProperties = ref([
  'id',
  'description_ru',
  'tracks_counter',
])

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
      h1="Коллекции шумов"
      url-prefix="sound/collections"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="sounds/collections"
      @itemUpdated="onItemUpdated"
  />
</template>