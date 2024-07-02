<template>
  <div class="browser__filter">
    <label :for="filter.id" class="browser__filter-name">{{ filter.title }}</label>
    <div class="browser__filter-container">
      <div class="input__container-flex" v-if="filter.config.range">
        <div class="input__container input__container_range">
          <div class="input__label">
            От
          </div>
          <input
              v-model="doubleValueFirst"
              class="input input_range"
              type="text"
              @input="onInput('doubleValueFirst')"
              @keyup.enter="onKeyUpEnter('doubleValueFirst')"
              @blur="onBlur('doubleValueFirst')"
          >
          <div
              class="input__remove-button input__remove-button_range"
              @click="onClickRemoveButton('doubleValueFirst')"
              v-show="doubleValueFirst !== '' && doubleValueFirst !== null"
          >
            <svg>
              <use xlink:href="/img/temp_sprite.svg#min_cross"/>
            </svg>
          </div>
        </div>
        <div class="input__container input__container_range">
          <div class="input__label">
            До
          </div>
          <input
              v-model="doubleValueSecond"
              class="input"
              type="text"
              @input="onInput('doubleValueSecond')"
              @keyup.enter="onKeyUpEnter('doubleValueSecond')"
              @blur="onBlur('doubleValueSecond')"
          >
          <div
              class="input__remove-button input__remove-button_range"
              @click="onClickRemoveButton('doubleValueSecond')"
              v-show="doubleValueSecond !== '' && doubleValueSecond !== null"
          >
            <svg>
              <use xlink:href="/img/temp_sprite.svg#min_cross"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="input__container" v-else>
        <input
            v-model="singleValue"
            class="input"
            type="text"
            @input="onInput"
            @keyup.enter="onKeyUpEnter"
            @blur="onBlur"
        >
        <div
            class="input__remove-button"
            @click="onClickRemoveButton"
            v-show="singleValue !== '' && singleValue !== null"
        >
          <svg>
            <use xlink:href="/img/temp_sprite.svg#min_cross"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BrowseInputFilter',
  props: {
    filter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      singleValue: null,
      doubleValueFirst: null,
      doubleValueSecond: null,
    }
  },
  methods: {
    onBlur(param = undefined) {
      if (this.filter.config.range) {
        return
      }

      if (this.singleValue === null || this.singleValue === '') {
        return
      }

      this.emitSingleValue()
    },
    onInput(param = undefined) {
      if (this.filter.config.range) {

        if (this[param] === '') {
          this.emitDoubleValue()
        }

        return
      }

      if (this.singleValue === '') {
        this.emitSingleValue()
      }
    },
    onKeyUpEnter(param = undefined) {
      if (this.filter.config.range) {

        if (this[param] !== '' && this[param] !== null) {
          this.emitDoubleValue()

          return
        }
      }

      if (this.singleValue !== '' && this.singleValue !== null) {
        this.emitSingleValue()
      }
    },
    onClickRemoveButton(param = undefined) {
      if (this.filter.config.range) {
        this[param] = null
        this.emitDoubleValue()

        return
      }

      this.singleValue = null
      this.emitSingleValue()
    },
    emitSingleValue() {
      this.$emit('filterValueChanged', {'id': this.filter.id, 'value': this.singleValue})
    },
    emitDoubleValue() {
      this.$emit('filterValueChanged', {'id': this.filter.id, 'value': [this.doubleValueFirst, this.doubleValueSecond]})
    }
  }
}
</script>