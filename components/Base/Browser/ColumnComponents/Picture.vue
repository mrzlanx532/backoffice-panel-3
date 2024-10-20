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
  maxWidth?: number,
  firstLetterAsImage?: boolean
}>(), {
  height: 32,
  width: 32,
  maxWidth: 200,
  firstLetterAsImage: false
})

const prepareLetter = (property: string) => {
  return property.toUpperCase()[0]
}
</script>

<template>
  <div class="browser__tr-picture" :style="{maxWidth: maxWidth + 'px'}">
    <img
        v-if="props.item[props.column.name]"
        class="browser__tr-picture-img"
        :style="{
          height: props.height + 'px',
          width: props.width + 'px'
        }"
        :src="props.item[props.column.name].original"
        alt="picture"
    />
    <div
        v-else-if="props.firstLetterAsImage"
        class="browser__tr-picture-letter"
        :style="{
          height: props.height + 'px',
          width: props.width + 'px'
        }"
    >
      <div>
        {{ props.title ? prepareLetter(props.item[props.title]) : null}}
      </div>
    </div>
    <div
        class="browser__tr-picture-text"
        :title="props.title ? props.item[props.title] : null"
    >{{ props.title ? props.item[props.title] : null}}</div>
  </div>
</template>