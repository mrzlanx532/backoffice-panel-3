<script setup lang="ts">
import Section from '#backoffice-ui/components/Section.vue'
import FlexTable from '#backoffice-ui/components/FlexTable.vue'
import type { IConfigItem } from '#backoffice-ui/components/FlexTable.vue'
import type { PropType, Ref } from 'vue'

type IItem = {[key: string]: any}

defineProps({
  item: {
    type: Object as PropType<IItem>,
    required: false
  }
})

const detailConfig: Ref<IConfigItem[]> = ref([
  {
    name: 'id',
    title: 'ID',
    class: 6
  },
  {
    name: 'created_at',
    title: 'Дата создания',
    class: 6,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'name',
    title: 'Название проекта',
    class: 6
  },
  {
    name: 'content_counter',
    title: 'Кол-во треков',
    class: 6
  },
  {
    name: 'media',
    title: 'Медиа',
    class: 6
  },
  {
    name: 'region',
    title: 'Территория',
    class: 6
  },
])
</script>

<template>
  <div class="section__group" v-if="item">
    <Section>
      <template #header>
        Пользователь
      </template>
      <template #content>
        <BaseLink class="--primary" :to="'/'">
          {{ item?.user?.name }}
        </BaseLink>
      </template>
    </Section>
    <Section>
      <template #header>
        Информация
      </template>
      <template #content>
        <FlexTable :item="item" :config="detailConfig"/>
      </template>
    </Section>
  </div>
</template>