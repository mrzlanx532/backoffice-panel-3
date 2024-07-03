<script setup lang="ts">
  import { definePageMeta, useNuxtApp } from '#imports'
  import { type Ref } from 'vue'
  import Button from '@/components/Base/Button'
  import Browser from "@/components/Base/Browser/Browser";

  const { $modal } = useNuxtApp()

  definePageMeta({
    middleware: ['auth']
  })

  const id: Ref<number|null> = ref(null)
  const item: Ref<{}, null> = ref({})

  const requestProperties = ref([
    'id',
    'name_ru',
    'author',
    'label',
    'ident',
    'tracks_counter',
    'created_at'
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

  const onClickCreate = () => {
    $modal.load('music//albums/form', {
      title: 'Создание альбома'
    }).then(res => {
      console.log(res)
    })
  }

  const onItemUpdated = (val) => {
    item.value = val
  }
</script>

<template>
  <Browser
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
  </Browser>
</template>