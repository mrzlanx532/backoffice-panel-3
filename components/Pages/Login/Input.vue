<template>
  <div class="login__input-container">
    <label :for="name">{{ localLabel }}</label>
    <input
        class="login__input"
        :type="type"
        :name="name"
        v-model="localValue"
        @change="onChange"
    >
    <div
        class="login__input-error"
        :class="{'login__input-error_hidden': errorMessage[name] === ''}"
    >
      {{ errorMessage[name] }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Input',
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    },
    label: {
      type: String
    },
    errorMessage: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      localValue: this.value,
      localLabel: this.label,
      localErrorMessage: this.errorMessage
    }
  },
  methods: {
    onChange(e) {
      this.$emit('change', e)
    }
  },
}
</script>