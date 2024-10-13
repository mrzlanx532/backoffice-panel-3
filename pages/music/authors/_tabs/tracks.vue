<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import type { IColumn } from '~/composables/useBrowser'
import MusicAuthorsTrackTr from '~/components/CustomTr/MusicAuthorsTrackTr.vue'

const props = defineProps<{
  item?: IItem,
}>()

type IItem = Record<string, any>

const columns: IColumn[] = [
  {
    name: 'name_ru',
    title: 'Альбом',
  },
  {
    name: 'name_ru',
    title: 'Альбом',
  },
  {
    name: 'name_ru',
    title: 'Альбом',
  },
  {
    name: 'name_ru',
    title: 'Альбом',
  },
  {
    name: 'name_ru',
    title: 'Альбом',
  },
]

const filters = ref({
  'author_id': [props.item!.id]
})

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'author_id': [value!.id]
      }
    }
)
</script>

<template>
  <BrowserSmall
      :customTr="MusicAuthorsTrackTr"
      url-prefix="music/authors/tracks/browse"
      :filters="filters"
      :is-enabled-search="true"
      :is-enabled-t-head="false"
  />
</template>