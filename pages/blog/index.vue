<script setup lang="ts">
import { definePageMeta, useNuxtApp } from '#imports'
import type { Ref } from 'vue'
import Button from '@/components/Base/Button.vue'
import Section from '@/components/Base/Section.vue'
import Browser from '@/components/Base/Browser/Browser.vue';
import FlexTable from '@/components/Base/FlexTable.vue'

definePageMeta({
  middleware: ['auth']
})

const {
  $modal,
  $notification,
  $authFetch
} = useNuxtApp()

const item: Ref<{}|null> = ref({})

const browserEl: Ref<HTMLElement|null> = ref(null)

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
    toFormat(item) {
      return item?.category?.name_ru
    }
  },
  {
    name: 'locale',
    title: 'Локаль',
    toFormat(item) {
      return item?.locale?.title
    }
  },
  {
    name: 'state',
    title: 'Статус',
    toFormat(item) {
      return item?.state?.title
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

const config = shallowRef([
  {
    name: 'category_id',
    title: 'Категория',
    columnClass: 6,
    toFormat(item) {
        return `${item?.category?.name_ru}`
    },
  },
  {
    name: 'date',
    title: 'Дата',
    columnClass: 6,
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    columnClass: 6,
    preset: { name: 'timestampToFormatPreset' },
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    columnClass: 6,
    preset: { name: 'timestampToFormatPreset' },
  },
])

const onItemUpdated = (newItem) => {
    item.value = newItem
}

const onClickDelete = () => {
  $modal.confirm().then(async (isAgree) => {
    if (!isAgree) {
      return
    }

    await $authFetch(`http://backoffice-api.lsmlocal.ru/blog/posts/delete`, {
      method: 'POST',
      body: {
        id: item.value.id,
      },
    })

    $notification.push({type: 'success', message: 'Статья удалена'})
    browserEl.value.reset()
  })
}

const onClickEdit = async () => {
  const formResponse = await $authFetch(`http://backoffice-api.lsmlocal.ru/blog/posts/form`, {
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
    browserEl.value.reset()
    $notification.push({type: 'success', message: 'Статья отредактирована'})
  })
}

const onClickCreate = async () => {
  const formResponse = await $authFetch(`http://backoffice-api.lsmlocal.ru/blog/posts/form`, {
    method: 'GET',
    params: {
      id: item.value.id,
    },
  })

  $modal.load('blog/form', {
    title: 'Создание статьи',
    formResponse
  }).then(() => {
    browserEl.value.reset()
    $notification.push({type: 'success', message: 'Статья добавлена'})
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
        <Button @click="onClickCreate" :classes="['--small --primary']">Добавить</Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit" :classes="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete" :classes="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template #browserDetailContent>
      <div class="section__group">
        <Section>
          <template v-slot:header>
            Краткое содержание
          </template>
          <template v-slot:content>
            {{ item.name }}
          </template>
        </Section>
        <Section>
          <template v-slot:header>
            Полное содержание
          </template>
          <template v-slot:content>
            <div v-html="item.content"/>
          </template>
        </Section>
        <FlexTable :config="config" :item="item"/>
      </div>
    </template>
  </Browser>
</template>