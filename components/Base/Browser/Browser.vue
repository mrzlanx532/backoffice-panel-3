<script lang="ts">
export { type IItem, type IConfigItem } from '~/composables/useBrowser'

export interface IBrowser {
  reset: (isUpdateItem?: boolean) => void,
  resetSelectedIds: () => void,
  closeDetail: () => void
}
</script>

<script setup lang="ts">
import { type Ref, type Component, useSlots, defineComponent, h } from "vue";
import type { DebouncedFunc } from "lodash-es"
import isEmpty from "lodash.isempty"
import debounce from "lodash.debounce"
import { useBrowser, useNuxtApp } from '#imports'
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
import { type IItem, type IConfigItem, type IColumn } from '~/composables/useBrowser'
import BrowserDetailBulkActions from '~/components/Base/Browser/BrowserDetailBulkActions.vue'
import BrowserCheckbox from '~/components/Base/Browser/BrowserCheckbox.vue'

const {
  // Items
  items,
  setItems,
  getLocalRequestProperties,

  // Pagination
  totalItems,
  currentPage,
  onChangePage,

  // Other
  callPreset,
  firstLoadingIsActive,
  loadingIsActive,
  isVueComponent,
  getSubComponent
} = useBrowser()

interface Props {
  urlPrefix: string,
  detailUrlPrefix: string,

  columns: IColumn[],
  columnsBulkActions?: IColumn[],
  requestProperties?: string[],

  h1?: string,
  browserFetchUrl?: string,
  browserDetailFetchUrl?: string,
  itemPrimaryKeyPropertyName?: string,
  detailPageUrlPrefix: string,
  detailTitleProperty?: string,
  detailSubtitleProperty?: string,
  isMultipleSelectionIsEnable?: boolean,
  isOpenBulkActionsDetail?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemPrimaryKeyPropertyName: 'id',
  detailTitleProperty: 'id',
  isMultipleSelectionIsEnable: false,
  isOpenBulkActionsDetail: false,
})

const { $authFetch } = useNuxtApp()

const emit = defineEmits([
  'clickRow',
  'itemUpdated',
  'changeSelectedIds',
  'closeBulkActions'
])

enum FilterType {
  // noinspection JSUnusedGlobalSymbols
  SELECT = 'SELECT',
  SELECT_SEARCH = 'SELECT_SEARCH',
  INPUT = 'INPUT',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
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

interface IUnpreparedFilterValue {
  id: string,
  value: string[]|number[]|null[]|null|string
}

onMounted(() => {
  fetchData().then(() => {
    firstLoadingIsActive.value = false
  })
})

const browserDetail: Ref<Component|null> = ref(null)

const id: Ref<number|null> = ref(null)
const item: Ref<IItem|null> = ref(null)

/** multiple selections */
const allSelected: Ref<boolean> = ref(false)
const selectedIds: Ref<Record<string, boolean>> = ref({})

/** filters */
const filters: Ref<IFilter[]> = ref([])
const filtersByName: Ref<{[key: string]: IFilter}> = ref({})
const activeFilters: Ref<{[key: string]: any[]}> = ref({})

const searchString = ref('')
const fetchError: Ref<FetchError|null> = ref(null)
const openItem = ref({})
const paginationItemsCountOptions = ref([20, 50, 100])
const selectedPaginationItemsCount = ref(20)

/** sorts */
const sorts: Ref<{[key: string]: any}> = ref({})
const activeSort: Ref<string|null> = ref(null)

const debouncedFetchDataFunction: Ref<null|DebouncedFunc<() => Promise<void>>> = ref(null)
const localRequestProperties: Ref<{} | null> = ref(getLocalRequestProperties(props.requestProperties))

const detailPageUrl = computed(() => {
  return `/${props.detailPageUrlPrefix}/${id.value}`
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

    const data = await $authFetch(props.urlPrefix, config)

    fetchError.value = null
    totalItems.value = data.meta.count

    setItems(data.items, localRequestProperties)

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
  id.value = null
}

const onCloseBrowserDetail = () => {
  openItem.value = {}
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

const onClickMultipleCheckbox = (_id: string|number) => {
  if (selectedIds.value[_id]) {
    delete selectedIds.value[_id];
  } else {
    selectedIds.value[_id] = true
  }

  const preparedSelectedIds = prepareSelectedIds(selectedIds)

  if (!preparedSelectedIds.length) {
    allSelected.value = false
  }

  emit('changeSelectedIds', prepareSelectedIds(selectedIds))
}

const onClickAllSelected = () => {
  allSelected.value = !allSelected.value

  if (allSelected.value) {
    items.value.forEach((item: IItem) => {
      selectedIds.value[item.id] = true
    })
    emit('changeSelectedIds', prepareSelectedIds(selectedIds))
    return
  }

  selectedIds.value = {}
  emit('changeSelectedIds', prepareSelectedIds(selectedIds))
}

const prepareSelectedIds = (selectedIds: Ref<Record<string, boolean>>) => {
  const ids: string[] = [];

  Object.entries(selectedIds.value).forEach(([key, value]) => {
    if (!value) {
      return
    }

    ids.push(key)
  })

  return ids
}

const onCloseBulkActions = () => {
  emit('closeBulkActions')
}

const resetSelectedIds = () => {
  selectedIds.value = {}
}

defineExpose({
  reset,
  resetSelectedIds,
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
          <BrowserSearchString class="--fixed-search-string" @search="onSearchStringInput"/>
          <div class="browser__control-panel-right">
            <BrowserPagination
                :page="currentPage"
                :total="totalItems"
                :per-page="selectedPaginationItemsCount"
                @changePage="onChangePage($event, fetchData)"
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
                  <th v-if="isMultipleSelectionIsEnable" @click="onClickAllSelected" class="--min-width">
                    <BrowserCheckbox v-model="allSelected"/>
                  </th>
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
                <td v-if="isMultipleSelectionIsEnable" @click.stop="onClickMultipleCheckbox(item.id)">
                  <BrowserCheckbox v-model="selectedIds[item.id]"/>
                </td>
                <td v-for="column in columns">
                  <component
                      v-if="column.component && isVueComponent(column.component)"
                      :is="column.component"
                      :item="item"
                      :column="column"
                  />
                  <component
                      v-else-if="column.component && isVueComponent(column.component.component)"
                      :is="getSubComponent(column.component)"
                      :item="item"
                      :column="column"
                  />
                  <template v-else-if="column.preset">
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
        :url-prefix="props.detailUrlPrefix"
        :detail-page-url-prefix="detailPageUrl"
        @itemUpdated="onItemUpdated"
        @close="closeDetail"
    >
      <template v-if="slots.browserDetailHeaderTop" #header_top>
        <slot name="browserDetailHeaderTop"/>
      </template>

      <template v-if="slots.browserDetailHeader" #header>
        <slot name="browserDetailHeader"/>
      </template>

      <template #content>
        <slot name="browserDetailContent"/>
      </template>

    </BrowserDetail>
    <BrowserDetailBulkActions
        v-if="isMultipleSelectionIsEnable && props.columnsBulkActions"
        :columns="props.columnsBulkActions"
        :items="items"
        :selected-ids="selectedIds"
        :all-selected="allSelected"
        :is-open="isOpenBulkActionsDetail"
        :item-primary-key-property-name="props.itemPrimaryKeyPropertyName"
        @close-bulk-actions="onCloseBulkActions"
        @click-multiple-checkbox="onClickMultipleCheckbox"
    >
      <template v-if="slots.browserDetailBulkActionsHeader" #header>
        <slot name="browserDetailBulkActionsHeader"/>
      </template>
    </BrowserDetailBulkActions>
  </div>
</template>