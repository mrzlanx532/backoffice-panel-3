<template>
  <div>
    <label class="input__label">{{ label }}</label>
    <div
        class="input__container"
        :class="{'input__container_error': errorMessage && errorMessage[0] }"
    >
      <input class="input" :name="name" type="text" autocomplete="none" v-model="localValue" @change="onChange">
    </div>
    <div class="input__error">{{ errorMessage && errorMessage[0] ? errorMessage[0] : null }}</div>
  </div>
</template>
<script>
export default {
  name: 'FormInput',
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    },
    value: {
      required: false,
      default: ''
    },
    errorMessage: {
      type: Array,
      required: false,
      default: null
    }
  },
  data() {
    return {
      localValue: this.value
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.name, this.localValue)
    }
  }
}
</script>