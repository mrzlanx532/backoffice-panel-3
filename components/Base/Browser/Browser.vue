<script setup lang="ts">
import BrowserSelectFilter from "@/components/Base/Browser/BrowserSelectFilter.vue"
import BrowserSelectSearchFilter from "@/components/Base/Browser/BrowserSelectSearchFilter.vue"
import BrowserInputFilter from "@/components/Base/Browser/BrowserInputFilter.vue"
import BrowserDateFilter from "@/components/Base/Browser/BrowserDateFilter.vue"
import BrowserBooleanFilter from "@/components/Base/Browser/BrowserBooleanFilter.vue"
import BrowserSearchString from "@/components/Base/Browser/BrowserSearchString.vue"
import BrowserPagination from "@/components/Base/Browser/BrowserPagination.vue"
import BrowserPaginationCountSelect from "@/components/Base/Browser/BrowserPaginationCountSelect.vue"
import BrowserTHeadTh from "@/components/Base/Browser/BrowserTHeadTh.vue";
import Spinner from "@/components/Base/Spinner.vue"
import BrowserDetail from "@/components/Base/Browser/BrowserDetail.vue";
import browserPresetsMethodsMixin from "@/helpers/browser-presets-methods-mixin";

import isEmpty from "lodash.isempty"
import debounce from "lodash.debounce"
import moment from "moment";

import { useSlots } from "vue";
import { useNuxtApp } from '#imports'

const { $authFetch } = useNuxtApp()

type IItem = {[key: string]: any}

const emit = defineEmits([
  'clickRow',
  'itemUpdated'
])

onMounted(() => {
  fetchData().then(() => {
    firstLoadingIsActive.value = false
  })
})

const props = defineProps({
  itemPrimaryKeyPropertyName: {
    required: false,
    type: String,
    default: 'id'
  },
  columns: {
    type: Array,
    required: true
  },
  urlPrefix: {
    type: String,
    required: false
  },
  requestProperties: {
    type: Array,
    required: false
  },
  h1: {
    type: String,
    required: false
  },
  browserFetchUrl: {
    type: String,
    required: false,
  },
  browserDetailFetchUrl: {
    type: String,
    required: false,
  },
  detailPageUrlPrefix: {
    type: String,
    required: false
  },
  detailTitleProperty: {
    type: String,
    required: false,
    default: 'id'
  },
  detailSubtitleProperty: {
    type: String,
    required: false
  }
})

const browserDetail = ref(null)

const state = reactive({
  id: null,
  item: {},
  localColumns: props.columns,
  localRequestProperties: props.requestProperties ? props.requestProperties.reduce((acc, value) => {
    return {...acc, [value]: value}
  }, {}) : null,
  localColumnsByName: props.columns.reduce((acc, value) => {
    return {...acc, [value.name]: value}
  }, {}),
  filters: [],
  filtersByName: [],
  activeFilters: {},
  items: [],
  firstLoadingIsActive: true,
  loadingIsActive: false,
  searchString: '',
  fetchErrorStatusCode: null,
  fetchErrorMessage: null,
  openItem: {},
  paginationItemsCountOptions: [
    20, 50, 100
  ],
  selectedPaginationItemsCount: 20,
  totalItems: 0,
  currentPage: 1,
  sorts: {},
  activeSort: null,
  debouncedFetchDataFunction: null
})

const {
  id,
  item,
  localColumns,
  localRequestProperties,
  localColumnsByName,
  filters,
  filtersByName,
  activeFilters,
  items,
  firstLoadingIsActive,
  loadingIsActive,
  searchString,
  fetchErrorStatusCode,
  fetchErrorMessage,
  openItem,
  paginationItemsCountOptions,
  selectedPaginationItemsCount,
  totalItems,
  currentPage,
  sorts,
  activeSort,
  debouncedFetchDataFunction
} = toRefs(state)

const fetchURL = computed(() => {
  return `${runtimeConfig.public.laravelAuth.domain}/${props.urlPrefix}/browse`
})

const detailPageUrl = computed(() => {
  return '/' + (props.detailPageUrlPrefix ? `${props.detailPageUrlPrefix}/${state.id}` : `${props.urlPrefix}/${state.id}`)
})

const fetchData = async () => {

  loadingIsActive.value = true

  const config = {}

  if (activeFilters.value) {
    const requestData = {};

    if (!isEmpty(activeFilters.value)) {
      requestData.filters = activeFilters.value
    }

    if (searchString.value !== '') {
      requestData.search_string = searchString.value
    }

    if (activeSort.value && sorts.value[activeSort.value]) {
      requestData.sort = {
        field: activeSort.value,
        direction: sorts.value[activeSort.value]
      }
    }

    if (selectedPaginationItemsCount.value !== 20) {
      requestData.per_page = selectedPaginationItemsCount.value
    }

    if (currentPage.value > 1) {
      requestData.page = currentPage.value
    }

    config.params = requestData
  }

  try {

    const data = await $authFetch(unref(fetchURL.value), config)

    fetchErrorStatusCode.value = null
    fetchErrorMessage.value = null

    totalItems.value = data.meta.count

    setItems(data.items)

    if (firstLoadingIsActive.value) {

      setFilters(data.filters)
      sorts.value = data.meta.sort.reduce((acc, value) => {
        return {...acc, [value]: null}
      }, {})
    }

    loadingIsActive.value = false

  } catch (err) {
    fetchErrorMessage.value = err.message
    fetchErrorStatusCode.value = 500
  }
}

const slots = useSlots()

const isSlotRightSideExists = () => {
  return !!slots.rightSide
}

const filterMapper = shallowRef({
  SELECT: BrowserSelectFilter,
  SELECT_SEARCH: BrowserSelectSearchFilter,
  INPUT: BrowserInputFilter,
  DATE: BrowserDateFilter,
  BOOLEAN: BrowserBooleanFilter
})

const runtimeConfig = useRuntimeConfig()

watch(
    selectedPaginationItemsCount,
    () => {
      fetchData()
    }
)

const onClickRow = (item: IItem) => {

  if (id.value === item.id) {
    id.value = null

    emit('clickRow', id.value)

    return
  }

  id.value = item.id

  emit('clickRow', id.value)
}

const closeDetail = () => {
  onCloseDetail()
}

const onCloseBrowserDetail = () => {
  openItem.value = {}
}

const onCloseDetail = () => {
  id.value = null
}

const onItemUpdated = (item: IItem) => {
  item.value = item

  emit('itemUpdated', item)
}

const onSearchStringInput = (value) => {
  currentPage.value = 1
  searchString.value = value

  fetchData()
}

const onChangePaginationItemsCount = (value) => {
  selectedPaginationItemsCount.value = value
  currentPage.value = 1
}

const onChangePage = (page: number) => {
  currentPage.value = page

  fetchData()
}

const onSortChanged = (name, value) => {

  if (activeSort.value !== name) {
    activeSort.value = name

    for (let sort in sorts.value) {
      sorts.value[sort] = null
    }
  }

  sorts.value[name] = value

  fetchData()
}

const setItems = (_items: IItem[]) => {
  const preparedItems = [];

  _items.forEach((item: IItem) => {

    const filteredItem = {};

    for (let value in item) {

      if (!item.hasOwnProperty(value)) {
        continue;
      }

      if (localRequestProperties.value !== null && !localRequestProperties.value.hasOwnProperty(value)) {
        continue;
      }

      filteredItem[value] = item[value]
    }

    preparedItems.push(filteredItem)
  })

  items.value = preparedItems
}

const setFilters = (_filters) => {
  const preparedFilters = [];
  const preparedFiltersByName = {};

  _filters.forEach((filter) => {
    preparedFilters.push(filter)
    preparedFiltersByName[filter.id] = filter
  })

  filters.value = preparedFilters
  filtersByName.value = preparedFiltersByName
}

const onFilterValueChanged = (filter) => {
  prepareFilterValue(filter)
  currentPage.value = 1

  if (debouncedFetchDataFunction.value) {
    debouncedFetchDataFunction.value.cancel()
  }

  debouncedFetchDataFunction.value = debounce(fetchData, 100)
  debouncedFetchDataFunction.value()
}

const prepareFilterValue = (filter) => {
  if (filtersByName.value[filter.id].config.range) {

    if (filter.value === null) {
      delete activeFilters.value[filter.id]

      return
    }

    const preparedFirstValue = filter.value[0] === null ? "" : filter.value[0]
    const preparedSecondValue = filter.value[1] === null ? "" : filter.value[1]

    if (preparedFirstValue === "" && preparedSecondValue === "") {
      delete activeFilters.value[filter.id]

      return
    }

    activeFilters.value[filter.id] = [preparedFirstValue, preparedSecondValue]

    return
  }

  if (filtersByName.value[filter.id].config.multiple) {

    filter.value.length ? activeFilters.value[filter.id] = filter.value : delete activeFilters.value[filter.id]

    return
  }

  if (filter.value === null || filter.value === '') {
    delete activeFilters.value[filter.id]

    return
  }

  activeFilters.value[filter.id] = [filter.value]
}

const reset = (isUpdateItem = false) => {
  currentPage.value = 1
  selectedPaginationItemsCount.value = 20
  activeFilters.value = {}
  activeSort.value = null

  Object.keys(sorts.value).map((key) => {
    sorts.value[key] = null
  })

  fetchData()

  if (isUpdateItem) {
    browserDetail.value.fetchData()
  }
}

const timestampToFormatPreset = (column, rowItem) => {

  const date = moment(rowItem[column.name] * 1000)

  if (!date.isValid()) {
    return null;
  }

  if (column.preset.hasOwnProperty('locale')) {
    date.locale(column.preset.locale)
  } else {
    date.locale('ru')
  }

  return column.preset.hasOwnProperty('format') ? date.format(column.preset.format) : date.format('DD.MM.YYYY')
}

defineExpose({
  reset,
  closeDetail
})
</script>

<template>
  <div class="browser">
    <ClientOnly>
      <TransitionGroup name="fade">
        <div class="browser__control-panel" v-if="!firstLoadingIsActive">
          <div class="page__title-container">
            <div class="page__title">{{ h1 }}</div>
          </div>
          <BrowserSearchString @search="onSearchStringInput"/>
          <div class="browser__control-panel-right">
            <BrowserPagination
                :page="currentPage"
                :total="totalItems"
                :per-page="selectedPaginationItemsCount"
                @changePage="onChangePage"
            />
            <BrowserPaginationCountSelect
                @change="onChangePaginationItemsCount"
                :options="paginationItemsCountOptions"
                :selected-value="selectedPaginationItemsCount"
            />
            <div class="browser__control-panel-right-actions" v-if="isSlotRightSideExists">
              <slot name="rightSide"/>
            </div>
          </div>
        </div>
      </TransitionGroup>
      <div class="browser__spinner-container" v-if="firstLoadingIsActive">
        <Spinner class="--half-opacity"/>
      </div>
      <Transition name="fade">
        <div class="browser__container" v-if="!firstLoadingIsActive">
          <div class="browser__filters" v-if="filters.length">
            <template v-for="filter in filters">
              <component
                  :is="filterMapper[filter.type]"
                  :filter="filter"
                  :model-value="activeFilters[filter.id]"
                  @filterValueChanged="onFilterValueChanged"
              ></component>
            </template>
          </div>
          <div
              class="browser__error-container"
              v-if="fetchErrorStatusCode !== null"
          >
            <div class="browser__error">
              <div class="browser__error-status-code">
                Error code: {{ fetchErrorStatusCode }}
              </div>
              <div class="browser__error-message">
                {{ fetchErrorMessage }}
              </div>
            </div>
          </div>
          <div
              v-else
              class="browser__table-container"
              :class="[
                {'browser__table-container_loading': loadingIsActive},
              ]"
          >
            <table v-if="items.length" class="browser__table">
              <thead>
                <tr>
                  <BrowserTHeadTh
                      @sortChanged="onSortChanged"
                      v-for="column in columns"
                      :key="column.name"
                      :sorts="sorts"
                      :column="column"
                  />
                </tr>
              </thead>
              <tbody>
              <tr v-for="item in items" :key="item[itemPrimaryKeyPropertyName]" @click="onClickRow(item)">
                <td v-for="column in columns">
                  <template v-if="column.hasOwnProperty('component')">
                    <component :is="column.component" :item="item" :column="column"/>
                  </template>
                  <template v-else-if="column.hasOwnProperty('preset')">
                    {{ 'Тут должен быть handleByPreset' }}
                  </template>
                  <template v-else-if="column.hasOwnProperty('toFormat')">
                    {{ column.toFormat(item) }}
                  </template>
                  <template v-else>
                    {{ item[column.name] }}
                  </template>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="browser__label-empty-container" v-if="items.length === 0">
            <div class="browser__label-empty">
              Нет записей
            </div>
          </div>
        </div>
      </Transition>
    </ClientOnly>
    <BrowserDetail
        ref="browserDetail"
        :data-id="id"
        :title-property="detailTitleProperty"
        :subtitle-property="detailSubtitleProperty"
        :url-prefix="urlPrefix"
        :browser-detail-fetch-url="browserDetailFetchUrl"
        :detail-page-url-prefix="detailPageUrl"
        @close="onCloseDetail"
        @itemUpdated="onItemUpdated"
    >
      <template #header>
        <slot name="browserDetailHeader"/>
      </template>

      <template #content>
        <slot name="browserDetailContent"/>
      </template>

    </BrowserDetail>
  </div>
</template>