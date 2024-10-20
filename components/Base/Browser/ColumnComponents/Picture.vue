<script setup lang="ts">
type IItem = Record<string, any>

const props = withDefaults(defineProps<{
  item: IItem
  column: {
    name: string,
    title: string,
    toFormat?: (item: IItem) => {title: string, class: string}
  },
  height?: number,
  width?: number,
  title?: string,
  maxWidth?: number
}>(), {
  height: 32,
  width: 32,
  maxWidth: 200
})
</script>

<template>
  <div class="browser__tr-picture" :style="{maxWidth: maxWidth + 'px'}">
    <img
        v-if="props.item[props.column.name]"
        :style="{
          height: props.height + 'px',
          width: props.width + 'px'
        }"
        :src="props.item[props.column.name].original"
        alt="picture"
    />
    <div
        class="browser__tr-picture-text"
        :title="props.title ? props.item[props.title] : null"
    >{{ props.title ? props.item[props.title] : null}}</div>
  </div>
</template>