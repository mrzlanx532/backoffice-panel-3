<script setup lang="ts">
import SideMenu from '@/components/Base/SideMenu.vue'

const items = [
  {
    name: 'Шумы',
    children: [
      {
        name: 'Каталог треков',
        link: '/sounds'
      },
      {
        name: 'Коллекции',
        link: '/sounds/collections'
      },
      {
        name: 'Авторы',
        link: '/sounds/authors'
      },
      {
        name: 'Библиотеки',
        link: '/sounds/libraries'
      },
    ]
  },
  {
    name: 'Музыка',
    children: [
      {
        name: 'Каталог треков',
        link: '/music'
      },
      {
        name: 'Плейлисты',
        link: '/music/playlists'
      },
      {
        name: 'Авторы',
        link: '/music/authors'
      },
      {
        name: 'Лейблы',
        link: '/music/labels'
      },
      {
        name: 'Альбомы',
        link: '/music/albums'
      },
    ]
  },
  {
    name: 'Пользователи',
    children: [
      {
        name: 'Каталог пользователей',
        link: '/users'
      },
      {
        name: 'Отчеты',
        link: '/reports'
      },
    ]
  },
  {
    name: 'Блог',
    link: '/blog'
  },
]
</script>

<template>
  <div id="app">
    <div class="container">
      <SideMenu :items="items"/>
      <div class="page">
        <div class="page__container">
          <slot/>
        </div>
      </div>
    </div>
    <Modal/>
    <Notification/>
  </div>
</template>