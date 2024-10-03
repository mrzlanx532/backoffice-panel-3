<script setup lang="ts">
import { useRoute } from '#imports'
import { ref } from 'vue'

import Section from '~/components/Base/Section.vue'
import Detail from '~/components/Base/Detail.vue'
import Button from '~/components/Base/Button.vue'
import Tabs from '~/components/Base/Tabs.vue'
import TabMain from '~/pages/reports/_tabs/main.vue'
import TabTracks from '~/pages/reports/_tabs/tracks.vue'

const route = useRoute()

const {
  item,

  onClickDelete,
  onItemUpdated,

  SSRLoadDetail
} = usePage()

const selectedTab = ref(0)

const onChangeTab = (index: number) => {
  selectedTab.value = index
}

const tabs = shallowRef([
  {
    title: 'Инфо',
    component: TabMain
  },
  {
    title: 'Треки',
    component: TabTracks
  },
])

SSRLoadDetail(item, 'reports/detail', route.params.id)
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
          notificationMessage: 'Отчет удален'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template #content>
      <Section>
        <template v-slot:header>
          <Tabs :tabs="tabs" @change="onChangeTab"/>
        </template>
        <template v-slot:content>
          <component :is="tabs[selectedTab].component" :item="item"/>
        </template>
      </Section>
    </template>
  </Detail>
</template>