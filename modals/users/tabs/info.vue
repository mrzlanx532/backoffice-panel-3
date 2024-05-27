<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: false,
  }
})

const onChange = (param, value) => this.$emit('change', param, value)
</script>

<template>
  <div class="grid --2x2">
    <template v-for="el in data.formData">
      <component
          :is="el.component"
          :error-message="errors && errors[el.name] ? errors[el.name] : null"
          :class="el.class"
          :name="el.name"
          :label="el.label"
          @change="onChange"
      />
    </template>
  </div>
</template>