<script setup lang="ts">
import TableSmall, { type IColumn } from '#backoffice-ui/components/TableSmall.vue'
import ReportTracksTr from '~/components/CustomTr/ReportTracksTr.vue'
import type { Ref } from 'vue'

type IItem = {[key: string]: any}

const props = defineProps<{
  item?: IItem,
}>()

const params = ref({
  'report_id': props.item!.id
})

const columns: Ref<IColumn[]> = ref([
  {
    name: '_',
    title: 'Название'
  },
  {
    name: '_',
    title: 'Исполнитель/Автор'
  },
  {
    name: '_',
    title: 'Лейбл/Библиотека'
  },
  {
    name: '_',
    title: 'Частичное использование'
  },
  {
    name: '_',
    title: ''
  },
])

watch(
    () => props.item,
    (value) => {
      params.value = {
        'report_id': value!.id
      }
    }
)
</script>

<template>
<TableSmall
    h1="Треки"
    url-prefix="reports/content/list"
    :params="params"
    :customTr="ReportTracksTr"
    :columns="columns"
    :is-enabled-search="false"
/>
</template>