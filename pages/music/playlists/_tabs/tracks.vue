<script setup lang="ts">
import BrowserSmall, { type IBrowser } from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import { h, type Ref } from 'vue'
import type { IColumn, IItem } from '~/composables/useBrowser'
import { defineComponent, useNuxtApp } from '#imports'
import Button from '~/components/Base/Button.vue'

const props = defineProps<{
  item?: IItem,
}>()

const {
  $modal,
  $authFetch
} = useNuxtApp()

const browserEl: Ref<IBrowser|null> = ref(null)

const AuthorColumn = shallowRef(defineComponent(
    (props) => {
      return () => {

        const children = []

        props.item.authors.forEach(_item => {
          children.push(h('p', _item.name_en))
        })

        return h('div', children)
      }
    }, {
      props: {
        item: {Object}
      }
    }
))

const ButtonColumn = shallowRef(defineComponent(
    (_props) => {
      return () => {
        return h(Button, {
          class: '--small --danger',
          onClick: () => {
            $modal.confirm().then(async (isAgree: boolean) => {
              if (isAgree) {
                await $authFetch('music/tracks/playlists/remove', {
                  method: 'POST',
                  body: {
                    track_id: _props.item.id,
                    playlist_id: props.item.id,
                  }
                })

                browserEl.value.reset()
              }
            })
          }
        }, {
          default: () => 'Убрать'
        })
      }
    }, {
      props: {
        item: {Object}
      }
    }
))

const columns: Ref<IColumn[]> = ref([
  {
    title: 'Название',
    toFormat(item: IItem) {
      return item.title_en
    }
  },
  {
    title: 'Авторы',
    component: AuthorColumn
  },
  {
    title: '',
    component: ButtonColumn,
    classes: ['--min-width']
  }
])

const filters = ref({
  'playlist_id': [props.item!.id]
})

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'playlist_id': [value!.id]
      }
    }
)
</script>

<template>
  <BrowserSmall
      h1="Треки"
      ref="browserEl"
      :columns="columns"
      url-prefix="music/playlists/tracks/browse"
      :filters="filters"
  />
</template>