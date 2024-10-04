<script setup lang="ts">
import { definePageMeta, usePage } from '#imports'

import Button from '~/components/Base/Button.vue'
import Browser, { type IItem } from '~/components/Base/Browser/Browser.vue'
import Tabs from '~/components/Base/Tabs.vue'
import TabMain from '~/pages/music/albums/_tabs/main.vue'
import TabTracks from '~/pages/music/albums/_tabs/tracks.vue'

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

const requestProperties = ref([
  'id',
  'name_ru',
  'author',
  'label',
  'ident',
  'tracks_counter',
  'created_at'
])

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

const columns = shallowRef([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'name_ru',
    title: 'Название'
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

const onTabChange = (tab: number) => {
  selectedTab.value = tab
}
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
          modalPath: 'music/albums/form',
          modalTitle: 'Создать альбом',
          notificationMessage: 'Альбом создан'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>

    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'music/albums/form',
          modalPath: 'music/albums/form',
          modalTitle: 'Изменить альбом',
          notificationMessage: 'Альбом изменен'
        })" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'music/albums/delete',
          notificationMessage: 'Альбом удален',
          redirectURL: '/music/albums'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs :tabs="tabs" @change="onTabChange"/>
    </template>

    <template #browserDetailContent>
      <component :is="tabs[selectedTab].component" :item="item"/>
    </template>
  </Browser>
</template>