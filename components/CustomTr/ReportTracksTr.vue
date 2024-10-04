<script setup lang="ts">
type IItem = {[key: string]: any}

const props = defineProps<{
  item: IItem
}>()

const onClickInfo = () => {
  window.open('/music/' + props.item.content.track.id)
}
</script>

<template>
  <tr class="--disable-cursor">
    <td>
      <div>
        <p>
          {{ props.item.content.track.title_ru }}
        </p>
        <p style="color: grey;" v-if="props.item.content.classifier_version?.name_ru">
          {{ '[' + props.item.content.classifier_version?.name_ru + ']' }}
        </p>
      </div>
    </td>
    <td>
      <p v-if="props.item.content.authors" v-for="author in props.item.content.authors">
        {{ author.name_en }}
      </p>
    </td>
    <td>
      {{ props.item.content.label?.name_en }}
    </td>
    <td style="text-align: center">
      -
    </td>
    <td>
      <svg @click="onClickInfo()">
        <use xlink:href="/img/sprite.svg#primary"/>
      </svg>
    </td>
  </tr>
</template>

<style scoped>
svg {
  width: 20px;
  height: 20px;
  color: grey;
  cursor: pointer;
}

svg:hover {
  color: orange;
}
</style>