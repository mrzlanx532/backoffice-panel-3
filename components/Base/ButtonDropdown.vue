<script setup lang="ts">
import { type Ref, type Component, h, nextTick } from 'vue'
import { defineComponent } from '#imports'

interface IItem {
  title: string,
  class: string,
  onClick?: () => {}
}

const props = defineProps<{
  items: IItem[],
}>()

const btnDropdownEl: Ref<Component|null> = ref(null)
const dropdownEl: Ref<Component|null> = ref(null)

const isOpen = ref(false)
const top = ref(0)
const left = ref(0)

const onClick = () => {

  const rect = btnDropdownEl.value.getBoundingClientRect()

  top.value = rect.top + rect.height + 5

  isOpen.value = true

  nextTick(() => {
    if ((rect.right + dropdownEl.value.clientWidth) > document.documentElement.clientWidth) {
      left.value = rect.right - dropdownEl.value.clientWidth
      return
    }

    left.value = rect.right - (dropdownEl.value.clientWidth / 2)
  })
}

const onClickOutside = () => {
  isOpen.value = false
}

const AuthorColumn = defineComponent(
    (props, expose) => {
      return () => {
        return h('div', {
          class: 'btn-dropdown__item',
          onClick: props.item.onClick
        }, {
          default: () => {
            return expose.slots.default()
          }
        })
      }
    }, {
      props: {
        item: Object
      }
    }
)

const listener = (e) => e.preventDefault()

const onMouseOver = () => {
  window.addEventListener('selectstart', listener)
}

const onMouseOut = () => {
  window.removeEventListener('selectstart', listener)
}
</script>

<template>
  <div
      ref="btnDropdownEl"
      class="btn-dropdown"
      :class="{'--is-open': isOpen}"
      @click="onClick"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
  >
    <svg>
      <use xlink:href="/img/temp_sprite.svg#more"/>
    </svg>
  </div>
  <teleport to="body">
    <div
        ref="dropdownEl"
        v-if="isOpen"
        class="btn-dropdown__container"
        :style="{top: top + 'px', left: left + 'px'}"
        v-click-outside="onClickOutside"
    >
      <AuthorColumn v-for="item in props.items" :class="item.class" :item="item">
        {{ item.title }}
      </AuthorColumn>
    </div>
  </teleport>
</template>
