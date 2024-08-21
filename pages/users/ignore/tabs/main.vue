<script setup lang="ts">
import Section from '@/components/Base/Section'
import FlexTable from '@/components/Base/FlexTable';

const props = defineProps({
  item: {
    type: Object,
    required: false
  }
})

watch(
  () => props.item,
  (value) => {
    item.value = value
  }
)

const detailConfigInfo = ref([
  {
    name: 'name',
    title: 'Имя',
    columnClass: 12
  },
  {
    name: 'email',
    title: 'E-mail',
    columnClass: 6
  },
  {
    name: 'phone',
    title: 'Телефон',
    columnClass: 6,
  },
  {
    name: 'about',
    title: 'О себе',
    columnClass: 12,
  },
])

const detailConfigCompany = ref([
  {
    name: 'company_name',
    title: 'Компания',
    columnClass: 12
  },
  {
    name: 'company_business_type',
    title: 'Направление работы компании',
    columnClass: 6,
    toFormat(item) {
      return item?.company_business_type?.name_ru
    }
  },
  {
    name: 'job_title',
    title: 'Должность',
    columnClass: 6,
  },
  {
    name: 'company_address',
    title: 'Адрес',
    columnClass: 6,
  },
  {
    name: 'company_index',
    title: 'Индекс',
    columnClass: 6,
  },
  {
    name: 'company_country',
    title: 'Страна',
    columnClass: 6,
    toFormat(item) {
      return item?.company_country?.name_ru;
    }
  },
  {
    name: 'company_city',
    title: 'Город',
    columnClass: 6,
  },
  {
    name: 'about',
    title: 'Сайт компании',
    columnClass: 12,
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
</script>

<template>
  <div class="section__group" v-if="item">
    <Section>
      <template v-slot:header>
        Инфо
      </template>
      <template v-slot:content>
        <FlexTable :config="detailConfigInfo" :item="item"/>
      </template>
    </Section>
    <Section>
      <template v-slot:header>
        Компания
      </template>
      <template v-slot:content>
        <FlexTable :config="detailConfigCompany" :item="item"/>
      </template>
    </Section>
  </div>
</template>