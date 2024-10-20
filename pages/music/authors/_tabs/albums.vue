<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import type { IColumn } from '~/composables/useBrowser'

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
    title: 'Лейбл',
    toFormat(item: IItem) {
      return item.label ? item.label.name_ru : '-'
    }
  },
  {
    name: 'tracks_counter',
    title: 'Треки',
    classes: ['--min-width']
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

const onClickRow = () => {
  window.open('/music/albums/' + props.item.id)
}
</script>

<template>
<BrowserSmall
    h1="Альбомы"
    @click-row="onClickRow"
    url-prefix="music/authors/albums/browse"
    :columns="columns"
    :filters="filters"
    :is-enabled-search="true"
/>
</template>