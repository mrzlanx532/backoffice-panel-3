<script setup lang="ts">
import Tabs from '~/components/Base/Tabs.vue'
import Browser from '~/components/Base/Browser/Browser.vue';
import Button from '~/components/Base/Button.vue'

import TabMain from '~/pages/reports/_tabs/main.vue'
import TabTracks from '~/pages/reports/_tabs/tracks.vue'

definePageMeta({
  middleware: ['auth'],
})

const {
  browserEl,
  item,

  onClickDelete,
  onItemUpdated,
} = usePage()

const {
  initTabs
} = useTabs()

const {
  tabs,
  selectedTabComponent,
  onChangeSelectedTab
} = initTabs([
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
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Отчеты"
      url-prefix="reports/browse"

      detail-url-prefix="reports/detail"
      detail-title-property="id"
      detail-subtitle-property="name"
      detail-page-url-prefix="reports"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  >
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickDelete({
          deleteURL: 'reports/delete',
          notificationMessage: 'Отчет успешно удален'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs :tabs="tabs" @change="onChangeSelectedTab"/>
    </template>
    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>