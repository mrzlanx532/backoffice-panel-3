<script setup lang="ts">
import BrowserSmall from '#backoffice-ui/components/BrowserSmall.vue'
import Button from '#backoffice-ui/components/Button.vue'

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
      h1="Треки"
      :customTr="SoundAuthorsTrackTr"
      url-prefix="sound/authors/tracks/browse"
      :filters="filters"
      :is-enabled-search="true"
      :is-enabled-t-head="false"
  >
    <template #actions>
      <Button class="--small --success">Добавить</Button>
    </template>
  </BrowserSmall>
</template>