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
              <tr v-for="item in items" @click="onClickRow(item)">
                <td v-for="column in columns">
                  <template v-if="column.hasOwnProperty('component')">
                    <component :is="column.component" :item="item"/>
                  </template>
                  <template v-else-if="column.hasOwnProperty('preset')">
                    {{ handleByPreset(column, item)}}
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
<script>
import isEmpty from "lodash.isempty"
import debounce from "lodash.debounce"
import moment from "moment";
import Spinner from "@/components/Base/Spinner"
import BrowserSelectFilter from "@/components/Base/Browser/BrowserSelectFilter"
import BrowserSelectSearchFilter from "@/components/Base/Browser/BrowserSelectSearchFilter"
import BrowserInputFilter from "@/components/Base/Browser/BrowserInputFilter"
import BrowserDateFilter from "@/components/Base/Browser/BrowserDateFilter.vue"
import BrowserBooleanFilter from "@/components/Base/Browser/BrowserBooleanFilter.vue"
import BrowserSearchString from "@/components/Base/Browser/BrowserSearchString"
import BrowserPagination from "@/components/Base/Browser/BrowserPagination"
import BrowserPaginationCountSelect from "@/components/Base/Browser/BrowserPaginationCountSelect"
import BrowserTHeadTh from "@/components/Base/Browser/BrowserTHeadTh";
import browserPresetsMethodsMixin from "@/helpers/browser-presets-methods-mixin";
import BrowserDetail from "@/components/Base/Browser/BrowserDetail";
import { useSlots } from "vue";

export default {
  setup() {
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

    return {
      isSlotRightSideExists,
      filterMapper,
      runtimeConfig
    }
  },
  name: 'Browser',
  expose: ['reset'],
  props: {
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
  },
  components: {
    Spinner,
    BrowserTHeadTh,
    BrowserSearchString,
    BrowserPagination,
    BrowserPaginationCountSelect,
    BrowserDetail,
  },
  computed: {
    fetchURL: function () {
      return `${this.runtimeConfig.public.laravelAuth.domain}/${this.urlPrefix}/browse`
    },
    detailPageUrl: function () {
      return '/' + (this.detailPageUrlPrefix ? `${this.detailPageUrlPrefix}/${this.id}` : `${this.urlPrefix}/${this.id}`)
    }
  },
  data () {
    return {
      id: null,
      item: {},
      localColumns: this.columns,
      localRequestProperties: this.requestProperties ? this.requestProperties.reduce((acc, value) => {
        return {...acc, [value]: value}
      }, {}) : null,
      localColumnsByName: this.columns.reduce((acc, value) => {
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
    }
  },
  watch: {
    selectedPaginationItemsCount: function () {
      this.fetchData()
    },
  },
  created() {
    this.fetchData().then(() => {
      this.firstLoadingIsActive = false
    })
  },
  methods: {
    ...browserPresetsMethodsMixin,
    async fetchData() {

      this.loadingIsActive = true

      const config = {}

      if (this.activeFilters) {
        const requestData = {};

        if (!isEmpty(this.activeFilters)) {
          requestData.filters = this.activeFilters
        }

        if (this.searchString !== '') {
          requestData.search_string = this.searchString
        }

        if (this.activeSort && this.sorts[this.activeSort]) {
          requestData.sort = {
            field: this.activeSort,
            direction: this.sorts[this.activeSort]
          }
        }

        if (this.selectedPaginationItemsCount !== 20) {
          requestData.per_page = this.selectedPaginationItemsCount
        }

        if (this.currentPage > 1) {
          requestData.page = this.currentPage
        }

        config.params = requestData
      }

      try {

        const data = await this.$authFetch(unref(this.fetchURL), config)

        this.fetchErrorStatusCode = null
        this.fetchErrorMessage = null

        this.totalItems = data.meta.count
        this.setItems(data.items)

        if (this.firstLoadingIsActive) {

          this.setFilters(data.filters)
          this.sorts = data.meta.sort.reduce((acc, value) => {
            return {...acc, [value]: null}
          }, {})
        }

        this.loadingIsActive = false

      } catch (err) {
        this.fetchErrorMessage = err.message
        this.fetchErrorStatusCode = 500
      }
    },
    reset() {
      this.currentPage = 1
      this.selectedPaginationItemsCount = 20
      this.activeFilters = {}
      this.activeSort = null

      Object.keys(this.sorts).map((key) => {
        this.sorts[key] = null
      })

      this.fetchData()
    },
    setFilters(filters) {
      const preparedFilters = [];
      const preparedFiltersByName = {};

      filters.forEach((filter) => {
        preparedFilters.push(filter)
        preparedFiltersByName[filter.id] = filter
      })

      this.filters = preparedFilters
      this.filtersByName = preparedFiltersByName
    },
    setItems(items) {
      const preparedItems = [];

      items.forEach((item) => {

        const filteredItem = {};

        for (let value in item) {

          if (!item.hasOwnProperty(value)) {
            continue;
          }

          if (this.localRequestProperties !== null && !this.localRequestProperties.hasOwnProperty(value)) {
            continue;
          }

          filteredItem[value] = item[value]
        }

        preparedItems.push(filteredItem)
      })

      this.items = preparedItems
    },
    onFilterValueChanged(filter) {
      this.prepareFilterValue(filter)
      this.currentPage = 1

      if (this.debouncedFetchDataFunction) {
        this.debouncedFetchDataFunction.cancel()
      }

      this.debouncedFetchDataFunction = debounce(this.fetchData, 100)
      this.debouncedFetchDataFunction()
    },
    prepareFilterValue(filter) {
      if (this.filtersByName[filter.id].config.range) {

        if (filter.value === null) {
          delete this.activeFilters[filter.id]

          return
        }

        const preparedFirstValue = filter.value[0] === null ? "" : filter.value[0]
        const preparedSecondValue = filter.value[1] === null ? "" : filter.value[1]

        if (preparedFirstValue === "" && preparedSecondValue === "") {
          delete this.activeFilters[filter.id]

          return
        }

        this.activeFilters[filter.id] = [preparedFirstValue, preparedSecondValue]

        return
      }

      if (this.filtersByName[filter.id].config.multiple) {

        filter.value.length ? this.activeFilters[filter.id] = filter.value : delete this.activeFilters[filter.id]

        return
      }

      if (filter.value === null || filter.value === '') {
        delete this.activeFilters[filter.id]

        return
      }

      this.activeFilters[filter.id] = [filter.value]
    },
    timestampToFormatPreset(column, rowItem) {

      const date = moment(rowItem[column.name] * 1000)

      if (!date.isValid()) {
        return null;
      }

      if (column.preset.hasOwnProperty('locale')) {
        date.locale(column.preset.locale)
      } else {
        date.locale('ru')
      }

      return column.preset.hasOwnProperty('format') ? date.format(column.preset.format) : date.format('L')
    },
    onSearchStringInput(value) {
      this.currentPage = 1
      this.searchString = value
      this.fetchData()
    },
    onChangePaginationItemsCount(value) {
      this.selectedPaginationItemsCount = value
      this.currentPage = 1
    },
    onChangePage(page) {
      this.currentPage = page
      this.fetchData()
    },
    onSortChanged(name, value) {

      if (this.activeSort !== name) {
        this.activeSort = name

        for (let sort in this.sorts) {
          this.sorts[sort] = null
        }
      }

      this.sorts[name] = value

      this.fetchData()
    },
    onClickRow(item) {

      if (this.id === item.id) {
        this.id = null

        this.$emit('clickRow', this.id)

        return
      }

      this.id = item.id

      this.$emit('clickRow', this.id)
    },
    onCloseBrowserDetail() {
      this.openItem = {}
    },
    onCloseDetail() {
      this.id = null
      this.selectedState = {}
    },
    onItemUpdated(item) {
      this.item = item

      this.$emit('itemUpdated', item)
    }
  }
}
</script>