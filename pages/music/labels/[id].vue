<script setup lang="ts">
import { usePageTabs, useRoute, type ITabItem, definePageMeta } from '#imports'

import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import Tabs from '@/components/Base/Tabs.vue'
import MainTab from '~/pages/music/labels/_tabs/main.vue'
import TracksTab from '~/pages/music/labels/_tabs/tracks.vue'
import AlbumsTab from '~/pages/music/labels/_tabs/albums.vue'

definePageMeta({
  middleware: ['auth']
})

const {
  item,

  onClickEdit,
  onClickDelete,
  onItemUpdated,

  SSRLoadDetail
} = usePage()

const {
  onChangeSelectedTab,
  watchSelectedTab,
  initSelectedTabComponent,
} = usePageTabs()

const route = useRoute()

const tabs: ITabItem[] = [
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

const selectedTabComponent = initSelectedTabComponent(tabs)

watchSelectedTab(tabs, selectedTabComponent)

await SSRLoadDetail(item,'music/labels/detail', route.params.id)
</script>

<template>
  <Detail
      :h1="'Лейбл ' + route.params.id"
      :data-id="route.params.id"
      url-prefix="music/labels"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'music/labels/form',
          modalPath: 'music/labels/form',
          modalTitle: 'Редактировать лейбл',
          notificationMessage: 'Лейбл изменен'
        })"  :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'music/labels/delete',
          notificationMessage: 'Лейбл успешно удален',
          redirectURL: '/music/labels',
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template #content>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
      <ClientOnly>
        <Transition name="fade" mode="out-in">
          <component :is="selectedTabComponent" :item="item"/>
        </Transition>
      </ClientOnly>
    </template>
  </Detail>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>