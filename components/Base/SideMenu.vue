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
                <div class="side-menu__sections-list-item-title">
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
                  {{ child.name }}
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
<script>

export default {
  name: 'Menu',
  data: function () {
    return {
      activeMenuItem: null,
      menuItemsIsClosing: {},
      menu: [
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
    }
  },
  created() {
    this.menuItemsIsClosing = this.menu ? this.menu.reduce((acc, value) => {
      return {...acc, [value.name]: false}
    }, {}) : {}
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    onClickOutside() {
      if (this.activeMenuItem) {
        this.closeOpenMenuItem(this.activeMenuItem)

        this.activeMenuItem = null
      }
    },
    onSectionMenuItemClick(menuItem) {

      const oldActiveMenuItem = this.activeMenuItem

      if (menuItem === null) {
        this.activeMenuItem = null;

        this.closeOpenMenuItem(oldActiveMenuItem)

        this.$router.push('/')

        return
      }

      this.activeMenuItem = this.activeMenuItem === menuItem.name ? null : menuItem.name

      this.closeOpenMenuItem(oldActiveMenuItem)

      menuItem.link ? this.$router.push(menuItem.link) : null
    },
    onSubSectionMenuItemClick(menuItem, child) {

      this.closeOpenMenuItem(this.activeMenuItem)

      this.activeMenuItem = null

      child.link ? this.$router.push(child.link) : null
    },
    closeOpenMenuItem(menuItem) {
      this.menuItemsIsClosing[menuItem] = true

      setTimeout(() => {
        this.menuItemsIsClosing[menuItem] = false
      }, 100)
    }
  }
}
</script>
