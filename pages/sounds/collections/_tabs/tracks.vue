<script setup lang="ts">
import BrowserSmall, { type IItem } from '#backoffice-ui/components/BrowserSmall.vue'
import CollectionTracksTr from '~/components/CustomTr/CollectionTracksTr.vue'

const props = defineProps<{
  item?: IItem,
}>()

const filters = ref({
  'track_collection_id': [props.item!.id]
})

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'track_collection_id': [value!.id]
      }
    }
)

</script>

<template>
  <BrowserSmall
      h1="Коллекции"
      urlPrefix="sound/collections/tracks/browse"
      :filters="filters"
      :customTr="CollectionTracksTr"
  />
</template>
