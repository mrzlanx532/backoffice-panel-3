<script setup lang="ts">
import { prepareDuration } from '~/helpers/functions-for-table-columns';
import Button from '~/components/Base/Button.vue';
import Tabs from '~/components/Base/Tabs.vue';
import Browser, {type IItem} from '~/components/Base/Browser/Browser.vue'
import MainTab from '~/pages/music/_tabs/main.vue'
import type { Ref } from 'vue'

const {
  browserEl,
  item,

  onClickCreate,
  onClickEdit,
  onClickDelete,
  onItemUpdated
} = usePage()

const {
  initTabs
} = useTabs()

const selectedIds: Ref<string[]> = ref([])

const isOpenBulkActions = ref(false)

const requestProperties = ref([
  'id',
  'title_ru',
  'description_ru',
  'album',
  'label',
  'variation',
  'authors',
  'created_at',
  'downloads_counter'
])

const columnsBulkActions = ref([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'title_ru',
    title: 'Название'
  },
  {
    name: 'created_at',
    title: 'Загружен',
    preset: {
      name: 'timestampToFormatPreset'
    }
  },
])

const columns = ref([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'title_ru',
    title: 'Название',
  },
  {
    name: 'album',
    title: 'Альбом',
    toFormat(item: IItem) {
      return item.album?.name_ru
    }
  },
  {
    name: 'label',
    title: 'Лейбл',
    toFormat(item: IItem) {
      return item.label?.name_ru
    }
  },
  {
    name: 'variation',
    title: 'Длительность',
    toFormat(item: IItem) {
      return prepareDuration(item.variation?.duration)
    }
  },
  {
    name: 'authors',
    title: 'Автор',
    toFormat(item: IItem) {
      return item.authors.reduce((acc, item) => {
        if (acc === null) {
          return item.name_ru
        }

        return `${acc}, ${item.name_ru}`
      }, null)
    }
  },
  {
    name: 'downloads_counter',
    title: 'Кол-во скач.',
  },
  {
    name: 'created_at',
    title: 'Загружен',
    preset: {
      name: 'timestampToFormatPreset'
    }
  },
])

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
])

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

const onChangeSelectedIds = (ids: string[]) => {
  isOpenBulkActions.value = true
  selectedIds.value = ids

  console.log(selectedIds.value)
}

const onClickBulkActions = () => {
  isOpenBulkActions.value = true
}

const onCloseBulkActions = () => {
  isOpenBulkActions.value = false
}
</script>

<template>
  <Browser
      @change-selected-ids="onChangeSelectedIds"
      ref="browserEl"
      h1="Каталог музыкальных треков"
      url-prefix="music/tracks/browse"

      detail-url-prefix="music/tracks/detail"
      detail-title-property="id"
      detail-subtitle-property="name"
      detail-page-url-prefix="music"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"

      :columns-bulk-actions="columnsBulkActions"
      :is-multiple-selection-is-enable="true"
      :is-open-bulk-actions-detail="isOpenBulkActions"
      @close-bulk-actions="onCloseBulkActions"
  >
    <template #rightSide>
      <div class="btn__group-separated">
        <Button @click="onClickCreate({
          formURL: 'music/tracks/form',
          modalPath: 'music/tracks/form',
          modalTitle: 'Создать трек',
          notificationMessage: 'Трек создан'
        })" :class="['--small --success']">Добавить</Button>
        <Button :class="['--small --primary']" @click="onClickBulkActions">Массовые действия {{ selectedIds.length ? `(${(selectedIds.length)})` : '' }}</Button>
      </div>
    </template>

    <template #browserDetailHeader>
        <div class="btn__group">
          <Button @click="onClickEdit({
          formURL: 'music/tracks/form',
          modalPath: 'music/tracks/form',
          modalTitle: 'Трек изменен',
          notificationMessage: 'Трек изменен'
        })" :class="['--big --outline-primary']">Изменить</Button>
          <Button @click="onClickDelete({
          deleteURL: 'music/tracks/delete',
          notificationMessage: 'Трек удален'
        })" :class="['--big --outline-danger']">Удалить</Button>
        </div>
        <Tabs :tabs="tabs" @change="onChangeSelectedTab"/>
    </template>

    <template #browserDetailBulkActionsHeader>
      <div class="btn__group">
        <Button :class="['--big --outline-primary']">Перенос к другому автору</Button>
        <Button :class="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>

    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>