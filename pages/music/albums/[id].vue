<script setup lang="ts">
import Detail from '~/components/Base/Detail.vue'
import Tabs from '~/components/Base/Tabs.vue'
import Button from '~/components/Base/Button.vue'
import MainTab from '~/pages/music/albums/_tabs/main.vue'
import TracksTab from '~/pages/music/albums/_tabs/tracks.vue'
import MusicAlbumForm from '~/modals/music/MusicAlbumForm.vue'

const {
  item,

  onClickEdit,
  onClickDelete,

  SSRLoadDetail
} = usePage()

const {
  initTabs
} = useTabs()

const route = useRoute()

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

await SSRLoadDetail(item,'music/albums/detail', route.params.id)
</script>

<template>
  <Detail
      url-prefix="music/albums"
      :h1="'Альбом #' + route.params.id"
  >
    <template #header>
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
    </template>
    <template #content>
      <Tabs :tabs="tabs" @change="onChangeSelectedTab"/>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Detail>
</template>