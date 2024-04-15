<template>
  <div>
    <div>
      {{ this.localItem.subscription_type?.title }}<br>
      <span style="color: green;">{{ subscriptionDate }}</span>
    </div>
    <div v-if="this.localItem.subscription_type_id !== 'NONE'">
      <br>
      Эксклюзивные треки <br>
      {{ subscriptionDateExclusiveTracks === null ? 'Отсутствует' : subscriptionDateExclusiveTracks }}
    </div>
  </div>
</template>
<script>
export default {
  name: "SubscriptionRow",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localItem: this.item
    }
  },
  computed: {
    subscriptionDate: function () {
      return this.getDate('subscription_till')
    },
    subscriptionDateExclusiveTracks: function () {
      return this.getDate('subscription_till_for_exclusive_tracks')
    }
  },
  methods: {
    getDate(property) {
      if (this.localItem[property] === null) {
        return null
      }

      if (this.localItem.subscription_type_id === 'NONE') {
        return null
      }

      const date = new Date(this.localItem[property] * 1000)

      return `До ${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
    }
  }
}
</script>