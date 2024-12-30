<script setup lang="ts">
import Section from '~/components/Base/Section.vue'
import FlexTable from '~/components/Base/FlexTable/FlexTable.vue';
import KeyValueTable from '~/components/Base/KeyValueTable.vue'

type IItem = Record<string, any>

const props = defineProps({
  item: {
    type: Object,
    required: false
  }
})

const shortConfig = ref([
  {
    name: 'description_ru',
    title: 'Описание (ru)',
    class: 6
  },
  {
    name: 'description_en',
    title: 'Описание (en)',
    class: 6
  },
])

const detailConfig = ref([
  {
    name: 'author',
    title: 'Автор',
    toFormat(item: IItem) {
      if (item.author) {
        return item.author?.name_ru
      }
    }
  },
  {
    name: 'library',
    title: 'Библиотека',
    toFormat(item: IItem) {
      if (item.library) {
        return item.library?.name_ru
      }
    }
  },
  {
    name: 'classifier_quality',
    title: 'Качество',
    toFormat(item: IItem) {
      if (item.classifier_quality) {
        return item.classifier_quality?.name_ru
      }
    }
  },
  {
    name: 'ucs',
    title: 'Категория',
    toFormat(item: IItem) {
      if (item.ucs) {
        return item.ucs?.name_ru
      }
    }
  },
  {
    name: 'ucs_sub',
    title: 'Подкатегория',
    toFormat(item: IItem) {
      if (item.ucs_sub) {
        return item.ucs_sub?.name_ru
      }
    }
  },
  {
    name: 'location_country',
    title: 'Локация',
    toFormat(item: IItem) {
      let total = ''

      if (item.location_country) {
        total = item.location_country?.name_ru
      }

      if (item.location_city) {
        total = total + ' (' + item.location_city?.name_ru + ')'
      }
    }
  },
  {
    name: 'classifier_microphones',
    title: 'Микрофоны',
    toFormat(item: IItem) {
      if (item.classifier_microphones) {
        return item.classifier_microphones?.name_ru
      }
    }
  },
  {
    name: 'classifier_space',
    title: 'Акустическое пространство',
    toFormat(item: IItem) {
      if (item.classifier_space) {
        return item.classifier_space?.name_ru
      }
    }
  },
  {
    name: 'classifier_perspective',
    title: 'Дистанция микрофона',
    toFormat(item: IItem) {
      if (item.classifier_perspective) {
        return item.classifier_perspective?.name_ru
      }
    }
  },
  {
    name: 'classifier_micsetup',
    title: 'Записывающая техника',
    toFormat(item: IItem) {
      if (item.classifier_micsetup) {
        return item.classifier_micsetup?.name_ru
      }
    }
  },
  {
    name: 'classifier_recorder',
    title: 'Рекордер',
    toFormat(item: IItem) {
      if (item.classifier_recorder) {
        return item.classifier_recorder?.name_ru
      }
    }
  },
  {
    name: 'classifier_keywords',
    title: 'Ключи',
    toFormat(item: IItem) {
      if (item.classifier_keywords) {
        return item.classifier_keywords.reduce((acc: string, _item: any) => {
          return acc + _item.name_ru
        }, '')
      }
    }
  },
])

const dateConfig = ref([
  {
    name: 'created_at',
    title: 'Добавлен',
    class: 4,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'updated_at',
    title: 'Изменен',
    class: 4,
    preset: {
      name: 'timestampToFormatPreset',
    }
  },
  {
    name: 'downloads_counter',
    title: 'Кол-во скачиваний',
    class: 4,
  },
])
</script>

<template>
  <div class="section__group" v-if="props.item">
    <Section>
      <template #content>
        <FlexTable :config="shortConfig" :item="props.item"/>
      </template>
    </Section>
    <Section>
      <template #header>
        Полная информация
      </template>
      <template #content>
        <KeyValueTable :config="detailConfig" :item="props.item"/>
      </template>
    </Section>
    <Section>
      <template #content>
        <FlexTable :config="dateConfig" :item="props.item"/>
      </template>
    </Section>
  </div>
</template>