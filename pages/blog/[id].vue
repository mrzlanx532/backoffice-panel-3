<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useNuxtApp } from '#imports';
import { useAsyncData } from '#app'

import Section from '@/components/Base/Section.vue'
import Detail from '@/components/Base/Detail.vue'
import Button from '@/components/Base/Button.vue'
import FlexTable from '@/components/Base/FlexTable.vue'

const { $authFetch } = useNuxtApp()
const route = useRoute()

type IItem = {[key: string]: any}

const detailOptions = ref([
  {
    name: 'category',
    title: 'Категория',
    columnClass: 6,
    toFormat(item: IItem) {
      return item?.category?.name_ru
    }
  },
  {
    name: 'date',
    title: 'Дата',
    columnClass: 6
  },
  {
    name: 'created_at',
    title: 'Добавлен',
    columnClass: 6,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    columnClass: 6,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])

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
      <div class="section__group">
        <Section>
          <template v-slot:header>
            Краткое содержание
          </template>
          <template v-slot:content>
            {{ item.content_short ?? '[Не заполнено]' }}
          </template>
        </Section>
        <Section>
          <template v-slot:header>
            Полное содержание
          </template>
          <template v-slot:content>
            {{ item.content ?? '[Не заполнено]' }}
          </template>
        </Section>
        <FlexTable :config="detailOptions" :item="item"/>
      </div>
    </template>
  </Detail>
</template>