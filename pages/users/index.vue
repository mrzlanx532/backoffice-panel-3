<template>
  <Browser
      h1="Каталог пользователей"
      url-prefix="users"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name"
      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickEdit" :class="['--small --success']">Добавить</Button>
      </div>
    </template>

    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit" :class="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete" :class="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
    </template>

    <template #browserDetailContent>
      <Transition name="fade" mode="out-in">
        <component :is="selectedTabMap" :item="item"/>
      </Transition>
    </template>
  </Browser>
</template>
<script>

import { defineAsyncComponent } from 'vue'
import Section from "@/components/Base/Section"
import SubscriptionRow from "@/components/CustomRows/users/SubscriptionRow"
import Button from "@/components/Base/Button";
import Tabs from "@/components/Base/Tabs";
import StateButton from "@/components/Base/StateButton"
import PageWithBrowserMixin from "@/mixins/pages/browser.js"

export default {
  setup() {
    const columns = shallowRef([
      {
        name: 'id',
        title: 'ID'
      },
      {
        name: 'name',
        title: 'Имя'
      },
      {
        name: 'company',
        title: 'Подписка (Срок действия)',
        component: SubscriptionRow
      },
      {
        name: 'downloads_counter',
        title: 'Скач.'
      },
      {
        name: 'views_counter',
        title: 'Просмотр'
      },
      {
        name: 'created_at',
        title: 'Дата создания',
        preset: {
          name: 'timestampToFormatPreset',
        }
      },
    ])

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

    return {
      selectedTab,
      selectedTabMap,
      columns,
      tabs,

      onChangeSelectedTab
    }
  },
  name: 'UsersPage',
  mixins: [PageWithBrowserMixin],
  components: {
    Button,
    SubscriptionRow,
    Section,
    Tabs,
    StateButton
  },
  data() {
    return {
      requestProperties: [
        'id',
        'name',
        'subscription_till',
        'subscription_till_for_exclusive_tracks',
        'subscription_type_id',
        'subscription_type',
        'downloads_counter',
        'views_counter',
        'created_at'
      ]
    }
  },
  methods: {
    onClickEdit() {
      this.$modal.load('users/edit', {
        title: 'Создание пользователя'
      }).then(res => {
        console.log(res)
      })
    },
    async onClickDelete() {
      this.$modal.confirm({
        'question': 'Вы уверены?',
      }).then(confirm => {
        if (confirm) {
          console.log('Удаляем!!')
        }
      })
    },
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>