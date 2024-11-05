<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import SoundTrackTr from '~/components/CustomTr/SoundTrackTr.vue'

const props = defineProps<{
  item: IItem,
}>()

type IItem = Record<string, any>

const filters = ref({
  'track_id': [props.item!.id]
})

const columns = ref([
  {
    name: '_',
    title: 'Название и свойства'
  },
  {
    name: '_',
    title: 'Размер',
  },
  {
    name: '_',
    title: 'Время',
  },
  {
    name: '_',
    title: 'Обработка',
  },
  {
    name: '_',
    title: '',
  },
  {
    name: '_',
    title: '',
  },
]);

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
      h1="Вариации"
      url-prefix="sound/tracks/variations/browse"
      :filters="filters"
      :columns="columns"
      :is-enabled-search="true"
      :custom-tr="SoundTrackTr"
  />
</template>