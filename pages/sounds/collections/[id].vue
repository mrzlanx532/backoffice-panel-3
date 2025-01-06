<script setup lang="ts">
import { useRoute } from '#imports'

import Detail from '#backoffice-ui/components/Detail.vue'
import Button from '#backoffice-ui/components/Button.vue'
import Tabs from '#backoffice-ui/components/Tabs.vue'

import MainTab from '~/pages/sounds/collections/_tabs/main.vue'
import TracksTab from '~/pages/sounds/collections/_tabs/tracks.vue'

const {
  item,

  onClickEdit,
  onClickDelete,
  onItemUpdated,

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

await SSRLoadDetail(item,'sound/collections/detail', route.params.id)
</script>

<template>
  <Detail
      :h1="'Коллекция ' + route.params.id"
      :data-id="route.params.id"
      url-prefix="sounds/collections"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'sound/collections/form',
          modalPath: 'sound/collections/form',
          modalTitle: 'Редактировать коллекцию',
          notificationMessage: 'Коллекция изменена'
        })"  :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'sound/collections/delete',
          notificationMessage: 'Коллекция удалена',
          redirectURL: '/sounds/collections'
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