<script setup lang="ts">
import BrowserSmall from '#backoffice-ui/components/BrowserSmall.vue'
import MusicAuthorsTrackTr from '~/components/CustomTr/MusicAuthorsTrackTr.vue'

const props = defineProps<{
  item?: IItem,
}>()

type IItem = Record<string, any>

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
      h1="Треки"
      :customTr="MusicAuthorsTrackTr"
      url-prefix="music/authors/tracks/browse"
      :filters="filters"
      :is-enabled-search="true"
      :is-enabled-t-head="false"
  />
</template>