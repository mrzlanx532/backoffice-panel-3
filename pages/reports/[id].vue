<template>
  <Detail
      :h1="h1"
      fetchUrl="/reports/detail"
      :data-id="this.entityId"
      @itemUpdated="onItemUpdated"
  >
    <template v-slot:header>
      <div class="btn__group">
        <Button :classes="['--big --outline-primary']">Изменить</Button>
        <Button :classes="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template v-slot:content>
      <transition name="fade">
        <Section v-if="Object.keys(item).length > 0">
          <template v-slot:header>
            Основное
          </template>
          <template v-slot:content>
            <KeyValueTable :item="item" :config="detailConfig" class="--with-border"/>
          </template>
        </Section>
      </transition>
    </template>
  </Detail>
</template>
<script>
import Section from "@/components/Base/Section"
import Detail from "@/components/Base/Detail"
import Button from "@/components/Base/Button"
import KeyValueTable from "@/components/Base/KeyValueTable";
import { detailConfig } from "@/parts/reports"
import Spinner from "@/components/Base/Spinner";

export default {
  name: 'UserDetail',
  components: {
    Section,
    Detail,
    Button,
    KeyValueTable,
    Spinner
  },
  computed: {
    h1: function () {
      return 'Отчет #' + this.entityId
    }
  },
  asyncData({params}) {
    return {
      entityId: params.id
    }
  },
  data() {
    return {
      detailConfig,
      item: {}
    }
  },
  methods: {
    onItemUpdated(item) {
      this.item = item
    }
  }
}
</script>