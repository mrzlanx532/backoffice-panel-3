<script setup lang="ts">
import { definePageMeta, usePage } from '#imports'

import Browser from '#backoffice-ui/components/Browser.vue'
import Tabs from '#backoffice-ui/components/Tabs.vue'
import Button from '#backoffice-ui/components/Button.vue'
import MainTab from '~/pages/music/labels/_tabs/main.vue'
import TracksTab from '~/pages/music/labels/_tabs/tracks.vue'
import AlbumsTab from '~/pages/music/labels/_tabs/albums.vue'
import MusicLabelForm from '~/modals/music/MusicLabelForm.vue'

definePageMeta({
  middleware: ['auth']
})

const {
  browserEl,
  item,

  onClickCreate,
  onClickEdit,
  onClickDelete,
  onItemUpdated
} = usePage()

const {
  initTabs
} = useTabs()

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

const {
  tabs,
  selectedTabComponent,
  onChangeSelectedTab
} = initTabs([
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
])
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Музыкальные лейблы"
      url-prefix="music/labels/browse"

      detail-url-prefix="music/labels/detail"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="music/labels"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickCreate({
          formURL: 'music/labels/form',
          modalComponent: MusicLabelForm,
          modalTitle: 'Создать лейбл',
          notificationMessage: 'Лейбл создан'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'music/labels/form',
          modalComponent: MusicLabelForm,
          modalTitle: 'Изменить лейбл',
          notificationMessage: 'Лейбл изменен'
        })" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'music/labels/delete',
          notificationMessage: 'Лейбл удален'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
    </template>

    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>