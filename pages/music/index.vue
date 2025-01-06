<script setup lang="ts">
import { prepareDuration } from '~/helpers/functions-for-table-columns';
import Button from '#backoffice-ui/components/Button.vue';
import Tabs from '#backoffice-ui/components/Tabs.vue';
import Browser, { type IItem } from '#backoffice-ui/components/Browser.vue'
import ButtonDropdown from '#backoffice-ui/components/ButtonDropdown.vue'

import MainTab from '~/pages/music/_tabs/main.vue'

import MusicTrackForm from '~/modals/music/MusicTrackForm.vue'
import AddTrackToPlaylistForm from '~/modals/music/AddTrackToPlaylistForm.vue'

const {
  browserEl,
  item,

  onClickCreate,
  onClickEdit,
  onClickDelete,
  onItemUpdated,

  initBrowserMultiple
} = usePage()

const {
  initTabs
} = useTabs()

const {
  $modal,
  $authFetch,
  $notification
} = useNuxtApp()

const {
  selectedIds,
  isOpenBulkActions,
  onChangeSelectedIds,
  onClickBulkActions,
  onCloseBulkActions
} = initBrowserMultiple()

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
      return item.authors.reduce((acc: any, item: any) => {
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

const onClickMultiple = async () => {
  const formResponse = await $authFetch('music/tracks/playlists/list?search_string=&limit=30&offset=0', {
    method: 'GET',
  })

  $modal.load(AddTrackToPlaylistForm, {
    title: 'Добавить в плейлист',
    formResponse,
    selectedIds: selectedIds.value
  }).then(() => {
    browserEl.value!.reset()
    $notification.push({type: 'success', message: 'Треки добавлены в плейлист'})
  })
}

const buttonDropdownItems = [
  {
    title: 'Опубликовать',
    class: '--success',
    onClick() {
      $modal.confirm({
        question: 'Вы действительно хотите опубликовать данные треки?'
      }).then((isAgree: boolean) => {
        if (!isAgree) {
          return
        }

        $authFetch('music/tracks/state-update-many', {
          method: 'POST',
          body: {
            state_id: 'PUBLISHED',
            ids: selectedIds.value
          },
          onResponse({response}) {
            if (response.ok) {
              $notification.push({
                type: 'success',
                message: 'Треки опубликованы'
              })

              browserEl.value!.reset()

              return
            }

            if (response.status === 409) {
              $notification.push({
                type: 'danger',
                message: response._data.message
              })
            }
          }
        })
      })
    }
  },
  {
    title: 'Снять с публикации',
    class: '--warning',
    onClick() {
      $modal.confirm({
        question: 'Вы действительно хотите снять треки с публикации?'
      }).then((isAgree: boolean) => {
        if (!isAgree) {
          return
        }

        $authFetch('music/tracks/state-update-many', {
          method: 'POST',
          body: {
            state_id: 'DRAFT',
            ids: selectedIds.value
          },
          onResponse({response}) {
            if (response.ok) {
              $notification.push({
                type: 'success',
                message: 'Треки сняты с публикации'
              })

              browserEl.value!.reset()

              return
            }

            if (response.status === 409) {
              $notification.push({
                type: 'danger',
                message: response._data.message
              })
            }
          }
        })
      })
    }
  },
  {
    title: 'Скопировать метаданные из основной версии',
    class: '--primary',
    onClick() {
      $authFetch('music/tracks/copy-meta', {
        method: 'POST',
        body: {
          track_ids: selectedIds.value
        }
      })

      $notification.push({
        type: 'success',
        message: 'Метаданные скопированы'
      })
    }
  },
  {
    title: 'Удалить',
    class: '--danger',
    onClick() {
      $modal.confirm({
        question: 'Вы действительно хотите удалить треки?'
      }).then((isAgree: boolean) => {
        if (!isAgree) {
          return
        }

        $authFetch('music/tracks/delete-many', {
          method: 'POST',
          body: {
            state_id: 'DRAFT',
            ids: selectedIds.value
          },
          onResponse({response}) {
            if (response.ok) {
              $notification.push({
                type: 'success',
                message: 'Треки удалены'
              })

              selectedIds.value = []
              browserEl.value!.reset()
              browserEl.value!.resetSelectedIds()

              return
            }

            if (response.status === 409) {
              $notification.push({
                type: 'danger',
                message: response._data.message
              })
            }
          }
        })
      })
    }
  },
]
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

      :columns-bulk-actions="columnsBulkActions"
      :is-multiple-selection-is-enable="true"
      :is-open-bulk-actions-detail="isOpenBulkActions"
      @change-selected-ids="onChangeSelectedIds"
      @close-bulk-actions="onCloseBulkActions"
  >
    <template #rightSide>
      <div class="btn__group-separated">
        <Button :class="['--small --primary']" @click="onClickBulkActions">Массовые действия {{ selectedIds.length ? `(${(selectedIds.length)})` : '' }}</Button>
        <Button @click="onClickCreate({
          formURL: 'music/tracks/form',
          modalComponent: MusicTrackForm,
          modalTitle: 'Создать трек',
          notificationMessage: 'Трек создан'
        })" :class="['--small --success']">Добавить</Button>
      </div>
    </template>

    <template #browserDetailHeader>
        <div class="btn__group">
          <Button @click="onClickEdit({
          formURL: 'music/tracks/form',
          modalComponent: MusicTrackForm,
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
        <Button @click="onClickMultiple" :class="['--big --outline-primary']">Добавить в плейлист</Button>
        <ButtonDropdown class="--primary" :items="buttonDropdownItems"/>
      </div>
    </template>

    <template #browserDetailContent>
      <component :is="selectedTabComponent" :item="item"/>
    </template>
  </Browser>
</template>