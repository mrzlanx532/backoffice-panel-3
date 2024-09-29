<script setup lang="ts">
import InfoTab from '~/modals/users/tabs/info.vue'
import FormInput from '~/components/Base/Form/Input'
import FormSelect from '~/components/Base/Form/Select.vue'
import FormInputFile from '~/components/Base/Form/InputFile.vue'
import FormCheckbox from '~/components/Base/Form/Checkbox.vue'
import CompanyTab from '~/modals/users/tabs/company.vue'
import SubscriptionTab from '~/modals/users/tabs/subscription.vue'
import FormDate from '~/components/Base/Form/Date.vue'
import Tabs from '~/components/Base/Tabs.vue'
import Form from '~/components/Base/Form.vue'
import { useNuxtApp } from '#app'
import { onMounted } from 'vue'

const emit = defineEmits([
    'modal:resolve',
    'modal:close'
])

const { $authFetch } = useNuxtApp()

const props = defineProps({
  data: {
    type: Object,
    required: false
  }
})

const selectedTab = ref(0)

const errors = ref([])

const formDataValues = reactive({
  'first_name': '',
  'last_name': '',
  'email': '',
  'phone': '',
  'locale_id': '',
  'about': '',
  'picture': '',
  'is_checked': '',
  'company_name': '',
  'company_business_type_id': '',
  'job_title': '',
  'company_url': '',
  'company_index': '',
  'company_country_id': '',
  'company_city': '',
  'subscription_type_id': '',
  'subscription_till': '',
  'subscription_till_for_exclusive_tracks': '',
  'subscription_labels': '',
})

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
        name: 'is_checked',
        label: 'Согласен с условиями пользовательского соглашения',
        class: '--full',
        component: FormCheckbox,
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
        component: FormSelect,
        class: '--full',
        componentData: {
          options: []
        }
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
        component: FormSelect,
        componentData: {
          options: []
        }
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


const onChangeTab = (_selectedTab: number) => {
  selectedTab.value = _selectedTab
}

const onChangeFormData = (param, value) => {
  formDataValues[param] = value
}

const onClickSave = async () => {

  let formData = formDataValues

  if (formData.picture instanceof File) {

    formData = new FormData()

    Object.entries(formData).map(([key, value]) => {
      formData.append(key, value)
    })
  }

  let method = 'create'

  if (props.data!.id !== undefined) {
    method = 'update'
    formData.id = props.data!.id
  }

  try {
    const response = await $authFetch(`http://backoffice-api.lsmlocal.ru/users/${method}`, {
      method: 'POST',
      body: formData,
    })

    emit('modal:resolve')

  } catch (err) {
    if (err.status === 422 && err.data.errors) {
      errors.value = err.data.errors
    }
  }
}

onMounted(async () => {

  const formResponse = props.data.formResponse

  formResponse.company_business_types.forEach((companyBusinessType) => {
    tabs.value[1].formData[1].componentData.options.push({
      id: companyBusinessType.id,
      title: companyBusinessType.name_ru,
    })
  })

  formResponse.company_countries.forEach((companyCountry) => {
    tabs.value[1].formData[5].componentData.options.push({
      id: companyCountry.id,
      title: companyCountry.name_ru,
    })
  })

  if (props.data.id !== undefined) {
    Object.keys(formDataValues).map((key) => {
      formDataValues[key] = formResponse.entity[key]
    })
  }
})
</script>

<template>
  <Form
    :title="props.data!.title"
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
            :formData="formDataValues"
            keep-alive
        />
      </keep-alive>
    </template>
    <template #footer>
      <div class="btn__group">
        <button class="btn --primary --big" @click="onClickSave">Сохранить</button>
        <button class="btn --outline-primary --big" @click="emit('modal:close')">Отмена</button>
      </div>
    </template>
  </Form>
</template>