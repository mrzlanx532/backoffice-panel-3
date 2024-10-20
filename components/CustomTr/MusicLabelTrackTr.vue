<script setup lang="ts">
import Button from '~/components/Base/Button.vue'
import { prepareDuration } from '~/helpers/functions-for-table-columns'

type IItem = {[key: string]: any}

const props = defineProps<{
  item: IItem
}>()

const onClickInfo = () => {
  window.open('/music/' + props.item.id)
}

const onClickListen = () => {
  window.alert('Слушаем песню..')
}
</script>

<template>
  <tr class="--disable-cursor">
    <td>
      <div>
        {{ props.item.title_en }} {{ props.item.title_ru ? '(' + props.item.title_ru + ')' : '' }}
      </div>
    </td>
    <td class="--min-width">
      {{ props.item.variation && props.item.variation.duration ? prepareDuration(props.item.variation.duration) : '-' }}
    </td>
    <td class="--min-width">
      <Button class="--small --success" @click="onClickListen">
        Слушать
      </Button>
    </td>
    <td class="--min-width">
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