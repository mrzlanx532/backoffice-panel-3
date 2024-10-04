<script setup lang="ts">
import Button from '~/components/Base/Button.vue'
import { prepareDuration } from '~/helpers/functions-for-table-columns'

type IItem = {[key: string]: any}

const props = defineProps<{
  item: IItem
}>()

const onClickListen = () => {
  window.alert('Слушаем песню..')
}

const onClickInfo = () => {
  window.open('/sounds/' + props.item.id)
}
</script>

<template>
  <tr class="--disable-cursor">
    <td>
      {{ props.item.description_en }}
    </td>
    <td class="--min-width">
      {{ props.item.variation ? prepareDuration(props.item.variation.duration) : '-' }}
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
    <td class="--min-width">
      {{ '[ДРОПДАУН_С_КНОПКАМИ]' }}
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