<template>
  <Detail
      :h1="h1"
      :data-id="entityId"
      url-prefix="users"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button :classes="['--big --outline-primary']">Изменить</Button>
        <Button :classes="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template #content>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
      <ClientOnly>
        <Transition name="fade" mode="out-in">
          <component :is="selectedTabMap" :item="item"/>
        </Transition>
      </ClientOnly>
    </template>
  </Detail>
</template>
<script>
import { defineAsyncComponent } from 'vue'
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

    const tabs = [
      {
        title: 'Инфо',
        componentName: 'main'
      },
      {
        title: 'Подписка',
        componentName: 'subscription'
      },
      {
        title: 'Скачанное (музыка)',
        componentName: 'subscription'
      },
      {
        title: 'Скачанное (шумы)',
        componentName: 'subscription'
      },
      {
        title: 'Отчеты',
        componentName: 'subscription'
      },
    ]

    const selectedTab = shallowRef(0)
    const item = shallowRef({})

    const getAsyncComponent = () => {

      return defineAsyncComponent(() => {

        const componentName = tabs[selectedTab.value].componentName
        return import(`@/pages/users/ignore/tabs/${componentName}.vue`)
      })
    }

    let selectedTabMap = shallowRef(getAsyncComponent())

    watch(
        selectedTab,
        () => {
          selectedTabMap.value = getAsyncComponent()
        }
    )

    const onChangeSelectedTab = (tabIndex) => {
      selectedTab.value = tabIndex;
    }

    const onItemUpdated = (item) => {

      console.log(item)

      item.value = item
    }

    return {
      selectedTab,
      selectedTabMap,
      entityId,
      tabs,
      item,

      onChangeSelectedTab,
      onItemUpdated
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
  },
  methods: {
    onItemUpdated(item) {
      this.item = item
    }
  }
}
</script>