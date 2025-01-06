<script setup lang="ts">
import Browser, { type IItem } from '#backoffice-ui/components/Browser.vue';
import type { Ref } from 'vue'

definePageMeta({
  middleware: ['auth'],
})

const item: Ref<IItem|null> = ref(null)

const requestProperties = ref([
  'id',
  'name',
  'email',
  'created_at'
])

const columns = ref([
  {
    name: 'id',
    title: 'ID',
  },
  {
    name: 'name',
    title: 'Имя'
  },
  {
    name: 'email',
    title: 'Email'
  },
  {
    name: 'created_at',
    title: 'Дата создания',
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
])

const onItemUpdated = (item: IItem) => {
  item.value = item
}
</script>

<template>
  <Browser
      h1="Менеджеры"
      url-prefix="managers/browse"

      detail-url-prefix="managers/detail"
      detail-title-property="id"
      detail-subtitle-property="name"

      :columns="columns"
      :request-properties="requestProperties"

      @itemUpdated="onItemUpdated"
  />
</template>