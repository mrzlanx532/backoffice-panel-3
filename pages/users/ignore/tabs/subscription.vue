<template>
  <div class="section__group">
    <Section>
      <template v-slot:header>
        Подписка
      </template>
      <template v-slot:content>
        <FlexTable :config="detailConfigSubscription" :item="item"/>
      </template>
    </Section>
    <Section>
      <template v-slot:header>
        Подписка на эксклюзивные треки
      </template>
      <template v-slot:content>
        <FlexTable :config="detailConfigSubscriptionExclusiveTracks" :item="item"/>
      </template>
    </Section>
  </div>
</template>
<script>
import Section from "@/components/Base/Section"
import FlexTable from "@/components/Base/FlexTable";
import { detailConfigSubscription, detailConfigSubscriptionExclusiveTracks } from "@/parts/users";

export default {
  name: "UsersSubscriptionTab",
  props: ['item'],
  components: {
    Section,
    FlexTable
  },
  data() {
    return {
      detailConfigSubscription,
      detailConfigSubscriptionExclusiveTracks
    }
  }
}
</script>