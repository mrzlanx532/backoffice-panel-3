<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import { useRouter } from '#imports'
import MusicLabelTrackTr from '~/components/CustomTr/MusicLabelTrackTr.vue'

const router = useRouter()

type IItem = {[key: string]: any}

const props = defineProps<{
  item?: IItem,
}>()

const filters = ref({
  'label_id': [props.item!.id]
})

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'label_id': [value!.id]
      }
    }
)

const onClickRow = (item: IItem) => {
  router.push('/music/' + item.id)
}
</script>

<template>
  <BrowserSmall
      h1="Треки"
      @click-row="onClickRow"
      :filters="filters"
      url-prefix="music/labels/tracks/browse"
      :is-enabled-t-head="false"
      :is-enabled-search="true"
      :custom-tr="MusicLabelTrackTr"
  />
</template>