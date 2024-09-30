<script setup lang="ts">
import { definePageMeta, useNuxtApp } from '#imports'
import type { Ref } from 'vue'
import Button from '@/components/Base/Button.vue'
import Browser, { type IItem } from '@/components/Base/Browser/Browser.vue';
import Badge from '@/components/Base/Browser/ColumnComponents/Badge.vue'
import Content from '@/pages/blog/_parts/content.vue'
import { type IBrowser } from '~/components/Base/Browser/Browser.vue'

definePageMeta({
  middleware: ['auth']
})

const {
  $modal,
  $notification,
  $authFetch
} = useNuxtApp()

const item: Ref<IItem> = ref({})

const browserEl: Ref<IBrowser|null> = ref(null)

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

const onItemUpdated = (newItem: IItem) => {
    item.value = newItem
}

const onClickDelete = () => {
  $modal.confirm().then(async (isAgree) => {
    if (!isAgree) {
      return
    }

    await $authFetch('blog/posts/delete', {
      method: 'POST',
      body: {
        id: item.value.id,
      },
    })

    $notification.push({type: 'success', message: 'Статья удалена'})
    item.value = {}
    browserEl.value!.reset()
    browserEl.value!.closeDetail()
  })
}

const onClickEdit = async () => {
  const formResponse = await $authFetch(`blog/posts/form`, {
    method: 'GET',
    params: {
      id: item.value.id,
    },
  })

  $modal.load('blog/form', {
    title: 'Редактирование статьи',
    id: item.value.id,
    formResponse
  }).then(() => {
    browserEl.value!.reset(true)
    $notification.push({type: 'success', message: 'Статья отредактирована'})
  })
}

const onClickCreate = async () => {
  const formResponse = await $authFetch(`blog/posts/form`, {
    method: 'GET',
    params: {
      id: item.value.id,
    },
  })

  $modal.load('blog/form', {
    title: 'Создание статьи',
    formResponse
  }).then(() => {
    browserEl.value!.reset()
    $notification.push({type: 'success', message: 'Статья добавлена'})
  })
}

const onChangeState = async () => {

  $modal.confirm({
    question: item.value.state.id === 'DRAFT' ? 'Опубликовать?' : 'Снять с публикации?'
  }).then(async (isAgree) => {
    if (!isAgree) {
      return
    }

    const prefix = item.value.state.id === 'DRAFT' ? 'publish' : 'withdraw'

    await $authFetch(`blog/posts/${prefix}`, {
      method: 'POST',
      body: {
        id: item.value.id,
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
      url-prefix="blog/posts"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name"
      detail-page-url-prefix="blog"
      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickCreate" :class="['--small --primary']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <div class="btn__group ml_10">
        <Button
            @click="onChangeState"
            :class="{
              '--big': true,
              '--outline-contrast-success': item.state?.id === 'DRAFT',
              '--outline-contrast-default': item.state?.id === 'PUBLISHED'
            }"
        >{{ item.state && item.state.id === 'DRAFT' ? 'Опубликовать' : 'Снять с публикации' }}</Button>
      </div>
    </template>
    <template #browserDetailContent>
      <Content :item="item"/>
    </template>
  </Browser>
</template>