<script setup lang="ts">
import { defineAsyncComponent, type Ref } from 'vue'
import { definePageMeta, useNuxtApp } from '#imports'

definePageMeta({
  middleware: ['auth']
})

import Browser, { type IItem } from '@/components/Base/Browser/Browser.vue';
import Tabs from '@/components/Base/Tabs.vue';
import SubscriptionRow from '@/components/CustomRows/users/SubscriptionRow.vue'
import Button from '@/components/Base/Button.vue';

const item: Ref<IItem|null> = ref(null)

const requestProperties = ref([
  'id',
  'name',
  'subscription_till',
  'subscription_till_for_exclusive_tracks',
  'subscription_type_id',
  'subscription_type',
  'downloads_counter',
  'views_counter',
  'created_at'
])

const { $modal } = useNuxtApp()

const selectedTab = shallowRef(0)

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
    componentName: 'downloaded_music'
  },
  {
    title: 'Скачанное (шумы)',
    componentName: 'downloaded_sounds'
  },
  {
    title: 'Отчеты',
    componentName: 'reports'
  },
]

const columns = shallowRef([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'name',
    title: 'Имя'
  },
  {
    name: 'company',
    title: 'Подписка (Срок действия)',
    component: SubscriptionRow
  },
  {
    name: 'downloads_counter',
    title: 'Скач.'
  },
  {
    name: 'views_counter',
    title: 'Просмотр'
  },
  {
    name: 'created_at',
    title: 'Дата создания',
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])

const getAsyncComponent = () => {
  return defineAsyncComponent(() => {
    const componentName = tabs[selectedTab.value].componentName
    return import(`@/pages/users/ignore/tabs/${componentName}.vue`)
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

const onItemUpdated = (newItem: IItem) => {
  item.value = newItem
}

const onClickEdit = () => {
  $modal.load('users/edit', {
    title: 'Создание пользователя'
  }).then(res => {
    console.log(res)
  })
}

const onClickDelete = () => {
  $modal.confirm({
    'question': 'Вы уверены?',
  }).then(confirm => {
    if (confirm) {
      console.log('Удаляем!!')
    }
  })
}
</script>

<template>
  <Browser
      h1="Каталог пользователей"
      url-prefix="users"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name"
      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickEdit" :class="['--small --success']">Добавить</Button>
      </div>
    </template>

    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
    </template>

    <template #browserDetailContent>
      <Transition name="fade" mode="out-in">
        <component :is="selectedTabMap" :item="item"/>
      </Transition>
    </template>
  </Browser>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>