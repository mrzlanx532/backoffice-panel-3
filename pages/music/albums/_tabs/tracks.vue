<script setup lang="ts">
import BrowserSmall from '#backoffice-ui/components/BrowserSmall.vue'
import MusicAlbumTrackTr from '~/components/CustomTr/MusicAlbumTrackTr.vue'

type IItem = {[key: string]: any}

const props = defineProps<{
  item?: IItem,
}>()

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
    h1="Треки"
    :custom-tr="MusicAlbumTrackTr"
    url-prefix="music/albums/tracks/browse"
    :filters="filters"
    :is-enabled-t-head="false"
    :is-enabled-search="true"
  />
</template>