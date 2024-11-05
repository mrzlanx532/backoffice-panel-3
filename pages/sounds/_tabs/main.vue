<script setup lang="ts">
import Section from '~/components/Base/Section.vue'
import FlexTable from '~/components/Base/FlexTable/FlexTable.vue';

const props = defineProps({
  item: {
    type: Object,
    required: false
  }
})

const infoConfig = ref([
  {
    name: 'description_ru',
    title: 'Описание (ru)',
    columnClass: 6
  },
  {
    name: 'description_en',
    title: 'Описание (en)',
    columnClass: 6
  },
])

const fullConfig = ref([
  {
    name: 'description_ru',
    title: 'Описание (ru)',
    columnClass: 6
  },
  {
    name: 'description_en',
    title: 'Описание (en)',
    columnClass: 6
  },
])
</script>

<template>
  <div class="section__group" v-if="props.item">
    <Section>
      <template #content>
        <FlexTable :config="infoConfig" :item="props.item"/>
      </template>
    </Section>
    <Section>
      <template #header>
        Полная информация
      </template>
      <template #content>
        <FlexTable :config="infoConfig" :item="props.item"/>
      </template>
    </Section>
  </div>
</template>