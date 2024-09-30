<script setup>
import BaseLink from "@/components/Base/BaseLink"

const emit = defineEmits(['itemUpdated'])

const props = defineProps({
  urlPrefix: {
    required: true,
    type: String,
  },
  h1: {
    type: String,
    required: false
  },
  dataId: {
    required: false
  }
})
</script>

<template>
  <div class="detail">
    <BaseLink :to="'/' + props.urlPrefix" class="detail__link-back --special">Вернуться назад</BaseLink>
    <div class="detail__header">
      <h1 class="detail__title">{{ h1 }}</h1>
      <div class="detail__control">
        <slot name="header"/>
      </div>
    </div>
    <div class="detail__content">
      <slot name="content"/>
    </div>
  </div>
</template>