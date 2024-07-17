<script setup lang="ts">
  import { definePageMeta, useNuxtApp } from '#imports'
  import { type Ref } from 'vue'
  import Button from '~/components/Base/Button.vue'
  import Browser from '~/components/Base/Browser/Browser.vue'
  import Tabs from '~/components/Base/Tabs.vue'
  import TabMain from '~/pages/music/albums/ignore/tabs/main.vue'
  import TabTracks from '~/pages/music/albums/ignore/tabs/tracks.vue'

  definePageMeta({
    middleware: ['auth']
  })

  const { $modal, $notification, $authFetch } = useNuxtApp()

  const id: Ref<number|null> = ref(null)
  const item: Ref<{}|null> = ref({})

  const browserEl: Ref<HTMLElement|null> = ref(null)

  const requestProperties = ref([
    'id',
    'name_ru',
    'author',
    'label',
    'ident',
    'tracks_counter',
    'created_at'
  ])

  const selectedTab = ref(0)

  const tabs = shallowRef([
    {
      title: 'Инфо',
      component: TabMain
    },
    {
      title: 'Треки',
      component: TabTracks
    },
  ])

  const columns = shallowRef([
    {
      name: 'id',
      title: 'ID'
    },
    {
      name: 'name_ru',
      title: 'Название'
    },
    {
      name: 'author',
      title: 'Автор',
      toFormat(item) {
        return item.author?.name_ru
      }
    },
    {
      name: 'label',
      title: 'Лейбл',
      toFormat(item) {
        return item.label?.name_ru
      }
    },
    {
      name: 'ident',
      title: 'Идентификатор',
    },
    {
      name: 'tracks_counter',
      title: 'Треки',
    },
    {
      name: 'created_at',
      title: 'Дата создания',
      preset: {
        name: 'timestampToFormatPreset',
      }
    },
  ])

  const onClickCreate = async () => {
    const formResponse = await $authFetch('http://backoffice-api.lsmlocal.ru/music/albums/form', {
      method: 'GET',
      params: {
        id: id.value
      }
    })

    $modal.load('music/albums/form', {
      title: 'Создание альбома',
      formResponse
    }).then(() => {
      browserEl.value.reset()
      $notification.push({type: 'success', message: 'Альбом добавлен'})
    })
  }

  const onClickEdit = async () => {

    const formResponse = await $authFetch('http://backoffice-api.lsmlocal.ru/music/albums/form', {
      method: 'GET',
      params: {
        id: id.value
      }
    })

    $modal.load('music/albums/form', {
      title: 'Изменение альбома',
      id: id,
      formResponse
    }).then(() => {
      browserEl.value.reset()
      $notification.push({type: 'success', message: 'Альбом обновлен'})
    })
  }

  const onClickDelete = () => {
    $modal.confirm().then( async (isAgree) => {
      if (isAgree) {
        await $authFetch('http://backoffice-api.lsmlocal.ru/music/albums/delete', {
          method: 'POST',
          body: {
            id: id.value
          }
        })

        browserEl.value.reset()
        $notification.push({type: 'success', message: 'Альбом удален'})
      }
    })
  }

  const onItemUpdated = (val) => {
    item.value = val
    id.value = val.id
  }

  const onTabChange = (tab) => {
    selectedTab.value = tab
  }
</script>

<template>
  <Browser
      ref="browserEl"
      h1="Альбомы музыкальных треков"
      url-prefix="music/albums"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
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
      <Tabs :tabs="tabs" @change="onTabChange"/>
    </template>

    <template #browserDetailContent>
      <component :is="tabs[selectedTab].component" :item="item"/>
    </template>
  </Browser>
</template>