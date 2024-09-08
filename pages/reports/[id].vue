<script setup lang="ts">
import Section from "@/components/Base/Section"
import Detail from "@/components/Base/Detail"
import Button from "@/components/Base/Button"
import KeyValueTable from "@/components/Base/KeyValueTable";
import { detailConfig } from "@/parts/reports"
import { useRoute } from '#imports'
import { ref, type Ref } from 'vue'
import { useAsyncData } from '#app'

type IItem = {[key: string]: any}

const route = useRoute()

const response = await useAsyncData(
    'report_detail',
    () => $authFetch(`${runtimeConfig.public.laravelAuth.domain}/reports/detail`, {
      params: {
        id: route.params.id,
      }
    })
)

const onItemUpdated = (item: IItem) => {
  item.value = item
}

const entityId = route.params.id
const item: IItem = ref(response.data)
const h1 = ref('Отчет ' + entityId)
</script>

<template>
  <Detail
      :h1="h1"
      url-prefix="reports"
      :data-id="entityId"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button :class="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template #content>
      <Section>
        <template v-slot:header>
          Основное
        </template>
        <template v-slot:content>
          <KeyValueTable :item="item" :config="detailConfig" class="--with-border"/>
        </template>
      </Section>
    </template>
  </Detail>
</template>