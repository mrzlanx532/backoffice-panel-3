<script setup lang="ts">
import BrowserSmall, { type IColumn } from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import type { Ref } from 'vue'
import { prepareDuration } from '~/helpers/functions-for-table-columns'
import TracksTr from '~/components/CustomTr/TrackTr.vue'

type IItem = {[key: string]: any}

const props = defineProps<{
  item?: IItem,
}>()

const columns: Ref<IColumn[]> = ref([
  {
    name: 'name',
    title: 'Название',
    toFormat: (item: IItem) => {
      if (item.title_ru) {
        return `${item.title_en} (${item.title_ru})`
      }

      return item.title_en
    }
  },
  {
    name: 'duration',
    title: 'Продолжительность',
    toFormat: (item: IItem) => {
      if (item.variation && item.variation.duration) {
        return prepareDuration(item.variation.duration)
      }

      return '-'
    }
  }
])

const filters = ref({
  'album_id': [props.item!.id]
})

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'album_id': [value!.id]
      }
    }
)
</script>

<template>
  <BrowserSmall
    :custom-tr="TracksTr"
    url-prefix="music/albums/tracks/browse"
    :filters="filters"
    :is-enabled-t-head="false"
  />
</template>