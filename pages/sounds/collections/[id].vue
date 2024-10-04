<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from '#imports'

import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import Tabs from '@/components/Base/Tabs.vue'
import MainTab from '~/pages/sounds/collections/_tabs/main.vue'
import TracksTab from '~/pages/sounds/collections/_tabs/tracks.vue'

const {
  item,

  onClickEdit,
  onClickDelete,
  onItemUpdated,

  SSRLoadDetail
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