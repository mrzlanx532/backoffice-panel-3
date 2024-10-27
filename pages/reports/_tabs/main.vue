<script setup lang="ts">
import Section from '~/components/Base/Section.vue'
import type { PropType, Ref } from 'vue'
import FlexTable from '~/components/Base/FlexTable/FlexTable.vue'
import type { IConfigItem } from '~/components/Base/FlexTable/FlexTable.vue'

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
    columnClass: 6
  },
  {
    name: 'created_at',
    title: 'Дата создания',
    columnClass: 6,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'name',
    title: 'Название проекта',
    columnClass: 6
  },
  {
    name: 'content_counter',
    title: 'Кол-во треков',
    columnClass: 6
  },
  {
    name: 'media',
    title: 'Медиа',
    columnClass: 6
  },
  {
    name: 'region',
    title: 'Территория',
    columnClass: 6
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