<script setup lang="ts">
import { useRoute, useNuxtApp } from '#imports';

import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import BlogForm from '~/modals/blog/BlogForm.vue'
import Tabs from '~/components/Base/Tabs.vue'
import MainTab from '~/pages/blog/_tabs/main.vue'
import PhotosTab from '~/pages/blog/_tabs/photos.vue'

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

const { initTabs } = useTabs()

const {
  tabs,
  selectedTabComponent,
  onChangeSelectedTab
} = initTabs([
  {
    title: 'Пост',
    component: MainTab
  },
  {
    title: 'Фото',
    component: PhotosTab
  }
])

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

await SSRLoadDetail(item, 'blog/posts/detail', route.params.id)
</script>

<template>
  <Detail
      url-prefix="blog"
      :h1="'Пост ' + route.params.id"
      :data-id="route.params.id"
  >
    <template #header>
      <div class="btn__group">
        <Button
            @click="onClickEdit({
              formURL: 'blog/posts/form',
              modalComponent: BlogForm,
              modalTitle: 'Редактирование статьи',
              notificationMessage: 'Статья изменена'
            })"
            :class="['--big --outline-primary']"
        >
          Изменить
        </Button>
        <Button
            @click="onClickDelete({
              deleteURL: 'blog/posts/delete',
              notificationMessage: 'Статья удалена'}
            )"
            :class="['--big --outline-danger']"
        >
          Удалить
        </Button>
      </div>
      <div class="btn__group ml_10">
        <Button
            @click="onChangeState"
            :class="{
              '--big': true,
              '--outline-contrast-success': item?.state?.id === 'DRAFT',
              '--outline-contrast-default': item?.state?.id === 'PUBLISHED'
            }"
        >{{ item?.state && item.state.id === 'DRAFT' ? 'Опубликовать' : 'Снять с публикации' }}</Button>
      </div>

    </template>
    <template #content>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
      <component :is="selectedTabComponent" :item="item"/>
    </template>>
  </Detail>
</template>