<script setup lang="ts">
import Button from '#backoffice-ui/components/Button.vue'
import ButtonDropdown from '#backoffice-ui/components/ButtonDropdown.vue'
import { prepareDuration } from '~/helpers/functions-for-table-columns'
import { useNuxtApp } from '#imports'

type IItem = Record<any, string>

const {
  $authFetch,
  $modal,
  $notification
} = useNuxtApp()

const props = defineProps<{
  item: IItem
}>()

const onClickEdit = async () => {
  const formResponse = await $authFetch('music/tracks/form', {
    method: 'GET',
    params: {
      id: props.item.id,
    },
  })

  $modal.load('music/form', {
    title: 'Изменить трек',
    id: props.item.id,
    formResponse
  }).then(() => {
    $notification.push({type: 'success', message: 'Трек изменен'})
  })
}

const onClickDelete = async () => {
  $modal.confirm().then(async (isAgree) => {
    if (!isAgree) {
      return
    }

    await $authFetch('music/tracks/delete', {
      method: 'POST',
      body: {
        id: props.item.id,
      },
    })

    props.browserSmallEl.exposed.reset()
    $notification.push({type: 'success', message: 'Трек удален'})
  })
}

const buttonDropdownItems = [
  { title: 'Изменить', class: '--primary', onClick: onClickEdit },
  { title: 'Удалить', class: '--danger', onClick: onClickDelete },
]

const onClickListen = () => {
  window.alert('Слушаем песню..')
}

const onClickInfo = () => {
  window.open('/sounds/' + props.item.id)
}
</script>

<template>
  <tr class="--disable-cursor">
    <td>
      {{ props.item.description_en }}
    </td>
    <td class="--min-width">
      {{ props.item.variation ? prepareDuration(props.item.variation.duration) : '-' }}
    </td>
    <td class="--min-width">
      <Button class="--small --success" @click="onClickListen">
        Слушать
      </Button>
    </td>
    <td class="--min-width">
      <svg @click="onClickInfo()">
        <use xlink:href="/img/sprite.svg#primary"/>
      </svg>
    </td>
    <td class="--min-width">
      <ButtonDropdown :items="buttonDropdownItems"/>
    </td>
  </tr>
</template>

<style scoped>
svg {
  width: 20px;
  height: 20px;
  color: grey;
  cursor: pointer;
}

svg:hover {
  color: orange;
}
</style>