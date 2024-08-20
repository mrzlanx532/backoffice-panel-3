<script setup>
import BaseLink from "@/components/Base/BaseLink"
import { useRouter } from '#imports'

const router = useRouter()

const props = defineProps({
  h1: {
    type: String,
    required: false
  },
  dataId: {
    required: false
  },
})

const emit = defineEmits(['itemUpdated'])

const onClickBack = () => {
  router.back()
}
</script>

<template>
  <div class="detail">
    <BaseLink @click="onClickBack" class="detail__link-back --danger">Вернуться назад</BaseLink>
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