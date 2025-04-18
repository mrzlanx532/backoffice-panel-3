<script setup lang="ts">
import { defineComponent, definePageMeta } from '#imports'
import { h } from 'vue'

import Browser from '#backoffice-ui/components/Browser.vue';
import Tabs from '#backoffice-ui/components/Tabs.vue'
import Button from '#backoffice-ui/components/Button.vue'

import MainTab from '~/pages/music/playlists/_tabs/main.vue'
import TracksTab from '~/pages/music/playlists/_tabs/tracks.vue'
import MusicPlaylistForm from '~/modals/music/MusicPlaylistForm.vue'

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
    class: '--min-width'
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
          modalComponent: MusicPlaylistForm,
          modalTitle: 'Создать плейлист',
          notificationMessage: 'Плейлист создан'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'music/playlists/form',
          modalComponent: MusicPlaylistForm,
          modalTitle: 'Изменить плейлист',
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