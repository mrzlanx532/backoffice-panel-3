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
  fillComponents,

  select,
  textArea,
} = useForm()

const MainTab = {
  title: 'Инфо',
  formData: [
    select({
      name: 'author_id',
      label: 'Автор',
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
      class: '--full'
    }),
    select({
      name: 'ucs_sub_id',
      label: 'Subcategory',
      class: '--full'
    }),
    select({
      name: 'location_continent_id',
      label: 'Location (continent)',
    }),
    select({
      name: 'location_country_id',
      label: 'Location (country)',
    }),
    select({
      name: 'location_city_id',
      label: 'Location (city)',
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
      class: '--full'
    }),
    select({
      name: 'classifier_perspective_id',
      label: 'Microphone distance',
      class: '--full'
    }),
    select({
      name: 'classifier_microphones',
      label: 'Microphones',
      class: '--full',
      componentData: {
        isMultiple: true,
        isFilterable: true
      }
    }),
    select({
      name: 'classifier_keywords',
      label: 'Keywords',
      class: '--full',
      componentData: {
        isMultiple: true,
        isFilterable: true
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

const FormComponent = getFormComponent(emit, props, tabsWithFormData, errors)

onMounted(async () => {
  fillComponents(props, tabsWithFormData, formDataValues, {
    authors: {
      to: 'author_id',
      fn: (author) => {
        return {
          id: author.id,
          title: author.name_ru
        }
      }
    },
    labels: {
      to: 'label_id',
      fn: (label) => {
        return {
          id: label.id,
          title: label.name_ru
        }
      }
    },
    ucs_categories: {
      to: 'ucs_id',
      fn: (uscCategory) => {
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
})
</script>

<template>
  <FormComponent/>
</template>