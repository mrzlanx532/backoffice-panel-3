<script setup lang="ts">
import { onMounted } from 'vue'

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
  formClass: '--3x3',
  formData: [
    input({
      name: 'company_name',
      label: 'Название компании',
      class: '--full'
    }),
    select({
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
  formData: [
    select({
      section: 'Подписка',
      name: 'subscription_type_id',
      label: 'Тип подписки',
      onUpdate(value, findFormDataItemByName) {
        // TODO: Код ниже работает неправильно
        // Происходит какая-то вакханалия в форме
        // Реактивность ломается

        // Вот так работает, а через функцию findFormDataItemByName - работает некорректно
        /*if (value === 'ONLY_MUSIC') {
          tabsWithFormData.value[2].formData[2].hide = true
          tabsWithFormData.value[2].formData[5].hide = true
        } else {
          tabsWithFormData.value[2].formData[2].hide = false
          tabsWithFormData.value[2].formData[2].componentData.description = 'fwefwe'
          tabsWithFormData.value[2].formData[5].hide = false
        }*/

        const item = findFormDataItemByName('subscription_labels')

        item!.hide = value === 'ONLY_MUSIC'
      },
    }),
    date({
      name: 'subscription_till',
      label: 'Дата истечения',
      componentData: {
        format: 'DD.MM.yyyy'
      }
    }),
    input({
      name: 'input_test',
      label: 'Для теста',
      componentData: {
        description: 'Тест'
      }
    }),
    date({
      section: 'Подписка на эксклюзивные треки',
      name: 'subscription_till_for_exclusive_tracks',
      label: 'Дата истечения',
      class: '--full',
      componentData: {
        format: 'DD.MM.yyyy',
        disabled: true
      },
    }),
    switcher({
      name: 'remove',
      label: 'Отключить подписку на эксклюзивные треки',
      class: '--full',
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

  getFormComponent
} = initFormWithTabs(
    'users/create',
    'users/update',
    [
      InfoTab,
      CompanyTab,
      SubscriptionTab
    ],
)

const FormComponent = getFormComponent(emit, props, tabsWithFormData, errors)

onMounted(() => {
  fillComponents(props, tabsWithFormData, formDataValues, {
    locales: {
      to: 'locale_id',
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
    },
    company_business_types: {
      to: 'company_business_type_id',
      fn: (companyBusinessType) => {
        return {
          id: companyBusinessType.id,
          title: companyBusinessType.name_en,
        }
      },
    }
  })
})
</script>

<template>
  <FormComponent/>
</template>