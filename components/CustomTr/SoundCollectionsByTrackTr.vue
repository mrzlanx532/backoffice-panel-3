<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import Button from '~/components/Base/Button.vue'

const props = defineProps<{
  item: IItem,
  browserSmallEl: ComponentInternalInstance | null
}>()
</script>

<template>
  <tr class="--disable-cursor --disable-hover">
    <td>
      {{ props.item.name_ru }}
    </td>
    <td class="--min-width">
      <Button class="--danger">Убрать</Button>
    </td>
  </tr>
</template>