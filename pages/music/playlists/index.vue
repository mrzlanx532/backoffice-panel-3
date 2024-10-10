<script setup lang="ts">
import { defineComponent, definePageMeta } from '#imports'

import Browser from '~/components/Base/Browser/Browser.vue';
import Tabs from '~/components/Base/Tabs.vue'
import Button from '~/components/Base/Button.vue'
import MainTab from '~/pages/music/playlists/_tabs/main.vue'
import TracksTab from '~/pages/music/playlists/_tabs/tracks.vue'
import { h } from 'vue'

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
  'name_en',
  'description_en',
  'description_ru',
  'tracks_counter'
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

const IdColumn = shallowRef(defineComponent(
    (props) => {
      return () => {
        return h('div', [
          h('p', { style: { color: 'black' }}, `#${props.item.id} ${props.item.name_en}`),
          h('p', { style: { color: 'grey' } }, `${props.item.description_en}`),
        ])
      }
    }, {
      props: {
        item: Object
      }
    }
))

const columns = ref([
  {
    name: 'id',
    title: 'ID',
    component: IdColumn
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    classes: ['--min-width']
  },
])
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Плейлисты музыкальных треков"
      url-prefix="music/playlists/browse"

      detail-url-prefix="music/playlists/detail"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="music/playlists"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickCreate({
          formURL: 'music/playlists/form',
          modalPath: 'music/playlists/form',
          modalTitle: 'Создать плейлист',
          notificationMessage: 'Плейлист создан'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'music/playlists/form',
          modalPath: 'music/playlists/form',
          modalTitle: 'Изменить лейбл',
          notificationMessage: 'Плейлист изменен'
        })" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'music/playlists/delete',
          notificationMessage: 'Плейлист удален'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
    </template>

    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>