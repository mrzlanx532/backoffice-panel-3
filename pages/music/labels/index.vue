<script setup lang="ts">
import { defineAsyncComponent, type Ref } from 'vue'
import { definePageMeta, useNuxtApp } from '#imports'

import Browser, { type IItem } from '~/components/Base/Browser/Browser.vue'
import Tabs from '~/components/Base/Tabs.vue'
import Button from '~/components/Base/Button.vue'
import MainTab from '~/pages/music/labels/_tabs/-main.vue'
import TracksTab from '~/pages/music/labels/_tabs/-tracks.vue'
import AlbumsTab from '~/pages/music/labels/_tabs/-albums.vue'

const {
  $modal
} = useNuxtApp()

definePageMeta({
  middleware: ['auth']
})

const item: Ref<IItem|null> = ref(null)

const requestProperties = ref([
  'id',
  'name_ru',
  'ident',
  'tracks_counter',
  'albums_counter',
  'created_at'
])

const columns = ref([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'name_ru',
    title: 'Название'
  },
  {
    name: 'ident',
    title: 'Идентификатор',
  },
  {
    name: 'tracks_counter',
    title: 'Треки',
  },
  {
    name: 'albums_counter',
    title: 'Альбомы',
  },
  {
    name: 'created_at',
    title: 'Дата создания',
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])

const selectedTab = ref(0)

const tabs = [
  {
    title: 'Инфо',
    component: MainTab
  },
  {
    title: 'Треки',
    component: TracksTab
  },
  {
    title: 'Альбомы',
    component: AlbumsTab
  },
]

let selectedTabComponent = shallowRef(tabs[selectedTab.value].component)

watch(
    selectedTab,
    () => {
      selectedTabComponent.value = tabs[selectedTab.value].component
    }
)

const onClickEdit = () => {
  $modal.load('users/edit', {
    title: 'Создание пользователя'
  }).then(res => {
    console.log(res)
  })
}

const onClickDelete = () => {
  $modal.confirm({
    'question': 'Вы уверены?',
  }).then(confirm => {
    if (confirm) {
      console.log('Удаляем!!')
    }
  })
}

const onChangeSelectedTab = (tabIndex: number) => {
  selectedTab.value = tabIndex;
}


const onItemUpdated = (_item: IItem) => {
  item.value = _item
}
</script>

<template>
  <Browser
      h1="Музыкальные лейблы"
      url-prefix="music/labels"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      @itemUpdated="onItemUpdated"
  >
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
    </template>

    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>