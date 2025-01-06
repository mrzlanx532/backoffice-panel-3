<script setup lang="ts">
import Button from '#backoffice-ui/components/Button.vue'
import ButtonDropdown from '#backoffice-ui/components/ButtonDropdown.vue'
import Badge from '#backoffice-ui/components/Badge.vue'
import { prepareDuration } from '~/helpers/functions-for-table-columns'
import { useNuxtApp } from '#imports'
import type { ComponentInternalInstance } from 'vue'

type IItem = Record<any, string>

const {
  $authFetch,
  $modal,
  $notification
} = useNuxtApp()

const props = defineProps<{
  item: IItem,
  browserSmallEl: ComponentInternalInstance | null
}>()

const onClickEdit = async () => {
  const formResponse = await $authFetch('sound/tracks/form', {
    method: 'GET',
    params: {
      id: props.item.id,
    },
  })

  $modal.load('sound/form', {
    title: 'Изменить трек',
    id: props.item.id,
    formResponse
  }).then(() => {
    $notification.push({type: 'success', message: 'Трек изменен'})
  })
}

const onClickDelete = async () => {
  $modal.confirm().then(async (isAgree: boolean) => {
    if (!isAgree) {
      return
    }

    await $authFetch('sound/tracks/delete', {
      method: 'POST',
      body: {
        id: props.item.id,
      },
    })

    if (props.browserSmallEl?.exposed) {
      props.browserSmallEl.exposed.reset()
    }

    $notification.push({type: 'success', message: 'Трек удален'})
  })
}

const onClickDownload = () => {
  alert('Скачиваем')
}

const buttonDropdownItems = [
  { title: 'Скачать', class: '--primary', onClick: onClickDownload },
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
  <tr class="--disable-cursor --disable-hover">
    <td>
      <p>{{ props.item.name }}</p>
      <p style="color: grey;">{{ props.item.is_main ? 'Основная' : '' }}</p>
    </td>
    <td class="--min-width">
      {{ props.item.file_size + ' MB' }}
    </td>
    <td class="--min-width">
      {{ props.item.duration ? prepareDuration(props.item.duration) : '-' }}
    </td>
    <td class="--min-width">
      <Badge class="--success" title="Обработка выполнена"/>
    </td>
    <td class="--min-width">
      <Button class="--small --success" @click="onClickListen">
        Слушать
      </Button>
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