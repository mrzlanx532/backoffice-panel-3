<script setup lang="ts">
import Section from '@/components/Base/Section.vue'
import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import Tabs from '@/components/Base/Tabs.vue';
import StateButton from '@/components/Base/StateButton.vue';
import MainTab from '~/pages/music/_tabs/main.vue'

import { useRoute } from '#imports'

type IItem = {[key: string]: any}

const route = useRoute()

const item: IItem = ref({})
const selectedTab = ref(0)
const selectedState = ref({})

const tabs = ref([
  {
    title: 'Инфо',
    content: MainTab
  },
  {
    title: 'Правообладатели',
    content: MainTab
  },
  {
    title: 'Вариации',
    content: MainTab
  },
  {
    title: 'Стемы',
    content: MainTab
  },
  {
    title: 'Лирика',
    content: MainTab
  },
  {
    title: 'Плейлисты',
    content: MainTab
  },
  {
    title: 'Еще раздел',
    content: MainTab
  },
  {
    title: 'И еще раздел',
    content: MainTab
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

const onChangeTab = (index: number) => {
  selectedTab.value = index
}

const onChangeStateButton = (option) => {
  selectedState.value = option
}
</script>

<template>
  <Detail
      :h1="'Трек #' + route.params.id"
      url-prefix="music"
      :data-id="route.params.id"
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
      <ClientOnly>
        <Transition name="fade">
          <Section v-if="Object.keys(item).length > 0">
            <template v-slot:header>
              <Tabs :tabs="tabs"/>
            </template>
            <template v-slot:content>

            </template>
          </Section>
        </Transition>
      </ClientOnly>
    </template>
  </Detail>
</template>