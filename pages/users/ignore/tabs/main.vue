<template>
  <div class="section__group" v-if="Object.keys(item).length > 0">
    <Section>
      <template v-slot:header>
        Инфо
      </template>
      <template v-slot:content>
        <FlexTable :config="detailConfigInfo" :item="item"/>
      </template>
    </Section>
    <Section>
      <template v-slot:header>
        Компания
      </template>
      <template v-slot:content>
        <FlexTable :config="detailConfigCompany" :item="item"/>
      </template>
    </Section>
  </div>
</template>
<script>
import Section from "@/components/Base/Section"
import FlexTable from "@/components/Base/FlexTable";
import { detailConfigInfo, detailConfigCompany } from "@/parts/users";

export default {
  name: "UsersMainTab",
  props: ['item'],
  components: {
    Section,
    FlexTable
  },
  data() {
    return {
      detailConfigInfo,
      detailConfigCompany
    }
  }
}
</script>