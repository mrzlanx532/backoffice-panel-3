<script setup lang="ts">
import type { Component } from 'vue'

export interface IColumn {
  name: string,
  title: string,
  toFormat?: (item: {[key: string]: any}) => {}
  component?: any | {
    component: Component,
    [key: string]: any
  },
  preset?: {
    name: string
  }
}

const props = defineProps<{
  selectedIds: string[],
  items: Record<string, unknown>[],
  columns: IColumn[]
}>()
</script>

<template>
  <table style="width: 100%;">
    <thead>
      <tr>
        <th v-for="column in columns">
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <th>
          {{ item.id }}
        </th>
      </tr>
    </tbody>
  </table>
  <div v-if="!selectedIds.length" style="color: grey;">
    <p class="text-align-center">Здесь пока ничего нет</p>
    <p class="text-align-center">Выберите треки из каталога, чтобы совершать с ними массовые действия</p>
  </div>
</template>