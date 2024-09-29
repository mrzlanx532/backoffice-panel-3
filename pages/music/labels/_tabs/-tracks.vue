<script setup lang="ts">
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import { prepareDuration } from '~/helpers/functions-for-table-columns';

type IItem = {[key: string]: any}

const props = defineProps<{
  item?: IItem,
}>()

const columns = [
  {
    name: 'title',
    title: 'Название',
    toFormat: (item: IItem) => {
      return item.title_en + (item.title_ru ? ` (${item.title_ru})` : '')
    }
  },
  {
    name: 'duration',
    title: 'Продолжительность',
    toFormat: (item: IItem) => {
      return prepareDuration(item.variation?.duration)
    }
  },
  {
    name: '_',
    title: '',
    toFormat: (item: IItem) => {
      return '*Прослушать*';
    }
  },
  {
    name: '_',
    title: '',
    toFormat: (item: IItem) => {
      return '*Перейти по ссылке*';
    }
  },
]

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
</script>

<template>
  <BrowserSmall
      :filters="filters"
      :columns="columns"
      url-prefix="music/labels/tracks"
  />
</template>