<script setup lang="ts">
import { useNuxtApp } from '#imports'
import SideMenu from '#backoffice-ui/components/SideMenu.vue'

interface IUser {
  id: number,
  name: string,
  picture: {
    original: string
  } | null
}

const items = ([
  {
    name: 'Шумы',
    icon: '/img/menu_icons_sprite.svg#home',
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
    icon: '/img/menu_icons_sprite.svg#waveform',
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
    icon: '/img/menu_icons_sprite.svg#user',
    children: [
      {
        name: 'Каталог пользователей',
        link: '/users',
        icon: '/img/menu_icons_sprite.svg#user',
      },
      {
        name: 'Отчеты',
        link: '/reports',
        icon: '/img/menu_icons_sprite.svg#document',
      },
    ]
  },
  {
    name: 'Блог',
    link: '/blog',
    icon: '/img/menu_icons_sprite.svg#users',
  },
  {
    name: 'Ручки',
    link: '/pencils',
    icon: '/img/menu_icons_sprite.svg#users',
  },
])

const {
  $auth
} = useNuxtApp()

const authorizedUser = $auth().getUser<IUser>()

const user = ref({
  id: authorizedUser.value!.id,
  name: authorizedUser.value!.name,
  img: authorizedUser.value!.picture?.original,
})
</script>

<template>
  <div id="app">
    <div class="container">
      <SideMenu :items="items" :user="user">
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
    <Modal />
    <Notification />
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
  padding: 30px 10px 30px 30px;
  display: flex;
  flex-direction: row;
}

img {
  width: 30px;
  height: 30px;
}
</style>