<script setup lang="ts">
import { type Ref, type Component, useSlots } from "vue";
import type { DebouncedFunc } from "lodash-es"
import isEmpty from "lodash.isempty"
import debounce from "lodash.debounce"
import moment from "moment";
import { useNuxtApp } from '#imports'
import { FetchError } from 'ofetch'

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

const { $authFetch } = useNuxtApp()

const emit = defineEmits([
  'clickRow',
  'itemUpdated'
])

enum FilterType {
  SELECT = 'SELECT',
  SELECT_SEARCH = 'SELECT_SEARCH',
  INPUT = 'INPUT',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
}

type IItem = {[key: string]: any}

export interface IConfigItem {
  columnClass: number,
  title: string,
  name: string,
  toFormat?: (item: {[key: string]: any}) => {},
  component?: {}
  preset?: {
    name: string,
    locale?: string ,
    format?: string
  }
}

interface IRequestParams {
  filters?: {},
  search_string?: string,
  sort?: {
    field: string,
    direction: string
  }
  per_page: number,
  page: number
}

interface IFilter {
  id: string,
  title: string,
  type: typeof FilterType,
  options?: {
    id: string,
    title: string,
  }[]
  config: {
    filter: boolean,
    hidden: boolean,
    mask: string|null,
    multiple: boolean,
    range: boolean,
    url: string
  }
}

interface IUnpreparedFilterValue {
  id: string,
  value: string[]|number[]|null[]|null|string
}

interface IColumn {
  name: string,
  title: string,
  toFormat?: (item: {[key: string]: any}) => {}
  component?: Component,
  preset?: {
    name: string
  }
}

interface Props {
  itemPrimaryKeyPropertyName?: string,
  columns: IColumn[],
  urlPrefix?: string
  requestProperties?: string[],
  h1?: string,
  browserFetchUrl?: string,
  browserDetailFetchUrl?: string,
  detailPageUrlPrefix?: string,
  detailTitleProperty?: string,
  detailSubtitleProperty?: string
}

const props = withDefaults(defineProps<Props>(), {
  itemPrimaryKeyPropertyName: 'id',
  detailTitleProperty: 'id'
})

onMounted(() => {
  fetchData().then(() => {
    firstLoadingIsActive.value = false
  })
})

const browserDetail: Ref<Component|null> = ref(null)

const id: Ref<number|null> = ref(null)
const item: Ref<IItem> = ref({})
const items: Ref<IItem[]> = ref([])
const localColumns: Ref<IColumn[]> = ref(props.columns)

/** filters */
const filters: Ref<IFilter[]> = ref([])
const filtersByName: Ref<{[key: string]: IFilter}> = ref({})
const activeFilters: Ref<{[key: string]: any[]}> = ref({})

const firstLoadingIsActive = ref(true)
const loadingIsActive = ref(false)
const searchString = ref('')
const fetchError: Ref<FetchError|null> = ref(null)
const openItem = ref({})
const paginationItemsCountOptions = ref([20, 50, 100])
const selectedPaginationItemsCount = ref(20)
const totalItems = ref(0)
const currentPage = ref(1)

/** sorts */
const sorts: Ref<{[key: string]: any}> = ref({})
const activeSort: Ref<string|null> = ref(null)

const debouncedFetchDataFunction: Ref<null|DebouncedFunc<() => Promise<void>>> = ref(null)

const localRequestProperties: Ref<{} | null> = ref(
    props.requestProperties ?
        props.requestProperties.reduce((acc, value) => {
          return {...acc, [value]: value}
        }, {}) :
        null
)
const localColumnsByName = props.columns.reduce((acc, value) => {
  return {...acc, [value.name]: value}
}, {})

const fetchURL = computed(() => {
  return `${runtimeConfig.public.laravelAuth.domain}/${props.urlPrefix}/browse`
})

const detailPageUrl = computed(() => {
  return '/' + (props.detailPageUrlPrefix ? `${props.detailPageUrlPrefix}/${id.value}` : `${props.urlPrefix}/${id.value}`)
})

const fetchData = async () => {

  loadingIsActive.value = true

  const config: { params?: IRequestParams } = {}

  if (activeFilters.value) {
    const requestData = {} as IRequestParams;

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

    fetchError.value = null
    totalItems.value = data.meta.count

    setItems(data.items)

    if (firstLoadingIsActive.value) {

      setFilters(data.filters)
      sorts.value = data.meta.sort.reduce((acc: {[key: string]: any}, value: string) => {
        return {...acc, [value]: null}
      }, {})
    }

    loadingIsActive.value = false

  } catch (err: unknown) {
    if (err instanceof FetchError) {
      fetchError.value = err
    }
  }
}

const slots = useSlots()

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

const onSearchStringInput = (value: string) => {
  currentPage.value = 1
  searchString.value = value

  fetchData()
}

const onChangePaginationItemsCount = (value: number) => {
  selectedPaginationItemsCount.value = value
  currentPage.value = 1
}

const onChangePage = (page: number) => {
  currentPage.value = page

  fetchData()
}

const onSortChanged = (name: string, value: string) => {

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
  const preparedItems: IItem[] = [];

  _items.forEach((item: IItem) => {

    const filteredItem: {[key: string]: any} = {};

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

const setFilters = (_filters: IFilter[]) => {
  const preparedFilters: IFilter[] = [];
  const preparedFiltersByName: {[key: string]: IFilter} = {};

  _filters.forEach((filter) => {
    preparedFilters.push(filter)
    preparedFiltersByName[filter.id] = filter
  })

  filters.value = preparedFilters
  filtersByName.value = preparedFiltersByName
}

const onFilterValueChanged = (unpreparedFilterValue: IUnpreparedFilterValue) => {
  prepareFilterValue(unpreparedFilterValue)
  currentPage.value = 1

  if (debouncedFetchDataFunction.value) {
    debouncedFetchDataFunction.value.cancel()
  }

  debouncedFetchDataFunction.value = debounce(fetchData, 100)
  debouncedFetchDataFunction.value()
}

const prepareFilterValue = (filter: IUnpreparedFilterValue) => {
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

  if (filtersByName.value[filter.id].config.multiple && filter.value instanceof Array) {

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
    browserDetail.value!.fetchData()
  }
}

const dynamicMethods: {[key: string]: (configItem: IConfigItem, item: IItem) => string | null} = {
  timestampToFormatPreset: (configItem: IConfigItem, item: IItem) => {

    const date = moment(item[configItem.name] * 1000)

    if (!date.isValid()) {
      return null;
    }

    if (configItem.preset?.hasOwnProperty('locale')) {
      date.locale(configItem.preset.locale!)
    } else {
      date.locale('ru')
    }

    return configItem.preset?.format ? date.format(configItem.preset.format) : date.format('DD.MM.YYYY')
  }
}

const callPreset = (methodName: string, configItem: IConfigItem, item: IItem) => {
  return dynamicMethods[methodName](configItem, item)
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
            <div class="browser__control-panel-right-actions" v-if="slots.rightSide">
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
              v-if="fetchError !== null"
          >
            <div class="browser__error">
              <div class="browser__error-status-code">
                Error code: {{ fetchError.statusCode }}
              </div>
              <div class="browser__error-message">
                {{ fetchError.message }}
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
                    {{ callPreset(column.preset!.name, column, item)}}
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