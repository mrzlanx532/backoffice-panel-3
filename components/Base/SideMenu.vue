<script setup lang="ts">
import { useNuxtApp, useRouter } from '#imports'

const router = useRouter()

const menuItemsIsClosing = ref({})
const activeMenuItem = ref(null)
const menu = ref([
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
])

const logout = async () => {
  const { $auth } = useNuxtApp()

  await $auth().logout()
}

const onClickOutside = () => {
  if (activeMenuItem.value) {
    closeOpenMenuItem(activeMenuItem.value)

    activeMenuItem.value = null
  }
}

const onSectionMenuItemClick = (menuItem) => {

  const oldActiveMenuItem = activeMenuItem.value

  if (menuItem === null) {
    activeMenuItem.value = null;

    closeOpenMenuItem(oldActiveMenuItem)

    router.push('/')

    return
  }

  activeMenuItem.value = activeMenuItem.value === menuItem.name ? null : menuItem.name

  closeOpenMenuItem(oldActiveMenuItem)

  menuItem.link ? router.push(menuItem.link) : null
}

const onSubSectionMenuItemClick = (menuItem, child) => {

  closeOpenMenuItem(activeMenuItem.value)

  activeMenuItem.value = null

  child.link ? router.push(child.link) : null
}

const closeOpenMenuItem = (menuItem) => {
  menuItemsIsClosing.value[menuItem] = true

  setTimeout(() => {
    menuItemsIsClosing.value[menuItem] = false
  }, 100)
}

onMounted(() => {
  menuItemsIsClosing.value = menu.value ? menu.value.reduce((acc, value) => {
    return {...acc, [value.name]: false}
  }, {}) : {}
})
</script>

<template>
  <aside class="side-menu">
    <div class="side-menu__container">
      <div class="side-menu__header" v-click-outside="onClickOutside">
        <div class="side-menu__logo-title-container" @click="onSectionMenuItemClick(null)">
          <p class="side-menu__logo-title">BULLET WEB UI</p>
        </div>
        <div class="side-menu__sections">
          <ul class="side-menu__sections-list">
            <template v-for="menuItem in menu">
              <li
                  class="side-menu__sections-list-item"
                  :class="[
                      {'side-menu__sections-list-item-arrow': menuItem.children},
                      {'side-menu__sections-list-item-arrow_rotated': activeMenuItem === menuItem.name}
                    ]"
                  @click="onSectionMenuItemClick(menuItem)"
              >
                <NuxtLink v-if="menuItem.link" :to="menuItem.link">
                  {{ menuItem.name }}
                </NuxtLink>
                <div v-else class="side-menu__sections-list-item-title">
                  <div>{{ menuItem.name }}</div>
                </div>
              </li>
              <ul
                  v-if="menuItem.children"
                  class="side-menu__sub-sections-list"
                  :class="[
                      {'side-menu__sub-sections-list_open': activeMenuItem === menuItem.name},
                      {'side-menu__sub-sections-list_closing': menuItemsIsClosing[menuItem.name]},
                  ]"
              >
                <li
                    class="side-menu__sub-sections-list-item"
                    v-for="child in menuItem.children"
                    @click="onSubSectionMenuItemClick(menuItem, child)"
                >
                  <NuxtLink :to="child.link">
                    {{ child.name }}
                  </NuxtLink>
                </li>
              </ul>
            </template>
          </ul>
        </div>
      </div>
      <div class="side-menu__footer">
        <a @click="logout">Выйти</a>
      </div>
    </div>
  </aside>
</template>