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
        <Button @click="onClickEdit" :classes="['--small --primary']">Выгрузка .xlsx</Button>
        <Button @click="onClickEdit" :classes="['--small --primary']">Еще действие</Button>
      </div>
    </template>

    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit" :classes="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickDelete" :classes="['--big --outline-danger']">Удалить</Button>
      </div>
      <Tabs @change="onChangeTab" :tabs="tabs"/>
    </template>

    <template #browserDetailContent>
<!--      <component :is="selectedTabMap" :item="item"/>-->
    </template>
  </Browser>
</template>
<script>

import Section from "@/components/Base/Section"
import SubscriptionRow from "@/components/CustomRows/users/SubscriptionRow"
import Button from "@/components/Base/Button";
import Tabs from "@/components/Base/Tabs";
import StateButton from "@/components/Base/StateButton"
import PageWithBrowserMixin from "@/mixins/pages/browser.js"

export default {
  name: 'UsersPage',
  mixins: [PageWithBrowserMixin],
  components: {
    Button,
    SubscriptionRow,
    Section,
    Tabs,
    StateButton
  },
  computed: {
    /*selectedTabMap() {

      const componentName = this.tabs[this.selectedTab].componentName

      return () => import(`@/pages/users/ignore/tabs/${componentName}`)
    }*/
  },
  data() {
    return {
      selectedTab: 0,
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
      ],
      tabs: [
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
      ],
      columns: [
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
      ],
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
    onChangeTab(index) {
      this.selectedTab = index;
    },
  }
}
</script>