<script setup lang="ts">
import { definePageMeta, useNuxtApp } from '#imports'
import Button from '@/components/Base/Button.vue'
import Browser, { type IItem } from '@/components/Base/Browser/Browser.vue';
import Badge from '@/components/Base/Browser/ColumnComponents/Badge.vue'
import Content from '@/pages/blog/_parts/content.vue'

definePageMeta({
  middleware: ['auth']
})

const {
  $modal,
  $notification,
  $authFetch
} = useNuxtApp()

const {
  browserEl,
  item,

  onClickCreate,
  onClickEdit,
  onClickDelete,
  onItemUpdated
} = usePage()

const columns = shallowRef([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'date',
    title: 'Дата',
  },
  {
    name: 'name',
    title: 'Заголовок',
  },
  {
    name: 'category',
    title: 'Рубрика',
    toFormat(item: IItem) {
      return item?.category?.name_ru
    }
  },
  {
    name: 'locale',
    title: 'Локаль',
    toFormat(item: IItem) {
      return item?.locale?.title
    }
  },
  {
    name: 'state',
    title: 'Статус',
    component: Badge,
    toFormat(item: IItem) {

      const mapper: {[key: string]: string} = {
        DRAFT: '--default',
        PUBLISHED: '--success'
      }

      return {
        title: item?.state?.title,
        class: mapper[item?.state?.id]
      }
    }
  },
  {
    name: 'created_at',
    title: 'Создан',
    preset: {
      name: 'timestampToFormatPreset'
    }
  },
])

const requestProperties = ref([
  'id',
  'date',
  'name',
  'category',
  'locale',
  'state',
  'created_at',
  'company_business_type',
  'job_title',
  'company_address',
  'company_index',
  'company_country',
  'company_city',
  'subscription_type'
])

const onChangeState = async () => {

  $modal.confirm({
    question: item.value!.state.id === 'DRAFT' ? 'Опубликовать?' : 'Снять с публикации?'
  }).then(async (isAgree) => {
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
    browserEl.value!.reset(true)
  })
}
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Статьи блога"
      url-prefix="blog/posts/browse"
      detail-url-prefix="blog/posts/detail"

      detail-title-property="id"
      detail-subtitle-property="name"
      detail-page-url-prefix="blog"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button
            @click="onClickCreate({
              formURL: 'blog/posts/form',
              modalPath: 'blog/form',
              modalTitle: 'Создание статьи',
              notificationMessage: 'Статья добавлена'
            })"
            :class="['--small --primary']"
        >
          Добавить
        </Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button
            @click="onClickEdit({
              formURL: 'blog/posts/form',
              modalPath: 'blog/form',
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
    <template #browserDetailContent>
      <Content :item="item"/>
    </template>
  </Browser>
</template>