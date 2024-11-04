<script setup lang="ts">
import { definePageMeta } from '#imports'
import Browser, { type IItem } from '@/components/Base/Browser/Browser.vue';
import { prepareDuration } from '~/helpers/functions-for-table-columns'
import Button from '~/components/Base/Button.vue'
import ButtonDropdown from '~/components/Base/ButtonDropdown.vue'

definePageMeta({
  middleware: ['auth']
})

const {
    $modal,
    $authFetch,
    $notification
} = useNuxtApp()

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
  selectedIds,
  isOpenBulkActions,
  onChangeSelectedIds,
  onClickBulkActions,
  onCloseBulkActions
} = initBrowserMultiple()

const columns = ref([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'description_ru',
    title: 'Описание'
  },
  {
    name: 'library',
    title: 'Библиотека',
    toFormat(item: IItem) {
      return item.library?.name_ru
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
    name: 'author',
    title: 'Автор',
    toFormat(item: IItem) {
      return item.author?.name_ru
    }
  },
  {
    name: 'downloads_counter',
    title: 'Кол-во скачиваний',
  },
  {
    name: 'created_at',
    title: 'Загружен',
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])

const columnsBulkActions = ref([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'description_ru',
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

const requestProperties = ref([
  'id',
  'description_ru',
  'library',
  'variation',
  'author',
  'downloads_counter',
  'created_at'
])

const buttonDropdownItems = [
  {
    title: 'Опубликовать',
    class: '--success',
    onClick() {
      $modal.confirm({
        question: 'Вы точно хотите опубликовать указанные треки?'
      }).then(() => {
        $authFetch('sound/tracks/state-update-many', {
          method: 'POST',
          body: {
            state_id: 'PUBLISHED',
            ids: selectedIds.value
          },
          onResponse({response}) {
            if (response.ok) {
              $notification.push({type: 'success', message: 'Треки опубликованы'})
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
        question: 'Вы точно хотите снять с публикации указанные треки?'
      }).then(() => {
        $authFetch('sound/tracks/state-update-many', {
          method: 'POST',
          body: {
            state_id: 'DRAFT',
            ids: selectedIds.value
          },
          onResponse({response}) {
            if (response.ok) {
              $notification.push({type: 'success', message: 'Треки сняты с публикации'})
            }
          }
        })
      })
    }
  },
  {
    title: 'Удалить',
    class: '--danger',
    onClick() {
      $modal.confirm({
        question: 'Вы точно хотите удалить указанные треки?'
      }).then(() => {
        $authFetch('sound/tracks/delete-many', {
          method: 'POST',
          body: {
            state_id: 'DRAFT',
            ids: selectedIds.value
          },
          onResponse({response}) {
            if (response.ok) {
              $notification.push({type: 'success', message: 'Треки удалены'})

              browserEl.value!.reset()
              browserEl.value!.resetSelectedIds()
              isOpenBulkActions.value = false
            }
          }
        })
      })
    }
  },
]

const onClickMultiple = async () => {
  const formResponse = await $authFetch('sound/collections/list', {
    method: 'GET',
  })

  $modal.load('sound/add_to_collection_form', {
    title: 'Добавить в плейлист',
    formResponse,
    selectedIds: selectedIds.value
  }).then(() => {
    $notification.push({type: 'success', message: 'Треки добавлены в коллекцию'})

    browserEl.value!.reset()
    browserEl.value!.resetSelectedIds()
    isOpenBulkActions.value = false
  })
}
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Каталог шумовых треков"
      url-prefix="sound/tracks/browse"

      detail-url-prefix="sound/tracks/detail"
      detail-title-property="id"
      detail-subtitle-property="description_ru"
      detail-page-url-prefix="sounds"

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
        <Button @click="onClickCreate({
          formURL: 'music/tracks/form',
          modalPath: 'music/tracks/form',
          modalTitle: 'Создать трек',
          notificationMessage: 'Трек создан'
        })" :class="['--small --success']">Добавить</Button>
        <Button :class="['--small --primary']" @click="onClickBulkActions">Массовые действия {{ selectedIds.length ? `(${(selectedIds.length)})` : '' }}</Button>
      </div>
    </template>

    <template #browserDetailBulkActionsHeader>
      <div class="btn__group">
        <Button @click="onClickMultiple" :class="['--big --outline-primary']">Добавить в коллекцию</Button>
        <ButtonDropdown class="--primary" :items="buttonDropdownItems"/>
      </div>
    </template>
  </Browser>
</template>