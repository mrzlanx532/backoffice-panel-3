<script setup lang="ts">
import { useRouter } from '#imports'

const router = useRouter()

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

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'label_id': [value!.id]
      }
    }
)

const onClickRow = (item: IItem) => {
  router.push('/music/albums/' + item.id)
}
</script>

<template>
  <BrowserSmall
      @click-row="onClickRow"
      :filters="filters"
      :columns="columns"
      url-prefix="music/labels/albums/browse"
  />
</template>