<script setup lang="ts">
import { useRoute } from '#imports'

import Detail from '~/components/Base/Detail.vue'
import Button from '~/components/Base/Button.vue'
import Tabs from '~/components/Base/Tabs.vue'
import MainTab from '~/pages/users/_tabs/main.vue'
import SubscriptionTab from '~/pages/users/_tabs/subscription.vue'
import DownloadedMusicTab from '~/pages/users/_tabs/downloaded_music.vue'
import DownloadedSoundTab from '~/pages/users/_tabs/downloaded_sounds.vue'
import ReportsTab from '~/pages/users/_tabs/reports.vue'

const route = useRoute()

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
    title: 'Подписка',
    component: SubscriptionTab
  },
  {
    title: 'Скачанное (музыка)',
    component: DownloadedMusicTab
  },
  {
    title: 'Скачанное (шумы)',
    component: DownloadedSoundTab
  },
  {
    title: 'Отчеты',
    component: ReportsTab
  },
])

await SSRLoadDetail(item, 'users/detail', route.params.id)
</script>

<template>
  <Detail
      :h1="'Пользователь #' + route.params.id"
      :data-id="route.params.id"
      url-prefix="users"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'users/form',
          modalPath: 'users/form',
          modalTitle: 'Изменение пользователя',
          notificationMessage: 'Пользователь изменен'
        })" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'users/delete',
          notificationMessage: 'Пользователь удален'
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