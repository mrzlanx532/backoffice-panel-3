<script setup lang="ts">
import { useNuxtApp, useRouter } from '#imports'
import type { Ref } from 'vue'

interface IMenuItemChild {
  name: string,
  link: string
}

interface IMenuItem {
  name: string,
  link?: string,
  children?: IMenuItemChild[]
}

const props = defineProps<{
  items: IMenuItem[]
}>()

const router = useRouter()

const menuItemsIsClosing: Ref<{[key: string]: boolean}> = ref({})
const activeMenuItem: Ref<string|null> = ref(null)

const sectionsEl = useTemplateRef<HTMLElement>('sectionsEl')
const logoContainerEl = useTemplateRef<HTMLElement>('logoContainerEl')
const footerEl = useTemplateRef<HTMLElement>('footerEl')

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

const onSectionMenuItemClick = (menuItem: IMenuItem | null) => {

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

const onSubSectionMenuItemClick = (child: IMenuItemChild) => {

  closeOpenMenuItem(activeMenuItem.value)

  activeMenuItem.value = null

  child.link ? router.push(child.link) : null
}

const closeOpenMenuItem = (menuItem: null|string) => {
  menuItemsIsClosing.value[menuItem as string] = true

  setTimeout(() => {
    menuItemsIsClosing.value[menuItem as string] = false
  }, 100)
}

const updateDimensions = () => {
  sectionsEl.value!.style.height = (window.innerHeight - logoContainerEl.value!.offsetHeight - footerEl.value!.offsetHeight) + 'px'
}

onMounted(() => {
  menuItemsIsClosing.value = props.items ? props.items.reduce((acc, value) => {
    return {...acc, [value.name]: false}
  }, {}) : {}

  updateDimensions()
})
</script>

<template>
  <aside class="side-menu">
    <div class="side-menu__container">
      <div class="side-menu__header" v-click-outside="onClickOutside">
        <div ref="logoContainerEl" class="side-menu__logo-container" @click="onSectionMenuItemClick(null)">
          <slot/>
        </div>
        <div ref="sectionsEl" class="side-menu__sections v-scrollable" v-scrollable="{trackYClass: '--side-menu-track-y', sliderYClass: '--side-menu-slider-y'}">
          <ul class="side-menu__sections-list">
            <template v-for="menuItem in props.items">
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
                    @click="onSubSectionMenuItemClick(child)"
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
      <div ref="footerEl" class="side-menu__footer">
        <a @click="logout">Выйти</a>
      </div>
    </div>
  </aside>
</template>

<style>
.scrollable__track-y.--side-menu-track-y {
  width: 2px;
  right: unset;
  left: 0;
}

.scrollable__slider-y.--side-menu-slider-y {
  width: 2px;
}
</style>