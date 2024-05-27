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
        <component
            @change="onChangeFormData"
            :errors="errors"
            :is="tabs[selectedTab].component"
            :data="tabs[selectedTab]"
            :formData="formData"
            keep-alive
        />
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
import FormInput from "@/components/Base/Form/Input";
import FormSelect from "@/components/Base/Form/Select";

export default {
  setup() {
    const tabs = shallowRef([
      {
        title: 'Инфо',
        component: InfoTab,
        formData: [
          {
            name: 'first_name',
            label: 'Имя',
            component: FormInput
          },
          {
            name: 'last_name',
            label: 'Фамилия',
            component: FormInput
          },
          {
            name: 'email',
            label: 'E-mail',
            component: FormInput
          },
          {
            name: 'phone',
            label: 'Телефон',
            component: FormInput
          },
          {
            name: 'locale_id',
            label: 'Язык',
            class: '--full',
            component: FormSelect,
            componentData: {
              options: [
                {
                  id: 'ru',
                  title: 'Русский'
                },
                {
                  id: 'en',
                  title: 'Английский'
                },
                {
                  id: 'fr',
                  title: 'Французский'
                },
                {
                  id: 'au',
                  title: 'Австралийский'
                },
                {
                  id: 'ge',
                  title: 'Немецкий'
                },
                {
                  id: 'me',
                  title: 'Мексиканский'
                },
              ]
            }
          },
          {
            name: 'about',
            label: 'О себе',
            class: '--full',
            component: FormInput
          },
          {
            name: 'photo',
            label: 'Фотография',
            class: '--full',
            component: FormInput
          },
        ]
      },
      {
        title: 'Компания',
        component: CompanyTab,
        formData: [
          {
            name: 'company_name',
            label: 'Название компании',
            component: FormInput,
            class: '--full'
          },
          {
            name: 'company_business_type_id',
            label: 'Направление работы компании',
            component: FormInput,
            class: '--full'
          },
          {
            name: 'job_title',
            label: 'Должность',
            component: FormInput,
            class: '--full'
          },
          {
            name: 'company_url',
            label: 'Сайт компании',
            component: FormInput,
            class: '--full'
          },
          {
            name: 'company_index',
            label: 'Индекс',
            component: FormInput,
          },
          {
            name: 'company_country_id',
            label: 'Страна',
            component: FormInput,
          },
          {
            name: 'company_city',
            label: 'Город',
            component: FormInput,
          },
        ]
      },
      {
        title: 'Подписка',
        component: SubscriptionTab,
        formData: [
          {
            name: 'subscription_type_id',
            label: 'Тип подписки',
            component: FormInput,
          },
          {
            name: 'subscription_till',
            label: 'Дата истечения',
            component: FormInput,
          },
          {
            name: 'subscription_till_for_exclusive_tracks',
            label: 'Дата истечения',
            component: FormInput,
            class: '--full'
          },
          {
            name: 'subscription_labels',
            label: 'Лейблы',
            component: FormInput,
            class: '--full'
          },
        ]
      }
    ])

    return {
      tabs
    }
  },
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
      errors: [],
    }
  },
  methods: {
    async onClickSave(isSave) {
      try {
        const response = await this.$authFetch('http://backoffice-api.lsmlocal.ru/users/create', {
          method: 'POST',
          body: this.formData
        })

        this.$emit('modal:resolve')

      } catch (err) {
        if (err.status === 422 && err.data.errors) {
           this.errors = err.data.errors
        }
      }
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