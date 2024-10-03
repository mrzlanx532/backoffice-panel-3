<script setup lang="ts">
import type { Component, Ref } from 'vue'
import { FetchError } from 'ofetch'
import { useNuxtApp } from '#imports'
import isEmpty from 'lodash.isempty'
import Spinner from '~/components/Base/Spinner.vue'
import BrowserTHeadTh from '~/components/Base/Browser/BrowserTHeadTh.vue'
import BrowserSelectFilter from '~/components/Base/Browser/BrowserSelectFilter.vue'
import BrowserSelectSearchFilter from '~/components/Base/Browser/BrowserSelectSearchFilter.vue'
import BrowserInputFilter from '~/components/Base/Browser/BrowserInputFilter.vue'
import BrowserDateFilter from '~/components/Base/Browser/BrowserDateFilter.vue'
import BrowserBooleanFilter from '~/components/Base/Browser/BrowserBooleanFilter.vue'
import debounce from 'lodash.debounce'
import type { DebouncedFunc } from 'lodash-es'
import moment from 'moment/moment'
import BrowserSearchString from '~/components/Base/Browser/BrowserSearchString.vue'
import BrowserPagination from '~/components/Base/BrowserSmall/BrowserPagination.vue'

type IItem = {[key: string]: any}

interface Props {
  filters?: {
    [key: string]: any[]
  }
  params: {
    [key: string]: any[]
  }
  itemPrimaryKeyPropertyName?: string,
  urlPrefix: string,
  columns?: IColumn[],
  requestProperties?: string[],
  isEnabledTHead?: boolean,
  customTr?: Component
}

const props = withDefaults(defineProps<Props>(), {
  itemPrimaryKeyPropertyName: 'id',
  isEnabledTHead: true,
  columns: () => [] as IColumn[],
})

enum FilterType {
  // noinspection JSUnusedGlobalSymbols
  SELECT = 'SELECT',
  SELECT_SEARCH = 'SELECT_SEARCH',
  INPUT = 'INPUT',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
}

interface IUnpreparedFilterValue {
  id: string,
  value: string[]|number[]|null[]|null|string
}

export interface IColumn {
  name: string,
  title: string,
  toFormat?: (item: {[key: string]: any}) => {}
  component?: Component,
  preset?: {
    name: string
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
  page: number,
  [key: string]: any
}

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

interface IFilter {
  id: string,
  title: string,
  type: keyof typeof FilterType,
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

const emit = defineEmits([
  'clickRow',
])

const { $authFetch } = useNuxtApp()

const filters: Ref<IFilter[]> = ref([])
const activeFilters: Ref<{[key: string]: any[]}> = ref({})
const filtersByName: Ref<{[key: string]: IFilter}> = ref({})
const firstLoadingIsActive = ref(true)
const loadingIsActive = ref(false)
const searchString = ref('')
const selectedPaginationItemsCount = ref(10)
const totalItems = ref(0)
const currentPage = ref(1)
const fetchError: Ref<FetchError|null> = ref(null)
const items: Ref<IItem[]> = ref([])
const debouncedFetchDataFunction: Ref<null|DebouncedFunc<() => Promise<void>>> = ref(null)

const filterMapper = shallowRef({
  SELECT: BrowserSelectFilter,
  SELECT_SEARCH: BrowserSelectSearchFilter,
  INPUT: BrowserInputFilter,
  DATE: BrowserDateFilter,
  BOOLEAN: BrowserBooleanFilter
})

/** sorts */
const sorts: Ref<{[key: string]: any}> = ref({})
const activeSort: Ref<string|null> = ref(null)

const localRequestProperties: Ref<{} | null> = ref(
    props.requestProperties ?
        props.requestProperties.reduce((acc, value) => {
          return {...acc, [value]: value}
        }, {}) :
        null
)

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

const fetchData = async () => {

  loadingIsActive.value = true

  const config: { params?: IRequestParams } = {}

  const requestData = {} as IRequestParams;

  if (props.filters) {
    requestData.filters = props.filters
  }

  if (props.params) {
    Object.entries(props.params).map(([key, value]) => {
      requestData[key] = value
    })
  }

  if (!isEmpty(activeFilters.value)) {
    requestData.filters = Object.assign(activeFilters.value, requestData.filters)
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

  try {

    const data = await $authFetch(props.urlPrefix, config)

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

const onClickRow = (item: IItem) => {
  emit('clickRow', item)
}

const onChangePage = (page: number) => {
  currentPage.value = page

  fetchData()
}

const onSearchStringInput = (value: string) => {
  currentPage.value = 1
  searchString.value = value

  fetchData()
}

watch(
    () => props.filters,
    () => {
      fetchData()
    }
)

onMounted(() => {
  fetchData().then(() => {
    firstLoadingIsActive.value = false
  })
})
</script>

<template>
  <div class="browser-small" :class="{'--is-disabled-thead': !isEnabledTHead}">
    <ClientOnly>
      <Transition name="fade">
        <div
            class="browser-small__container"
            :class="{'--empty': items.length === 0}"
            v-if="!firstLoadingIsActive"
        >
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
          >
            <BrowserSearchString
                @search="onSearchStringInput"
                class="--in-small-browser"
            />
            <BrowserPagination
                :page="currentPage"
                :total="totalItems"
                :per-page="selectedPaginationItemsCount"
                @changePage="onChangePage"
            />
            <div
                v-if="items.length === 0"
                class="browser-small__empty-list"
            >
              Список пуст
            </div>
            <template v-if="items.length">
              <table class="browser-small__table" :class="{'--loading': loadingIsActive}">
                <thead v-if="isEnabledTHead">
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
                  <template v-if="props.customTr">
                    <component :is="props.customTr" v-for="item in items" :item="item" :key="item[itemPrimaryKeyPropertyName]" @click="onClickRow(item)"/>
                  </template>
                  <template v-else>
                    <tr v-for="item in items" :key="item[itemPrimaryKeyPropertyName]" @click="onClickRow(item)">
                      <td v-for="column in columns">
                        <template v-if="column.hasOwnProperty('component')">
                          <component :is="column.component" :item="item" :column="column"/>
                        </template>
                        <template v-else-if="column.hasOwnProperty('preset')">
                          {{ callPreset(column.preset!.name, column as IConfigItem, item)}}
                        </template>
                        <template v-else-if="column.toFormat">
                          {{ column.toFormat(item) }}
                        </template>
                        <template v-else>
                          {{ item[column.name] }}
                        </template>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </template>
          </div>
        </div>
      </Transition>
    </ClientOnly>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>