<script setup lang="ts">
import Browser from '~/components/Base/Browser/Browser.vue'
import MainTab from '~/pages/music/authors/_tabs/main.vue'
import TracksTab from '~/pages/music/authors/_tabs/tracks.vue'
import AlbumsTab from '~/pages/music/authors/_tabs/albums.vue'
import Button from '~/components/Base/Button.vue'
import Tabs from '~/components/Base/Tabs.vue'
import Picture from '~/components/Base/Browser/ColumnComponents/Picture.vue'
import MusicAuthorForm from '~/modals/music/MusicAuthorForm.vue'

definePageMeta({
  middleware: ['auth']
})

const requestProperties = ref([
  'id',
  'picture',
  'name_ru',
  'tracks_counter',
  'albums_counter',
  'created_at'
])

const columns = ref([
  {
    name: 'picture',
    title: 'ID',
    component: {
      component: Picture,
      title: 'name_ru',
      firstLetterAsImage: true
    },
    classes: [
      '--min-width'
    ]
  },
  {
    name: 'name_ru',
    title: 'Имя',
    classes: [
      '--max-width-200'
    ]
  },
  {
    name: 'tracks_counter',
    title: 'Треки',
    classes: [
      '--max-width-200'
    ]
  },
  {
    name: 'albums_counter',
    title: 'Альбомы',
    classes: [
      '--max-width-200'
    ]
  },
  {
    name: 'created_at',
    title: 'Создан',
    classes: [
      '--min-width'
    ],
    preset: {
      name: 'timestampToFormatPreset',
    },
  },
])

const {
  browserEl,
  item,

  onClickCreate,
  onClickEdit,
  onClickDelete,
  onItemUpdated,
} = usePage()

const { initTabs } = useTabs()

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
  }
])
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Авторы музыкальных треков"
      url-prefix="music/authors/browse"

      detail-url-prefix="music/authors/detail"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="music/authors"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickCreate({
          formURL: 'music/authors/form',
          modalComponent: MusicAuthorForm,
          modalTitle: 'Создать автора',
          notificationMessage: 'Автор создан'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'music/authors/form',
          modalComponent: MusicAuthorForm,
          modalTitle: 'Изменить автора',
          notificationMessage: 'Автор изменен'
        })" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'music/authors/delete',
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