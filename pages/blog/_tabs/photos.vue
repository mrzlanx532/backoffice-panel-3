<script setup lang="ts">
import { useNuxtApp } from '#imports'
import BrowserSmall from '~/components/Base/BrowserSmall/BrowserSmall.vue'
import LibraryTracksTr from '~/components/CustomTr/LibraryTracksTr.vue'
import Button from '~/components/Base/Button.vue'
import BlogPhotoForm from '~/modals/blog/BlogPhotoForm.vue'

const props = defineProps<{
  item?: IItem,
}>()

const {
  $modal,
  $notification,
  $authFetch
} = useNuxtApp()

const browserEl = useTemplateRef<HTMLElement>('browserEl')

const filters = ref({
  'blog_post_id': [props.item!.id]
})

watch(
    () => props.item,
    (value) => {
      filters.value = {
        'blog_post_id': [value!.id]
      }
    }
)

const onClickCreate = async() => {
  const formResponse = await $authFetch('blog/posts/contents/form', {
    method: 'GET',
  })

  $modal.load(BlogPhotoForm, {
    title: 'Добавить фото',
    formResponse
  }).then(() => {
    browserEl.value!.reset()
    $notification.push({type: 'success', message: 'Фото добавлено'})
  })
}
</script>

<template>
  <BrowserSmall
      h1="Фото"
      urlPrefix="blog/posts/contents/browse"
      :filters="filters"
      :customTr="LibraryTracksTr"
      :is-enabled-t-head="false"
  >
    <template #actions>
      <Button class="--small --success" @click="onClickCreate">Добавить</Button>
    </template>
  </BrowserSmall>
</template>