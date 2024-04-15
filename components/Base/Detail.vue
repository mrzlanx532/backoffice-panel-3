<template>
  <div class="detail">
    <Link @click="onClickBack" class="detail__link-back --danger">Вернуться назад</Link>
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
import Link from "@/components/Base/Link"

export default {
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
    Link
  },
  data() {
    return {
      item: {}
    }
  },
  methods: {
    onClickBack() {
      this.$router.back()
    },
    async fetchData() {
      this.isLoading = true

      try {
        this.item = await this.$axios.$get(process.env.BACKEND_API_BASE_URL + this.fetchUrl, {
          params: {
            id: this.dataId
          }
        })
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