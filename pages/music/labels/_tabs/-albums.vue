<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'

type IItem = {[key: string]: any}

const props = defineProps<{
  item?: IItem,
}>()

const columns = [
  {
    name: '_',
    title: 'Альбом',
    toFormat: (item: IItem) => {
      return item.name_en + (item.name_ru ? ` (${item.name_ru})` : '-')
    }
  },
  {
    name: '_',
    title: 'Автор',
    toFormat: (item: IItem) => {
      return item.author ? item.author.name_en : '-'
    }
  },
  {
    name: 'tracks_counter',
    title: 'Треки',
  },
]

const filters = ref({
  'label_id': [props.item!.id]
})
</script>

<template>
  <BrowserSmall
      :filters="filters"
      :columns="columns"
      url-prefix="music/labels/albums"
  />
</template>