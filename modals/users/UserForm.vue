<script setup lang="ts">
import { onMounted } from 'vue'

import InfoTabComponent from '~/modals/users/_tabs/info.vue'
import CompanyTabComponent from '~/modals/users/_tabs/company.vue'
import SubscriptionTabComponent from '~/modals/users/_tabs/subscription.vue'

import Tabs from '~/components/Base/Tabs.vue'
import Form from '~/components/Base/Form.vue'

import type { defaultProps } from '~/composables/useForm'

const props = defineProps<defaultProps>()

const emit = defineEmits([
    'modal:resolve',
    'modal:close'
])

const {
  initFormWithTabs,
  input,
  select,
  inputFile,
  checkbox,
  textArea,
  date,
  switcher,
  fillComponents
} = useForm()

const InfoTab = {
  title: 'Инфо',
  component: InfoTabComponent,
  formData: [
    input({
      name: 'first_name',
      label: 'Имя',
    }),
    input({
      name: 'last_name',
      label: 'Фамилия',
    }),
    input({
      name: 'email',
      label: 'E-mail',
    }),
    input({
      name: 'phone',
      label: 'Телефон',
      componentData: {
        mask: '+7 (###) ###-##-##'
      }
    }),
    input({
      name: 'password',
      label: 'Пароль',
      componentData: {
        type: 'password'
      }
    }),
    input({
      name: 'password_confirmation',
      label: 'Подтверждение пароля',
      componentData: {
        type: 'password'
      }
    }),
    select({
      name: 'locale_id',
      label: 'Язык',
      class: '--full',
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
    }),
    textArea({
      name: 'about',
      label: 'О себе',
      class: '--full'
    }),
    inputFile({
      name: 'picture',
      label: 'Фотография',
      class: '--full',
      componentData: {
        allowedTypes: ['jpg', 'jpeg', 'png'],
        maxSizeMB: 20
      }
    }),
    checkbox({
      name: 'is_checked',
      label: 'Согласен с условиями пользовательского соглашения',
      class: '--full'
    })
  ]
}

const CompanyTab = {
  title: 'Компания',
  component: CompanyTabComponent,
  formClass: '--3x3',
  formData: [
    input({
      name: 'company_name',
      label: 'Название компании',
      class: '--full'
    }),
    input({
      name: 'company_business_type_id',
      label: 'Направление работы компании',
      class: '--full'
    }),
    input({
      name: 'job_title',
      label: 'Должность',
      class: '--full'
    }),
    input({
      name: 'company_url',
      label: 'Сайт компании',
      class: '--full'
    }),
    input({
      name: 'company_address',
      label: 'Адрес',
      class: '--full'
    }),
    input({
      name: 'company_index',
      label: 'Индекс',
    }),
    select({
      name: 'company_country_id',
      label: 'Страна',
    }),
    input({
      name: 'company_city',
      label: 'Город'
    })
  ]
}

const SubscriptionTab = {
  title: 'Подписка',
  component: SubscriptionTabComponent,
  formData: [
    select({
      section: 'Подписка',
      name: 'subscription_type_id',
      label: 'Тип подписки'
    }),
    date({
      name: 'subscription_till',
      label: 'Дата истечения',
      componentData: {
        format: 'DD.MM.yyyy'
      }
    }),
    date({
      section: 'Подписка на эксклюзивные треки',
      name: 'subscription_till_for_exclusive_tracks',
      label: 'Дата истечения',
      class: '--full',
      componentData: {
        format: 'DD.MM.yyyy'
      }
    }),
    switcher({
      name: 'remove',
      label: 'Отключить подписку на эксклюзивные треки',
      class: '--full'
    }),
    select({
      section: 'Подписка на лейблы',
      name: 'subscription_labels',
      label: 'Лейблы',
      class: '--full',
      componentData: {
        isMultiple: true
      }
    })
  ]
}

const {
  tabsWithFormData,
  formDataValues,
  errors,
  selectedTab,

  onClickSave,
  onChangeTab,
  onChangeFormData
} = initFormWithTabs(
    'users/create',
    'users/update',
    [
      InfoTab,
      CompanyTab,
      SubscriptionTab
    ],
)

onMounted(() => {
  fillComponents(props, tabsWithFormData, formDataValues, {
    locales: {
      to: 'locale_id',
      fn: (locale) => locale
    },
    company_countries: {
      to: 'company_country_id',
      fn(country) {
        return {
          id: country.id,
          title: country.name_ru,
        }
      }
    },
    subscription_types: {
      to: 'subscription_type_id',
    },
    labels: {
      to: 'subscription_labels',
      fn: (label) => {
        return {
          id: label.id,
          title: label.name_ru,
        }
      }
    }
  })
})
</script>

<template>
  <Form
    :title="props.data!.title"
    @close="$emit('modal:close')"
  >
    <template #header>
      <Tabs :tabs="tabsWithFormData" @change="onChangeTab"/>
    </template>
    <template #content>
      <keep-alive>
        <component
            @change="onChangeFormData"
            :errors="errors"
            :is="tabsWithFormData[selectedTab].component"
            :data="tabsWithFormData[selectedTab]"
            :formData="formDataValues"
            :class="tabsWithFormData[selectedTab].formClass ? tabsWithFormData[selectedTab].formClass : '--2x2'"
        />
      </keep-alive>
    </template>
    <template #footer>
      <div class="btn__group">
        <button class="btn --primary --big" @click="onClickSave(props, emit)">Сохранить</button>
        <button class="btn --outline-primary --big" @click="emit('modal:close')">Отмена</button>
      </div>
    </template>
  </Form>
</template>