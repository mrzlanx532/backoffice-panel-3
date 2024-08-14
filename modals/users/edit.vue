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
import FormInput from "@/components/Base/Form/Input"
import FormSelect from "@/components/Base/Form/Select";
import FormInputFile from "@/components/Base/Form/InputFile"
import FormDate from "@/components/Base/Form/Date"
import FormSwitcher from "@/components/Base/Form/Switcher"

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
            component: FormInput,
            componentData: {
              mask: '+7 (###) ###-##-##'
            }
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
            name: 'picture',
            label: 'Фотография',
            class: '--full',
            component: FormInputFile,
            componentData: {
              allowedTypes: ['jpg', 'jpeg', 'png', 'sql'],
              maxSizeMB: 20
            }
          },
          {
            name: 'test',
            label: 'Отключить подписку на эксклюзивные треки',
            class: '--full',
            component: FormSwitcher,
          },
          {
            name: 'subscription_till',
            label: 'Дата истечения',
            component: FormDate,
            componentData: {
              returnFormat: 'DD.MM.yyyy'
            }
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
            component: FormSelect,
            componentData: {
              options: [
                {
                  id: 'NONE',
                  title: 'Подписка отсутствует'
                },
                {
                  id: 'ONLY_MUSIC',
                  title: 'Только музыка'
                },
                {
                  id: 'ONLY_SOUNDS',
                  title: 'Только шумы'
                },
                {
                  id: 'MUSIC_AND_SOUNDS',
                  title: 'Музыка и шумы'
                },
              ]
            }
          },
          {
            name: 'subscription_till',
            label: 'Дата истечения',
            component: FormDate,
            componentData: {
              returnFormat: 'DD.MM.yyyy'
            }
          },
          {
            name: 'subscription_till_for_exclusive_tracks',
            label: 'Дата истечения',
            component: FormDate,
            class: '--full',
            componentData: {
              altPosition: () => ({
                top: -40,
                left: 120
              }),
              returnFormat: 'DD.MM.yyyy'
            }
          },
          {
            name: 'subscription_labels',
            label: 'Лейблы',
            component: FormInput,
            class: '--full'
          },
          {
            name: 'subscription_labels',
            label: 'Отключить подписку на эксклюзивные треки',
            component: FormInput,
            class: '--full'
          }
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
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        locale_id: '',
        about: '',
        picture: '',
        company_name: '',
        company_business_type_id: '',
        job_title: '',
        company_url: '',
        company_index: '',
        company_country_id: '',
        company_city: '',
        subscription_type_id: '',
        subscription_till: '',
        subscription_till_for_exclusive_tracks: '',
        subscription_labels: '',
        test: false,
      },
      errors: [],
    }
  },
  methods: {
    async onClickSave(isSave) {

      let formData = this.formData

      if (this.formData.picture instanceof File) {

        formData = new FormData()

        Object.entries(this.formData).map(([key, value]) => {
          formData.append(key, value)
        })
      }

      try {
        const response = await this.$authFetch('http://backoffice-api.lsmlocal.ru/users/create', {
          method: 'POST',
          body: formData,
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