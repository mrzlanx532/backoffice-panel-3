<script setup lang="ts">
import Button from '~/components/Base/Button.vue'
import { prepareDuration } from '~/helpers/functions-for-table-columns'
import ButtonDropdown from '~/components/Base/ButtonDropdown.vue'

type IItem = Record<any, string>

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
  <tr class="--disable-cursor --disable-hover">
    <td>
      <p>{{ props.item.title_en }}</p>
      <p style="color: grey;">{{ props.item.album ? props.item.album.name_ru : '-' }}</p>
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
      <ButtonDropdown :items="[{title: 'Изменить', class: '--primary'}, {title: 'Удалить', class: '--danger'}]"/>
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