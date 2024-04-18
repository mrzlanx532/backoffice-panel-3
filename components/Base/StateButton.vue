<template>
  <div class="btn-state__container">
    <button
        v-if="Object.keys(selectedOption).length > 0"
        type="button"
        class="btn-state"
        @click="isOpen = !isOpen"
        tabindex="0"
        @blur="onBlur"
        :class="[
            {'btn-state__open': isOpen},
            {'--default': selectedOptionLocal.class === '--default'},
            {'--primary': selectedOptionLocal.class === '--primary'},
            {'--success': selectedOptionLocal.class === '--success'},
            {'--warning': selectedOptionLocal.class === '--warning'},
            {'--danger': selectedOptionLocal.class === '--danger'},
        ]"
    >
      {{ selectedOptionLocal.title }}
    </button>
    <button
        v-else
        class="btn-state --default"
        v-html="loadingMessage"
    />
    <div class="btn-state__dropdown" :class="{'btn-state__dropdown_open': isOpen}">
      <div
          v-for="option in options"
          class="btn-state__dropdown-option"
          @mousedown="onOptionClick(option)"
      >{{ option.title }}</div>
    </div>
  </div>
</template>
<script>
import {useCustomFetch} from "@/composables/useCustomFetch";

export default {
  name: "StateButton",
  props: {
    options: {
      required: true,
      type: Array
    },
    url: {
      required: false,
      type: String
    },
    selectedOption: {
      required: false,
      type: Object
    },
    updateParamName: {
      required: false,
      type: String,
      default: 'state_id'
    },
    dataId: {
      required: false,
      type: Number
    }
  },
  data() {
    return {
      isOpen: false,
      selectedOptionLocal: this.selectedOption,
      loadingMessage: '&nbsp;',
      setIntervalInstance: null
    }
  },
  watch: {
    selectedOption: function () {

      if (
          Object.keys(this.selectedOptionLocal).length === 0 ||
          Object.keys(this.selectedOption).length === 0
      ) {

        this.selectedOptionLocal = this.selectedOption

        clearInterval(this.setIntervalInstance)

        this.setIntervalInstance = null

        return
      }

      this.selectedOptionLocal = this.selectedOption

      let data = {
        method: 'POST',
        body: {
          id: this.dataId,
          [this.updateParamName]: this.selectedOptionLocal.id
        }
      }

      useCustomFetch(this.url, data)
    }
  },
  methods: {
    async onOptionClick(option) {

      if (this.selectedOption.id === option.id) {
        this.isOpen = false
        return
      }

      this.$emit('change', option);
      this.isOpen = false
    },
    onBlur() {
      this.isOpen = false
    }
  },
  mounted() {
    this.setIntervalInstance = setInterval(() => {
      this.loadingMessage = this.loadingMessage === '&nbsp;...' || this.loadingMessage === '...' ? '.' : this.loadingMessage + '.'
    }, 100)
  }
}
</script>