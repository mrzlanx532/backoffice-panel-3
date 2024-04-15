<template>
  <div>
    <label class="input__label">{{ label }}</label>
    <div class="input__container">
      <input class="input" type="text" autocomplete="none" v-model="localValue" @change="onChange">
    </div>  
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