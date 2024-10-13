<script setup lang="ts">
import Browser, { type IItem } from '~/components/Base/Browser/Browser.vue';

import { definePageMeta } from '#imports'
import Tabs from '~/components/Base/Tabs.vue'
import Button from '~/components/Base/Button.vue'
import MainTab from '~/pages/sounds/libraries/_tabs/main.vue'
import TracksTab from '~/pages/sounds/libraries/_tabs/tracks.vue'

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

const requestProperties = ref([
  'id',
  'name_ru',
  'ident',
  'tracks_counter',
  'author',
  'created_at'
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
    name: 'author',
    title: 'Автор',
    toFormat(item: IItem) {
      return item.author?.name_ru
    }
  },
  {
    name: 'created_at',
    title: 'Создан',
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Библиотеки шумов"
      url-prefix="sound/libraries/browse"

      detail-url-prefix="sound/libraries/detail"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="sounds/libraries"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickCreate({
          formURL: 'sound/libraries/form',
          modalPath: 'sound/libraries/form',
          modalTitle: 'Создать библиотеку',
          notificationMessage: 'Библиотека создана'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'sound/libraries/form',
          modalPath: 'sound/libraries/form',
          modalTitle: 'Изменить библиотеку',
          notificationMessage: 'Библиотека изменена'
        })" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'sound/libraries/delete',
          notificationMessage: 'Коллекция удалена'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
    </template>

    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>