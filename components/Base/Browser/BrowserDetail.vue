<template>
  <div
      class="browser-detail"
      :class="[
        {'browser-detail_open': dataId !== null},
        {'browser-detail_loading': isLoading},
        {'browser-detail_closing': isClosing},
      ]"
  >
    <div class="browser-detail__container" :class="[
        {'browser-detail__container_open': dataId !== null && !isLoading},
        {'browser-detail__container_closing': isClosing}
        ]">
        <div class="browser-detail__header">
          <div class="browser-detail__header-first-row">
            <div class="browser-detail__header-title-container">
              <div class="browser-detail__header-title">
                {{ item[titleProperty]}}
              </div>
              <div class="browser-detail__header-subtitle">
                {{ item[subtitleProperty]}}
              </div>
            </div>
            <div class="browser-detail__header-buttons">
              <div class="browser-detail__header-more-button" @click="onClickMoreButton">
                <svg stroke="currentColor" class="feather feather-external-link">
                  <use xlink:href="/img/sprite.svg#more_button"/>
                </svg>
              </div>
              <div class="browser-detail__header-close-button" @click="onClickCloseButton">
                <svg>
                  <use xlink:href="/img/sprite.svg#cancel_cross" />
                </svg>
              </div>
            </div>
          </div>
          <div class="browser-detail__header-second-row" v-if="isSlotHeaderExists">
            <slot name="header"/>
          </div>
        </div>
        <div class="browser-detail__content v-scrollable" v-scrollable>
          <slot name="content"/>
        </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Base/Button"
import Spinner from "@/components/Base/Spinner";
import {useSlots} from "vue";
import {useCustomFetch} from "@/composables/useCustomFetch";
import {useRouter} from "#imports";

export default {
  setup() {
    const slots = useSlots()

    const isSlotHeaderExists = () => {
      return !!slots.header
    }

    const router = useRouter()

    return {
      isSlotHeaderExists,
      router
    }
  },
  name: 'BrowserDetail',
  components: {
    Button,
    Spinner
  },
  props: {
    titleProperty: {
      required: true,
      default: 'id'
    },
    subtitleProperty: {
      required: false
    },
    dataId: {
      required: true
    },
    detailPageUrlPrefix: {
      type: String,
      required: false
    },
    browserDetailFetchUrl: {
      type: String,
      required: false,
    },
    urlPrefix: {
      type: String,
      required: false
    },
  },
  computed: {
    fetchURL: function () {
      return `${this.urlPrefix}/detail`
    },
  },
  data() {
    return {
      item: {},
      isLoading: false,
      isClosing: false,
      setTimeoutInstance: null
    }
  },
  watch: {
    dataId: function (newValue) {

      if (this.setTimeoutInstance) {
        clearTimeout(this.setTimeoutInstance)
      }

      if (newValue === null) {
        this.item = {}

        this.isClosing = true

        const vue = this

        setTimeout(function() {
          vue.isClosing = false
        }, 500)
        return
      }

      this.fetchData()
    }
  },
  methods: {
    onClickCloseButton() {
      this.$emit('close');
    },
    onClickMoreButton() {
      if (this.detailPageUrlPrefix && this.dataId !== null) {

        this.router.push({path: this.detailPageUrlPrefix})
      }
    },
    async fetchData() {
      this.isLoading = true
      try {

        this.item = await this.$customFetch(unref(this.fetchURL), {
          params: {
            id: this.dataId
          }
        })

      } catch (err) {
        throw err
      }
      this.isLoading = false

      this.$emit('itemUpdated', this.item)
    }
  }
}
</script>