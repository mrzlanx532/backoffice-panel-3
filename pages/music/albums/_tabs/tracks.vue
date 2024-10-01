<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import TracksTr from '~/components/CustomTr/TrackTr.vue'

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
    :custom-tr="TracksTr"
    url-prefix="music/albums/tracks/browse"
    :filters="filters"
    :is-enabled-t-head="false"
  />
</template>