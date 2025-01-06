<script setup lang="ts">
import { definePageMeta, type IColumn, defineComponent } from '#imports'
import { type Ref, h } from 'vue'

import Browser from '#backoffice-ui/components/Browser.vue';
import Tabs from '#backoffice-ui/components/Tabs.vue'
import Button from '#backoffice-ui/components/Button.vue'

import MainTab from '~/pages/sounds/collections/_tabs/main.vue'
import TracksTab from '~/pages/sounds/collections/_tabs/tracks.vue'

import SoundCollectionForm from '~/modals/sound/SoundCollectionForm.vue'

const {
  browserEl,
  item,

  onClickCreate,
  onClickEdit,
  onClickDelete,
  onItemUpdated,
} = usePage()

const {
  initTabs
} = useTabs()

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
    title: 'Треки',
    component: TracksTab
  },
])

const columns: Ref<IColumn[]> = ref([
  {
    name: 'id',
    title: 'ID',
    component: IdColumn
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
    class: '--min-width'
  },
])
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
          modalComponent: SoundCollectionForm,
          modalTitle: 'Создать коллекцию',
          notificationMessage: 'Коллекция создана'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit({
          formURL: 'sound/collections/form',
          modalComponent: SoundCollectionForm,
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