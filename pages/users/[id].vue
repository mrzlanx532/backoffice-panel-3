<template>
  <Detail
      :h1="h1"
      :data-id="entityId"
      fetchUrl="users/detail"
      @itemUpdated="onItemUpdated"
  >
    <template v-slot:header>
      <div class="btn__group">
        <Button :classes="['--big --outline-primary']">Изменить</Button>
        <Button :classes="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template v-slot:content>
      <Tabs @change="onChangeTab" :tabs="tabs"/>
      <component :is="selectedTabMap.content" :item="item"/>
    </template>
  </Detail>
</template>
<script>
import Section from "@/components/Base/Section"
import Detail from "@/components/Base/Detail"
import Button from "@/components/Base/Button"
import Tabs from "@/components/Base/Tabs"
import MainTab from "@/pages/users/ignore/tabs/main"
import SubscriptionTab from "@/pages/users/ignore/tabs/subscription"
import { useRoute } from '#imports'

export default {
  setup() {
    const route = useRoute()

    const entityId = route.params.id

    return {
      entityId
    }
  },
  name: 'UserDetail',
  components: {
    Section,
    Detail,
    Button,
    Tabs,
    MainTab,
    SubscriptionTab
  },
  computed: {
    h1: function () {
      return 'Пользователь ' + this.entityId
    },
    selectedTabMap: function () {
      return this.tabs[this.selectedTab]
    }
  },
  data() {
    return {
      item: {},
      selectedTab: 0,
      tabs: [
        {
          title: 'Инфо',
          content: MainTab
        },
        {
          title: 'Подписка',
          content: SubscriptionTab
        },
        {
          title: 'Скачанное (музыка)',
          content: SubscriptionTab
        },
        {
          title: 'Скачанное (шумы)',
          content: SubscriptionTab
        },
        {
          title: 'Отчеты',
          content: SubscriptionTab
        },
      ],
    }
  },
  asyncData({params}) {
    return {
      entityId: params.id
    }
  },
  methods: {
    onChangeTab(index) {
      this.selectedTab = index
    },
    onItemUpdated(item) {
      this.item = item
    }
  }
}
</script>