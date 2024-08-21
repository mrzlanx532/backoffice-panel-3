<script setup lang="ts">
import type { Ref } from 'vue'

import Tabs from '~/components/Base/Tabs.vue'
import Browser from "@/components/Base/Browser/Browser.vue";
import Button from "@/components/Base/Button.vue"

import TabMain from '~/pages/reports/ignore/tabs/main.vue'
import TabTracks from '~/pages/reports/ignore/tabs/tracks.vue'

type IITem = {[key: string]: any}

definePageMeta({
  middleware: ['auth'],
})

const id: Ref<number|null> = ref(null)
const item: Ref<IITem|null> = ref(null)

const selectedTab = ref(0)

const tabs = shallowRef([
  {
    title: 'Инфо',
    component: TabMain
  },
  {
    title: 'Треки',
    component: TabTracks
  },
])

const requestProperties = ref([
  'id',
  'created_at',
  'name',
  'content_counter',
  'media',
  'region',
])

const columns = ref([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'created_at',
    title: 'Дата создания',
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'name',
    title: 'Название проекта',
  },
  {
    name: 'content_counter',
    title: 'Кол-во треков'
  },
  {
    name: 'media',
    title: 'Медиа'
  },
  {
    name: 'region',
    title: 'Территория',
  },
])

const onItemUpdated = (newItem: IITem) => {
  item.value = newItem
}

const onClickDelete = () => {
  console.log('Удаляем')
}

const onChangeTab = (index: number) => {
  selectedTab.value = index
}
</script>

<template>
  <Browser
      h1="Отчеты"
      url-prefix="reports"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name"
      @itemUpdated="onItemUpdated"
  >
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickDelete" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs :tabs="tabs" @change="onChangeTab"/>
    </template>
    <template #browserDetailContent>
      <component :is="tabs[selectedTab].component" :item="item"/>
    </template>
  </Browser>
</template>