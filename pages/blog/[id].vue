<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from '#imports';
import Section from '@/components/Base/Section'
import Detail from '@/components/Base/Detail'
import Button from '@/components/Base/Button'
import FlexTable from '@/components/Base/FlexTable'

type IItem = {[key: string]: any}

const route = useRoute()

const entityId = route.params.id
const item: IItem = ref({})
const h1 = ref('Пост ' + entityId)

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

const onItemUpdated = (newItem: IItem) => {
  item.value = newItem
}
</script>

<template>
  <Detail
      :h1="h1"
      :data-id="entityId"
      @itemUpdated="onItemUpdated"
      url-prefix="blog/posts"
  >
    <template v-slot:header>
      <div class="btn__group">
        <Button :class="['--big --outline-primary']">Изменить</Button>
        <Button :class="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template v-slot:content>
      <ClientOnly>
        <Transition name="fade" mode="out-in">
          <div class="section__group">
            <Section>
              <template v-slot:header>
                Краткое содержание
              </template>
              <template v-slot:content>
                {{ item.content_short }}
              </template>
            </Section>
            <Section>
              <template v-slot:header>
                Полное содержание
              </template>
              <template v-slot:content>
                <div v-html="item.content"/>
              </template>
            </Section>
            <FlexTable :config="detailOptions" :item="item"/>
          </div>
        </Transition>
      </ClientOnly>
    </template>
  </Detail>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>