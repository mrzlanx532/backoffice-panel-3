<script setup lang="ts">
import BaseLink from '~/components/Base/BaseLink.vue'
import { type IItem } from '~/composables/useBrowser'

interface IRow {
  title: string,
  name: string,
}

interface ISection {
  title: string,
  rows: IRow[]
}

const props = withDefaults(defineProps<{
  entityName: string,
  backLink: string,
  backLinkTitle?: string
  item: IItem
  sections: ISection[]
}>(), {
  backLinkTitle: 'Вернуться к таблице'
})
</script>

<template>
  <div class="detail">
    <BaseLink :to="props.backLink" class="detail__link-back --special">{{ props.backLinkTitle }}</BaseLink>

    <div class="detail__header">
      <div class="detail__header-title">{{ props.entityName }} {{ props.item.id }}</div>
      <div class="header__actions">
        <slot name="actions"/>
      </div>
    </div>

    <div class="clouds" v-if="props.sections.length">
      <div class="clouds__cloud" v-for="section in props.sections">
        <div class="clouds__cloud-header" v-if="section.title">{{ section.title }}</div>
        <div class="clouds__cloud-row" v-for="row in section.rows">
          <div class="clouds__cloud-row-name">{{ row.title  }}</div>
          <div class="clouds__cloud-row-value">{{ item[row.name] }}</div>
        </div>
      </div>
    </div>

  </div>
</template>