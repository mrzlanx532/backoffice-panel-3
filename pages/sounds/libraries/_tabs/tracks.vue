<script setup lang="ts">
import BrowserSmall, { type IItem} from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import LibraryTracksTr from '~/components/CustomTr/LibraryTracksTr.vue'

const props = defineProps<{
  item?: IItem,
}>()

const filters = ref({
  'library_id': [props.item!.id]
})

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'library_id': [value!.id]
      }
    }
)

</script>

<template>
  <BrowserSmall
      h1="Треки"
      urlPrefix="sound/libraries/tracks/browse"
      :filters="filters"
      :customTr="LibraryTracksTr"
      :is-enabled-t-head="false"
  />
</template>
