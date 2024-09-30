<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useNuxtApp } from '#imports';
import { useAsyncData } from '#app'

import Content from '@/pages/blog/_parts/content.vue'
import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'

const { $authFetch } = useNuxtApp()
const route = useRoute()

type IItem = {[key: string]: any}

const response = await useAsyncData(
    'blog_detail',
    () => $authFetch('blog/posts/detail', {
      params: {
        id: route.params.id,
      }
    })
)

const entityId = route.params.id
const item: IItem = ref(response.data)
const h1 = ref('Пост ' + entityId)
</script>

<template>
  <Detail
      url-prefix="blog"
      :h1="h1"
      :data-id="entityId"
  >
    <template v-slot:header>
      <div class="btn__group">
        <Button :class="['--big --outline-primary']">Изменить</Button>
        <Button :class="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template v-slot:content>
      <Content :item="item"/>
    </template>
  </Detail>
</template>