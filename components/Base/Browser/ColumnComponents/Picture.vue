<script setup lang="ts">
type IItem = Record<string, any>

const props = withDefaults(defineProps<{
  item: IItem
  column: {
    name: string,
    title: string,
    toFormat: (item: IItem) => {title: string, class: string}
  },
  height?: number,
  width?: number
}>(), {
  height: 32,
  width: 32,
})
</script>

<template>
  <div :style="{height: props.height + 'px', width: props.width + 'px'}">
    <img v-if="props.item[props.column.name]" :src="props.item[props.column.name].original" alt="picture"/>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-2);
}
</style>