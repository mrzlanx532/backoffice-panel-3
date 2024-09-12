<script setup lang="ts">
import Section from '@/components/Base/Section.vue'
import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import { useNuxtApp, useRoute } from '#imports'
import { ref } from 'vue'
import { useAsyncData } from '#app'
import Tabs from '@/components/Base/Tabs.vue'
import TabMain from '~/pages/reports/_tabs/-main.vue'
import TabTracks from '~/pages/reports/_tabs/-tracks.vue'

type IItem = {[key: string]: any}

const route = useRoute()

const { $authFetch } = useNuxtApp()

const runtimeConfig = useRuntimeConfig()

const response = await useAsyncData(
    'report_detail',
    () => $authFetch(`${runtimeConfig.public.laravelAuth.domain}/reports/detail`, {
      params: {
        id: route.params.id,
      }
    })
)

const selectedTab = ref(0)
const entityId = route.params.id
const item: IItem = ref(response.data)
const h1 = ref('Отчет ' + entityId)

const onItemUpdated = (item: IItem) => {
  item.value = item
}

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
</script>
<template>
  <Detail
      :h1="h1"
      url-prefix="reports"
      :data-id="entityId"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button :class="['--big --outline-danger']">Удалить</Button>
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