<script setup lang="ts">
import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import Tabs from '@/components/Base/Tabs.vue';
import StateButton from '@/components/Base/StateButton.vue';
import MainTab from '~/pages/music/_tabs/main.vue'

import { useRoute } from '#imports'

type IItem = {[key: string]: any}

const route = useRoute()

const item: IItem = ref({})
const selectedState = ref({})

const {
  initTabs
} = useTabs()

const { tabs, selectedTabComponent, onChangeSelectedTab } = initTabs([
  {
    title: 'Инфо',
    component: MainTab
  },
  {
    title: 'Правообладатели',
    component: MainTab
  },
  {
    title: 'Вариации',
    component: MainTab
  },
  {
    title: 'Стемы',
    component: MainTab
  },
  {
    title: 'Лирика',
    component: MainTab
  },
  {
    title: 'Плейлисты',
    component: MainTab
  },
  {
    title: 'Еще раздел',
    component: MainTab
  },
  {
    title: 'И еще раздел',
    component: MainTab
  },
],)

const stateOptions = ref([
  {
    id: 'PUBLISHED',
    title: 'Опубликован',
    class: '--success'
  },
  {
    id: 'DRAFT',
    title: 'Черновик',
    class: '--default'
  },
  {
    id: 'DISABLED',
    title: 'Отключен',
    class: '--danger'
  }
])

const onItemUpdated = (_item: IItem) => {
  item.value = _item
}

const onChangeStateButton = (option) => {
  selectedState.value = option
}
</script>

<template>
  <Detail
      :h1="'Трек #' + route.params.id"
      url-prefix="music"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button :class="['--big --outline-primary']">Изменить</Button>
        <Button :class="['--big --outline-danger']">Удалить</Button>
        <StateButton
            class="ml_10"
            :data-id="item.id"
            :options="stateOptions"
            :selectedOption="selectedState"
            url="/music/tracks/state-update"
            @change="onChangeStateButton"
        />
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