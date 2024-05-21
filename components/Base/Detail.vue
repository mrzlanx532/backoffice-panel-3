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

<script>
import BaseLink from "@/components/Base/BaseLink"
import { useRouter, useNuxtApp } from "#imports"
import { defineEmits, defineProps, onMounted } from 'vue'

export default {
  setup() {

    const app = useNuxtApp()

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

    const router = useRouter()

    const runtimeConfig = useRuntimeConfig()

    const item = ref({})
    const isLoading = ref(false)

    const emit = defineEmits(['itemUpdated'])

    const fetchURL = computed(() => {
      return `${runtimeConfig.public.laravelAuth.domain}/${props.urlPrefix}/detail`
    })

    const fetchData = async () => {

      isLoading.value = true

      try {
        const data = await app.$authFetch(fetchURL, {
          params: {
            id: props.dataId
          }
        })

        isLoading.value = false

        emit('itemUpdated', data)

      } catch (e) {
        alert(e)
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      router,
      runtimeConfig,
      item,

      fetchData
    }
  },
  name: "Detail",
  props: {
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
  },
  components: {
    BaseLink
  },
  methods: {
    onClickBack() {
      this.router.back()
    }
  }
}
</script>