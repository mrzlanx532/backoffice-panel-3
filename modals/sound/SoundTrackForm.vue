<script setup lang="ts">
import { onMounted } from 'vue'
import { useNuxtApp } from '#imports'
import { type IUseFormDefaultProps } from '#backoffice-ui/types'

interface IFormResponse {
  ucs_sub_categories?: any[],
  libraries?: any[],
  location_countries?: any[],
  location_cities?: any[]
}

const {
  $authFetch
} = useNuxtApp()

const props = defineProps<IUseFormDefaultProps>()

const emit = defineEmits([
  'modal:resolve',
  'modal:close'
])

const {
  initFormWithTabs,
  fillComponents,

  select,
  selectWrap,
  textArea,
} = useForm()

const MainTab = {
  title: 'Инфо',
  formData: [
    select({
      name: 'author_id',
      label: 'Автор',
      onUpdate: async (value, findFormDataItemByName) => {

        formDataValues.library_id = undefined

        const libraryFormItem = findFormDataItemByName('library_id')

        libraryFormItem.componentData.options = []

        const response = await $authFetch<IFormResponse>('sound/tracks/form', {
          params: {
            author_id: value,
          }
        })

        libraryFormItem.componentData.options = response.libraries!.map(library => {
          return {
            id: library.id,
            title: library.name_ru
          }
        })
      },
    }),
    select({
      name: 'library_id',
      label: 'Библиотека',
    }),
    textArea({
      name: 'description_ru',
      label: 'Описание (ru)',
      class: '--full'
    }),
    textArea({
      name: 'description_en',
      label: 'Описание (en)',
      class: '--full'
    }),
  ]
}

const AttributesTab = {
  title: 'Атрибуты',
  formClass: '--3x3',
  formData: [
    select({
      name: 'ucs_id',
      label: 'Category',
      class: '--full',
      onUpdate: async (value, findFormDataItemByName) => {

        const ucsSubFormItem = findFormDataItemByName('ucs_sub_id')

        formDataValues.ucs_sub_id = undefined

        if (!value) {
          ucsSubFormItem.componentData.options = []
        }

        const response = await $authFetch<IFormResponse>('sound/tracks/form', {
          params: {
            ucs_category_id: value
          }
        })

        ucsSubFormItem.componentData.options = response.ucs_sub_categories!.map(ucsSubCategory => {
          return {
            id: ucsSubCategory.id,
            title: ucsSubCategory.name_ru,
          }
        })
      },
    }),
    select({
      name: 'ucs_sub_id',
      label: 'Subcategory',
      class: '--full'
    }),
    select({
      name: 'location_continent_id',
      label: 'Location (continent)',
      class: '--left',
      onUpdate: async (value, findFormDataItemByName) => {
        const locationCountryFormItem = findFormDataItemByName('location_country_id')

        formDataValues.location_country_id = undefined
        formDataValues.location_city_id = undefined

        const response = await $authFetch<IFormResponse>('sound/tracks/form', {
          params: {
            location_continent_id: value
          }
        })

        locationCountryFormItem.componentData.options = response.location_countries!.map(locationCountry => {
          return {
            id: locationCountry.id,
            title: locationCountry.name_ru,
          }
        })
      },
    }),
    select({
      name: 'location_country_id',
      label: 'Location (country)',
      class: '--middle',
      onUpdate: async (value, findFormDataItemByName) => {
        const locationCityFormItem = findFormDataItemByName('location_city_id')

        formDataValues.location_city_id = undefined

        const response = await $authFetch<IFormResponse>('sound/tracks/form', {
          params: {
            location_country_id: value
          }
        })

        locationCityFormItem.componentData.options = response.location_cities!.map(locationCity => {
          return {
            id: locationCity.id,
            title: locationCity.name_ru,
          }
        })
      },
    }),
    select({
      name: 'location_city_id',
      label: 'Location (city)',
      class: '--right',
    }),
    select({
      name: 'classifier_micsetup_id',
      label: 'Recording technique',
      class: '--full'
    }),
    select({
      name: 'classifier_recorder_id',
      label: 'Recorder',
      class: '--full'
    }),
    select({
      name: 'classifier_space_id',
      label: 'Acoustic space',
      class: '--left-half'
    }),
    select({
      name: 'classifier_perspective_id',
      label: 'Microphone distance',
      class: '--right-half'
    }),
    selectWrap({
      name: 'classifier_microphones',
      label: 'Microphones',
      class: '--full',
      componentData: {
        isFilterable: true,
      }
    }),
    selectWrap({
      name: 'classifier_keywords',
      label: 'Keywords',
      class: '--full',
      componentData: {
        isFilterable: true,
      }
    }),
  ]
}

const {
  tabsWithFormData,
  formDataValues,
  errors,
  getFormComponent
} = initFormWithTabs(
    'sound/tracks/create',
    'sound/tracks/update',
    [
      MainTab,
      AttributesTab
    ]
)

const setDefaultForUpdate = async () => {

  const params: {[key: string]: any} = {}

  if (formDataValues.author_id) {
    params.author_id = formDataValues.author_id
  }

  if (formDataValues.location_continent_id) {
    params.location_continent_id = formDataValues.location_continent_id
  }

  if (formDataValues.location_country_id) {
    params.location_country_id = formDataValues.location_country_id
  }

  if (formDataValues.ucs_id) {
    params.ucs_category_id = formDataValues.ucs_id
  }

  const response = await $authFetch<IFormResponse>('sound/tracks/form', { params })

  if (response.libraries) {
    tabsWithFormData.value[0].formData[1].componentData.options = response.libraries.map(library => {
      return {
        id: library.id,
        title: library.name_ru,
      }
    })
  }

  if (response.ucs_sub_categories) {
    tabsWithFormData.value[1].formData[1].componentData.options = response.ucs_sub_categories.map(uscSubCategory => {
      return {
        id: uscSubCategory.id,
        title: uscSubCategory.name_ru,
      }
    })
  }

  if (response.location_countries) {
    tabsWithFormData.value[1].formData[3].componentData.options = response.location_countries.map(locationCountry => {
      return {
        id: locationCountry.id,
        title: locationCountry.name_ru,
      }
    })
  }

  if (response.location_cities) {
    tabsWithFormData.value[1].formData[4].componentData.options = response.location_cities.map(locationCity => {
      return {
        id: locationCity.id,
        title: locationCity.name_ru,
      }
    })
  }
}

const FormComponent = getFormComponent(emit, props, tabsWithFormData, errors)

onMounted(async () => {
  fillComponents(props, tabsWithFormData, formDataValues, {
    authors: {
      to: 'author_id',
      fn(author) {
        return {
          id: author.id,
          title: author.name_ru
        }
      }
    },
    labels: {
      to: 'label_id',
      fn(label) {
        return {
          id: label.id,
          title: label.name_ru
        }
      }
    },
    ucs_categories: {
      to: 'ucs_id',
      fn(uscCategory) {
        return {
          id: uscCategory.id,
          title: uscCategory.name_ru,
        }
      }
    },
    location_continents: {
      to: 'location_continent_id',
      fn(locationContinent) {
          return {
            id: locationContinent.id,
            title: locationContinent.name_ru,
          }
      },
    },
    classifier_micsetup: {
      to: 'classifier_micsetup_id',
      fn(classifierMicsetup) {
          return {
            id: classifierMicsetup.id,
            title: classifierMicsetup.name_ru,
          }
      },
    },
    classifier_recorder: {
      to: 'classifier_recorder_id',
      fn(classifierRecorder) {
          return {
            id: classifierRecorder.id,
            title: classifierRecorder.name_ru,
          }
      },
    },
    classifier_space: {
      to: 'classifier_space_id',
      fn(classifierSpace) {
          return {
            id: classifierSpace.id,
            title: classifierSpace.name_ru,
          }
      },
    },
    classifier_perspective: {
      to: 'classifier_perspective_id',
      fn(classifierPerspective) {
          return {
            id: classifierPerspective.id,
            title: classifierPerspective.name_ru,
          }
      },
    },
    classifier_microphones: {
      to: 'classifier_microphones',
      fn(classifierMicrophones) {
        return {
          id: classifierMicrophones.id,
          title: classifierMicrophones.name_ru,
        }
      }
    },
    classifier_keywords: {
      to: 'classifier_keywords',
      fn(classifierKeyword) {
        return {
          id: classifierKeyword.id,
          title: classifierKeyword.name_ru,
        }
      }
    }
  })

  if (props.data.id) {
    await setDefaultForUpdate()
  }
})
</script>

<template>
  <FormComponent/>
</template>