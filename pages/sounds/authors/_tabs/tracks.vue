<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import SoundAuthorsTrackTr from '~/components/CustomTr/SoundAuthorsTrackTr.vue'

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
      :customTr="SoundAuthorsTrackTr"
      url-prefix="sound/authors/tracks/browse"
      :filters="filters"
      :is-enabled-search="true"
      :is-enabled-t-head="false"
  />
</template>