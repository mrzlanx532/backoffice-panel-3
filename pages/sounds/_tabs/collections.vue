<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import SoundCollectionsByTrackTr from '~/components/CustomTr/SoundCollectionsByTrackTr.vue'
import Button from '~/components/Base/Button.vue'

const props = defineProps<{
  item: IItem,
}>()

type IItem = Record<string, any>

const filters = ref({
  'track_id': [props.item!.id]
})

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'track_id': [value!.id]
      }
    }
)
</script>

<template>
  <BrowserSmall
      h1="Коллекции"
      url-prefix="sound/tracks/collections/browse"
      :filters="filters"
      :is-enabled-search="true"
      :custom-tr="SoundCollectionsByTrackTr"
      :is-enabled-t-head="false"
  >
    <template #actions>
      <Button class="--success --small">Добавить</Button>
    </template>
  </BrowserSmall>
</template>