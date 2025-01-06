<script setup lang="ts">
import { definePageMeta } from '#imports'

import Button from '#backoffice-ui/components/Button.vue'
import Browser, { type IItem } from '#backoffice-ui/components/Browser.vue'
import Tabs from '#backoffice-ui/components/Tabs.vue'
import Picture from '#backoffice-ui/components/Browser/ColumnComponents/Picture.vue'

import TabMain from '~/pages/music/albums/_tabs/main.vue'
import TabTracks from '~/pages/music/albums/_tabs/tracks.vue'
import MusicAlbumForm from '~/modals/music/MusicAlbumForm.vue'

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
  'picture',
  'name_ru',
  'author',
  'label',
  'ident',
  'tracks_counter',
  'created_at'
])

const {
  tabs,
  selectedTabComponent,
  onChangeSelectedTab,
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

const columns = shallowRef([
  {
    name: 'picture',
    title: 'Название',
    component: {
      component: Picture,
      title: 'name_ru'
    }
  },
  {
    name: 'author',
    title: 'Автор',
    toFormat(item: IItem) {
      return item.author?.name_ru
    }
  },
  {
    name: 'label',
    title: 'Лейбл',
    toFormat(item: IItem) {
      return item.label?.name_ru
    }
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
    name: 'created_at',
    title: 'Дата создания',
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Альбомы музыкальных треков"
      url-prefix="music/albums/browse"

      detail-url-prefix="music/albums/detail"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="music/albums"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickCreate({
          formURL: 'music/albums/form',
          modalComponent: MusicAlbumForm,
          modalTitle: 'Создать альбом',
          notificationMessage: 'Альбом создан'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>

    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'music/albums/form',
          modalComponent: MusicAlbumForm,
          modalTitle: 'Изменить альбом',
          notificationMessage: 'Альбом изменен'
        })" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'music/albums/delete',
          notificationMessage: 'Альбом удален',
          redirectURL: '/music/albums'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs :tabs="tabs" @change="onChangeSelectedTab"/>
    </template>

    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>