<template>
  <Form
    :title="data.title"
    @close="$emit('modal:close')"
  >
    <template #header>
      <Tabs :tabs="tabs" @change="onChangeTab"/>
    </template>
    <template #content>
      <keep-alive>
        <component @change="onChangeFormData" :is="tabs[selectedTab].component" keep-alive/>
      </keep-alive>
    </template>
    <template #footer>
      <div class="btn__group">
        <button class="btn --primary --big" @click="onClickSave(true)">Сохранить</button>
        <button class="btn --outline-primary --big" @click="$emit('modal:close')">Отмена</button>
      </div>
    </template>
  </Form>
</template>
<script>

import Form from "@/components/Base/Form"
import Tabs from "@/components/Base/Tabs";
import InfoTab from "@/modals/users/tabs/info"
import CompanyTab from "@/modals/users/tabs/company"
import SubscriptionTab from "@/modals/users/tabs/subscription"

export default {
  name: 'UsersEdit',
  components: {
    Form,
    Tabs,
    InfoTab,
    CompanyTab,
    SubscriptionTab,
  },
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      selectedTab: 0,
      tabs: [
        {
          title: 'Инфо',
          component: InfoTab
        },
        {
          title: 'Компания',
          component: CompanyTab
        },
        {
          title: 'Подписка',
          component: SubscriptionTab
        }
      ],
      formData: {
        about: '',
        company_address: '',
        company_business_type_id: '',
        company_city: '',
        company_country_id: '',
        company_index: '',
        company_name: '',
        company_url: '',
        email: '',
        first_name: '',
        is_agree: '',
        job_title: '',
        last_name: '',
        locale_id: '',
        password: '',
        password_confirmation: '',
        phone: '',
        state_id: '',
        subscription_labels: '',
        subscription_till_for_exclusive_tracks: '',
        subscription_type_id: '',
      },
    }
  },
  methods: {
    onClickSave(isSave) {
      this.$axios.$post('http://backoffice-api.lsmlocal.ru/users/create', this.formData).then(result => {

        this.$emit('modal:resolve')
      })
    },
    onChangeTab(index) {
      this.selectedTab = index
    },
    onChangeFormData(param, value) {
      this.formData[param] = value
    }
  }
}
</script>