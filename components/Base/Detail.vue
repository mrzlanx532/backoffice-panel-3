<script setup>
import BaseLink from "@/components/Base/BaseLink"
import { useNuxtApp, useRouter } from '#imports'
import { onMounted } from 'vue'

const app = useNuxtApp()
const router = useRouter()

const props = defineProps({
  h1: {
    type: String,
    required: false
  },
  dataId: {
    required: false
  },
  urlPrefix: {
    type: String,
    required: true
  },
})

const runtimeConfig = useRuntimeConfig()

const emit = defineEmits(['itemUpdated'])

const fetchURL = computed(() => {
  return `${runtimeConfig.public.laravelAuth.domain}/${props.urlPrefix}/detail`
})

const fetchData = async () => {
  try {
    const data = await app.$authFetch(fetchURL.value, {
      params: {
        id: props.dataId
      }
    })

    emit('itemUpdated', data)

  } catch (e) {
    alert(e)
  }
}

const onClickBack = () => {
  router.back()
}

onMounted(() => {
  fetchData()
})
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