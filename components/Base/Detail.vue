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
import {useRouter} from "#imports"

export default {
  setup() {
    const router = useRouter()

    return {
      router
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
    fetchUrl: {
      type: String,
      required: false
    },
  },
  components: {
    BaseLink
  },
  data() {
    return {
      item: {}
    }
  },
  methods: {
    onClickBack() {
      this.router.back()
    },
    async fetchData() {
      this.isLoading = true

      try {

        const fetchUrl = this.fetchUrl

        const response = await useCustomFetch(fetchUrl.toString(), {
          params: {
            id: this.dataId
          }
        })

        this.item = response.data.value
      } catch (e) {
        alert(e)
      }
      this.isLoading = false

      this.$emit('itemUpdated', this.item)
    }
  },
  created() {
    if (this.fetchUrl) {
      this.fetchData()
    }
  }
}
</script>