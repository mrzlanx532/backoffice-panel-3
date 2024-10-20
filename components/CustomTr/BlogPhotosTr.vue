<script setup lang="ts">
import ButtonDropdown from '~/components/Base/ButtonDropdown.vue'
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
  const formResponse = await $authFetch('blog/posts/contents/form', {
    method: 'GET',
    params: {
      id: props.item.id,
    },
  })

  $modal.load('music/blog/photos/form', {
    title: 'Изменить фото',
    id: props.item.id,
    formResponse
  }).then(() => {
    $notification.push({type: 'success', message: 'Фото изменено'})
  })
}

const onClickDelete = async () => {
  $modal.confirm().then(async (isAgree: boolean) => {
    if (!isAgree) {
      return
    }

    await $authFetch('music/blog/photos/delete', {
      method: 'POST',
      body: {
        id: props.item.id,
      },
    })

    props.browserSmallEl.exposed.reset()
    $notification.push({type: 'success', message: 'Фото удалено'})
  })
}

const buttonDropdownItems = [
  { title: 'Изменить', class: '--primary', onClick: onClickEdit },
  { title: 'Удалить', class: '--danger', onClick: onClickDelete },
]
</script>

<template>
  <tr class="--disable-cursor">
    <td>
      <img :src="props.item.picture.original" alt="picture">
      <p>{{ props.item.name }}</p>
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