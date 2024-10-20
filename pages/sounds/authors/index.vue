<script setup lang="ts">
import Browser from '~/components/Base/Browser/Browser.vue';

import { definePageMeta } from '#imports'
import MainTab from '~/pages/sounds/authors/_tabs/main.vue'
import TracksTab from '~/pages/sounds/authors/_tabs/tracks.vue'
import LibrariesTab from '~/pages/sounds/authors/_tabs/libraries.vue'
import Tabs from '~/components/Base/Tabs.vue'
import Button from '~/components/Base/Button.vue'
import Picture from '~/components/Base/Browser/ColumnComponents/Picture.vue'

definePageMeta({
  middleware: ['auth']
})

const {
  browserEl,
  item,

  onClickCreate,
  onClickEdit,
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
    component: MainTab
  },
  {
    title: 'Треки',
    component: TracksTab
  },
  {
    title: 'Библиотеки',
    component: LibrariesTab
  },
])

const requestProperties = ref([
  'id',
  'photo',
  'name_ru',
  'name_en',
  'ident',
  'tracks_counter',
  'libraries_counter',
  'created_at'
])

const columns = ref([
  {
    name: 'photo',
    title: 'ID',
    component: {
      component: Picture,
      title: 'name_ru'
    }
  },
  {
    name: 'name_ru',
    title: 'Имя'
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
    name: 'libraries_counter',
    title: 'Библиотеки',
  },
  {
    name: 'created_at',
    title: 'Создан',
    preset: {
      name: 'timestampToFormatPreset'
    }
  },
])
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Авторы шумовых треков"
      url-prefix="sound/authors/browse"

      detail-url-prefix="sound/authors/detail"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="sounds/authors"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickCreate({
          formURL: 'sound/authors/form',
          modalPath: 'sound/authors/form',
          modalTitle: 'Создать автор',
          notificationMessage: 'Автор создан'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'sound/authors/form',
          modalPath: 'sound/authors/form',
          modalTitle: 'Изменить автора',
          notificationMessage: 'Автор изменен'
        })" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'sound/authors/delete',
          notificationMessage: 'Автор удален'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
    </template>

    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>