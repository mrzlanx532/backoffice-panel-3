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
      <SideMenu :items="items">
        <div class="img-container">
          <img alt="logo" src="/img/logo.png"/>
          <div class="logo-text-container">Digital Dyatel</div>
        </div>
      </SideMenu>
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

<style scoped>
.logo-text-container {
  display: flex;
  place-items: center center;
  padding-left: 10px;
  user-select: none;
}

.img-container {
  padding: 30px 10px 20px 30px;
  display: flex;
  flex-direction: row;
}

img {
  width: 30px;
  height: 30px;
}
</style>