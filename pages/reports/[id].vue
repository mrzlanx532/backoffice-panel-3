<script setup lang="ts">
import { useRoute } from '#imports'

import Section from '#backoffice-ui/components/Section.vue'
import Detail from '#backoffice-ui/components/Detail.vue'
import Button from '#backoffice-ui/components/Button.vue'
import Tabs from '#backoffice-ui/components/Tabs.vue'

import TabMain from '~/pages/reports/_tabs/main.vue'
import TabTracks from '~/pages/reports/_tabs/tracks.vue'

const route = useRoute()

const {
  item,

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
    component: TabMain
  },
  {
    title: 'Треки',
    component: TabTracks
  },
])

await SSRLoadDetail(item, 'reports/detail', route.params.id)
</script>
<template>
  <Detail
      :h1="'Отчет #' + route.params.id"
      url-prefix="reports"
      :data-id="route.params.id"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button @click="onClickDelete({
          deleteURL: 'reports/delete',
          notificationMessage: 'Отчет удален',
          redirectURL: '/reports'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template #content>
      <Section>
        <template v-slot:header>
          <Tabs :tabs="tabs" @change="onChangeSelectedTab"/>
        </template>
        <template v-slot:content>
          <component :is="selectedTabComponent" :item="item"/>
        </template>
      </Section>
    </template>
  </Detail>
</template>