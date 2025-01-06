<script setup lang="ts">
import { defineComponent, useNuxtApp } from '#imports'
import BrowserSmall from '#backoffice-ui/components/BrowserSmall.vue'
import ButtonDropdown from '#backoffice-ui/components/ButtonDropdown.vue'

const {
  $authFetch,
  $modal,
  $notification
} = useNuxtApp()

const props = defineProps<{
  item?: IItem,
}>()

type IItem = Record<string, any>

const filters = ref({
  'author_id': [props.item!.id]
})

const editColumn = defineComponent(
    (props) => {

      const items = [
        {
          title: 'Изменить',
          class: '--primary',
          onClick: async () => {
            const formResponse = await $authFetch('sound/libraries/form', {
              method: 'GET',
              params: {
                id: props.item.id,
              },
            })

            $modal.load('sound/libraries/form', {
              title: 'Изменить библиотеку',
              id: props.item.id,
              formResponse
            }).then(() => {
              $notification.push({type: 'success', message: 'Библиотека изменена'})
            })
          }
        },
        {
          title: 'Удалить',
          class: '--danger',
          onClick: async () => {
            $modal.confirm().then(async (isAgree) => {
              if (!isAgree) {
                return
              }

              await $authFetch('sound/libraries/delete', {
                method: 'POST',
                body: {
                  id: props.item.id,
                },
              })

              props.browserSmallEl.exposed.reset()
              $notification.push({type: 'success', message: 'Библиотека удалена'})
            })
          }
        },
      ]

      return () => {
        return h('div', [
          h(ButtonDropdown, {
            items: items
          }),
        ])
      }
    }, {
      props: {
        item: Object
      }
    }
)

const columns = [
  {
    name: 'name_ru',
    title: 'Библиотека',
  },
  {
    name: 'tracks_counter',
    title: 'Кол-во треков',
  },
  {
    name: '_',
    title: '',
    class: '--min-width',
    component: editColumn
  },
]

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'author_id': [value!.id]
      }
    }
)
</script>

<template>
  <BrowserSmall
      h1="Библиотеки"
      :columns="columns"
      url-prefix="sound/authors/libraries/browse"
      :filters="filters"
      :is-enabled-search="true"
  />
</template>