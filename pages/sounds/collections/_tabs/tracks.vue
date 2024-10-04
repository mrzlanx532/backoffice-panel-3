<script setup lang="ts">
import BrowserSmall, { type IItem} from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import CollectionTracksTr from '~/components/CustomTr/CollectionTracksTr.vue'

const props = defineProps<{
  item?: IItem,
}>()

const filters = ref({
  'track_collection_id': [props.item!.id]
})

const columns = ref([
  {
    name: '_',
    title: 'Название',
  },
  {
    name: '_',
    title: '',
    classes: ['--min-width']
  },
  {
    name: '_',
    title: '',
    classes: ['--min-width']
  },
  {
    name: '_',
    title: '',
    classes: ['--min-width']
  },
  {
    name: '_',
    title: '',
    classes: ['--min-width']
  },
])

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
      urlPrefix="sound/collections/tracks/browse"
      :filters="filters"
      :columns="columns"
      :customTr="CollectionTracksTr"
  />
</template>
