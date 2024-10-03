<script setup lang="ts">
import { ref } from 'vue'
import { useNuxtApp, useRoute, useAsyncData } from '#imports'

import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import Tabs from '@/components/Base/Tabs.vue'
import MainTab from '~/pages/music/labels/_tabs/main.vue'
import TracksTab from '~/pages/music/labels/_tabs/tracks.vue'
import AlbumsTab from '~/pages/music/labels/_tabs/albums.vue'

const {
  $authFetch,
} = useNuxtApp()

const {
  item,

  onClickEdit,
  onClickDelete,
  onItemUpdated
} = usePage()

const route = useRoute()

const selectedTab = ref(0)

const tabs = [
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

let selectedTabComponent = shallowRef(tabs[selectedTab.value].component)

watch(
    selectedTab,
    () => {
      selectedTabComponent.value = tabs[selectedTab.value].component
    }
)

const onChangeSelectedTab = (tabIndex: number) => {
  selectedTab.value = tabIndex;
}

const response = await useAsyncData(
    'blog_detail',
    () => $authFetch('music/labels/detail', {
      params: {
        id: route.params.id,
      }
    })
)

item.value = ref(response.data)
</script>

<template>
  <Detail
      :h1="'Лейбл ' + route.params.id"
      :data-id="route.params.id"
      url-prefix="users"
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
          notificationMessage: 'Лейбл успешно удален'
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