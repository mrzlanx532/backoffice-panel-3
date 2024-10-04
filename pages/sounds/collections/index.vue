<script setup lang="ts">
import Browser from '~/components/Base/Browser/Browser.vue';

import { definePageMeta, type IColumn, usePage, defineComponent } from '#imports'
import { type Ref, h } from 'vue'
import Tabs from '~/components/Base/Tabs.vue'
import Button from '~/components/Base/Button.vue'
import MainTab from '~/pages/sounds/collections/_tabs/main.vue'
import TracksTab from '~/pages/sounds/collections/_tabs/tracks.vue'

const {
  browserEl,
  item,

  onClickCreate,
  onClickEdit,
  onClickDelete,
  onItemUpdated,
} = usePage()

definePageMeta({
  middleware: ['auth']
})

const requestProperties = ref([
  'id',
  'name_en',
  'name_ru',
  'description_ru',
  'description_en',
  'tracks_counter',
])

const IdColumn = shallowRef(defineComponent(
    (props) => {
      return () => {
        return h('div', [
            h('p', { style: { color: 'black' }}, `#${props.item.id} ${props.item.name_en}`),
            h('p', { style: { color: 'grey' } }, `${props.item.description_en}`),
        ])
      }
    }, {
      props: {
        item: Object
      }
    }
))

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

const columns: Ref<IColumn[]> = ref([
  {
    name: 'id',
    title: 'ID',
    component: IdColumn
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    classes: ['--min-width']
  },
])

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
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Коллекции шумов"
      url-prefix="sound/collections/browse"

      detail-url-prefix="sound/collections/detail"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="sounds/collections"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickCreate({
          formURL: 'sound/collections/form',
          modalPath: 'sound/collections/form',
          modalTitle: 'Создать коллекцию',
          notificationMessage: 'Коллекция создана'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'sound/collections/form',
          modalPath: 'sound/collections/form',
          modalTitle: 'Изменить коллекцию',
          notificationMessage: 'Коллекция изменена'
        })" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete({
          deleteURL: 'sound/collections/delete',
          notificationMessage: 'Коллекция удалена'
        })" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
    </template>

    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>