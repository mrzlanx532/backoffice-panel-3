<script setup lang="ts">
import { ref } from 'vue'
import { useNuxtApp, useRoute, useAsyncData } from '#imports'

import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import Tabs from '@/components/Base/Tabs.vue'
import MainTab from '~/pages/music/labels/_tabs/-main.vue'
import TracksTab from '~/pages/music/labels/_tabs/-tracks.vue'
import AlbumsTab from '~/pages/music/labels/_tabs/-albums.vue'

const {
  $modal,
  $authFetch,
  $notification
} = useNuxtApp()

type IItem = {[key: string]: any}

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

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

const onItemUpdated = (item: IItem) => {
  item.value = item
}

const response = await useAsyncData(
    'blog_detail',
    () => $authFetch(`${runtimeConfig.public.laravelAuth.domain}/music/labels/detail`, {
      params: {
        id: route.params.id,
      }
    })
)

const onClickEdit = async () => {
  const formResponse = await $authFetch(`http://backoffice-api.lsmlocal.ru/music/labels/form`, {
    method: 'GET',
    params: {
      id: item.value!.id,
    },
  })

  $modal.load('music/labels/form', {
    title: 'Изменение лейбла',
    id: item.value!.id,
    formResponse
  }).then(() => {
    browserEl.value!.reset();
  })
}

const onClickDelete = () => {
  $modal.confirm({
    'question': 'Вы уверены?',
  }).then(async confirm => {
    if (confirm) {
      await $authFetch('http://backoffice-api.lsmlocal.ru/music/labels/delete', {
        method: 'POST',
        body: {
          id: item.value!.id
        }
      })

      browserEl.value!.reset()
      $notification.push({type: 'success', message: 'Лейбл удален'})
    }
  })
}

const entityId = route.params.id
const item: IItem = ref(response.data)
const h1 = ref('Лейбл ' + entityId)
</script>

<template>
  <Detail
      :h1="h1"
      :data-id="entityId"
      url-prefix="users"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button @click="onClickEdit"  :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete" :class="['--big --outline-danger']">Удалить</Button>
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