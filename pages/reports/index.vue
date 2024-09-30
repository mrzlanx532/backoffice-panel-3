<script setup lang="ts">
import type { Ref } from 'vue'
import { useNuxtApp } from '#imports'

import Tabs from '~/components/Base/Tabs.vue'
import Browser, { type IItem } from '~/components/Base/Browser/Browser.vue';
import Button from '~/components/Base/Button.vue'

import TabMain from '~/pages/reports/_tabs/-main.vue'
import TabTracks from '~/pages/reports/_tabs/-tracks.vue'

definePageMeta({
  middleware: ['auth'],
})

const {
  $modal,
  $notification,
  $authFetch
} = useNuxtApp()

interface IBrowserEl {
  reset: (isUpdateItem?: boolean) => void,
  closeDetail: () => void
}

const browserEl: Ref<IBrowserEl|null> = ref(null)

const id: Ref<number|null> = ref(null)
const item: Ref<IItem|null> = ref(null)

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

const onItemUpdated = (newItem: IItem) => {
  item.value = newItem
}

const onClickDelete = () => {
  $modal.confirm().then(async (isAgree) => {
    if (!isAgree) {
      return
    }

    await $authFetch('reports/delete', {
      method: 'POST',
      body: {
        id: item.value.id,
      },
    })

    $notification.push({type: 'success', message: 'Отчет удален'})
    item.value = {}
    browserEl.value!.reset()
    browserEl.value!.closeDetail()
  })
}

const onChangeTab = (index: number) => {
  selectedTab.value = index
}
</script>

<template>
  <Browser
      ref="browserEl"
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