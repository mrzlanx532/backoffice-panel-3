<script setup lang="ts">
import { useRoute, useNuxtApp, type IItem } from '#imports';

import Detail from '~/components/Base/Detail.vue'
import Button from '~/components/Base/Button.vue'
import BlogForm from '~/modals/blog/BlogForm.vue'
import Picture from '~/components/Base/Browser/ColumnComponents/Picture.vue'
import Badge from '~/components/Base/Browser/ColumnComponents/Badge.vue'

const route = useRoute()

const {
  $modal,
  $notification,
  $authFetch
} = useNuxtApp()

const {
  item,

  onClickEdit,
  onClickDelete,

  SSRLoadDetail
} = usePage()

const onChangeState = async () => {

  $modal.confirm({
    question: item.value!.state.id === 'DRAFT' ? 'Опубликовать?' : 'Снять с публикации?'
  }).then(async (isAgree: boolean) => {
    if (!isAgree) {
      return
    }

    const prefix = item.value!.state.id === 'DRAFT' ? 'publish' : 'withdraw'

    await $authFetch(`blog/posts/${prefix}`, {
      method: 'POST',
      body: {
        id: item.value!.id,
      },
    })

    $notification.push({type: 'success', message: 'Статус обновлен'})
    window.location.reload()
  })
}

const sections = ref([
  {
    title: 'Общее',
    rows: [
      {
        title: 'id',
        name: 'id'
      },
      {
        title: 'Заголовок',
        name: 'name'
      },
      {
        title: 'Дата',
        name: 'date'
      },
      {
        title: 'Локаль',
        name: 'locale',
        toFormat(item: any) {
          return item.locale.title
        }
      },
      {
        title: 'Статус',
        name: 'state',
        toFormat(item: any) {
          return item.state.title
        }
      },
      {
        title: 'Категория',
        name: 'category',
        toFormat(item: any) {
          let string = item.category.name_ru

          if (item.category.name_en) {
            string = string + ' (' + item.category.name_en + ')'
          }

          return string
        }
      },
      {
        title: 'Кол-во просмотров',
        name: 'views_counter',
      },
      {
        title: 'Создано',
        name: 'created_at',
        preset: {
          name: 'timestampToFormatPreset'
        }
      },
      {
        title: 'Обновлено',
        name: 'updated_at',
        preset: {
          name: 'timestampToFormatPreset'
        }
      },
      {
        title: 'Ident',
        name: 'ident',
      },
      {
        title: 'cover',
        name: 'cover',
        component: {
          component: Picture,
          title: 'name',
        }
      },
    ]
  }, {
    title: 'Контент',
    rows: [
      {
        title: 'Контент (короткий)',
        name: 'content_short'
      },
      {
        title: 'Контент',
        name: 'content',
        isRaw: true
      },
    ]
  }
])

await SSRLoadDetail(item, 'blog/posts/detail', route.params.id)
</script>

<template>
  <Detail
      entity-name="Статья блога"
      back-link="/blog"
      :item="item!"
      :sections="sections"
  >
    <template #actions>
      <div class="btn__group">
        <Button
            @click="onClickEdit({
              formURL: 'blog/posts/form',
              modalComponent: BlogForm,
              modalTitle: 'Редактирование статьи',
              notificationMessage: 'Статья изменена',
              modalConfig: {
                isPreventClickOverlay: true
              }
            })"
            :class="['--small --outline-primary']"
        >
          Изменить
        </Button>
        <Button
            @click="onClickDelete({
              deleteURL: 'blog/posts/delete',
              notificationMessage: 'Статья удалена'}
            )"
            :class="['--small --outline-danger']"
        >
          Удалить
        </Button>
      </div>
      <Button
          @click="onChangeState"
          :class="{
            'ml_10': true,
            '--small': true,
            '--outline-contrast-success': item?.state?.id === 'DRAFT',
            '--outline-contrast-default': item?.state?.id === 'PUBLISHED'
          }"
      >{{ item?.state && item.state.id === 'DRAFT' ? 'Опубликовать' : 'Снять с публикации' }}</Button>
    </template>
  </Detail>
</template>