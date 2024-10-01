<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useNuxtApp, useRoute } from '#imports'

import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import Tabs from '@/components/Base/Tabs.vue'
import { useAsyncData } from '#app'

const { $authFetch } = useNuxtApp()

type IItem = {[key: string]: any}

const route = useRoute()

const selectedTab = ref(0)

const tabs = [
  {
    title: 'Инфо',
    componentName: 'main'
  },
  {
    title: 'Подписка',
    componentName: 'subscription'
  },
  {
    title: 'Скачанное (музыка)',
    componentName: 'subscription'
  },
  {
    title: 'Скачанное (шумы)',
    componentName: 'subscription'
  },
  {
    title: 'Отчеты',
    componentName: 'subscription'
  },
]

const getAsyncComponent = () => {

  return defineAsyncComponent(() => {
    const componentName = tabs[selectedTab.value].componentName

    return import(`@/pages/users/_tabs/${componentName}.vue`)
  })
}

let selectedTabMap = shallowRef(getAsyncComponent())

watch(
    selectedTab,
    () => {
      selectedTabMap.value = getAsyncComponent()
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
    () => $authFetch('users/detail', {
      params: {
        id: route.params.id,
      }
    })
)

const entityId = route.params.id
const item: IItem = ref(response.data)
const h1 = ref('Пользователь ' + entityId)
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
        <Button :class="['--big --outline-primary']">Изменить</Button>
        <Button :class="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template #content>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
      <ClientOnly>
        <Transition name="fade" mode="out-in">
          <component :is="selectedTabMap" :item="item"/>
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