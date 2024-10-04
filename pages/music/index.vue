<script setup lang="ts">
import { prepareDuration } from '~/helpers/functions-for-table-columns';
import Button from '~/components/Base/Button.vue';
import Tabs from '~/components/Base/Tabs.vue';
import Browser, {type IItem} from '~/components/Base/Browser/Browser.vue'
import MainTab from '~/pages/music/_tabs/main.vue'
import StateButton from '~/components/Base/StateButton.vue';

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

const selectedState = ref({})

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

watch(
    item,
    (_item) => {
      if (Object.keys(_item).length === 0) {
        return {}
      }

      if (_item === undefined) {
        return
      }

      const classesByState = {
        PUBLISHED: '--success',
        DRAFT: '--default',
        DISABLED: '--danger',
      }

      selectedState.value = {
        'id': _item.state.id,
        'title': _item.state.title,
        'class': classesByState[_item.state.id]
      }
    }
)

const onChangeStateButton = (option) => {
  selectedState.value = option
}
</script>

<template>
  <Browser
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
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickCreate({
          formURL: 'music/tracks/form',
          modalPath: 'music/tracks/form',
          modalTitle: 'Создать трек',
          notificationMessage: 'Трек создан'
        })" :class="['--small --success']">Добавить</Button>
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
    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>