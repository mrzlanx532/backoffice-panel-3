<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: false,
  },
  value: {
    required: false
  },
  formData: {
    type: Object,
    required: true,
  }
})
</script>
<template>
  <div class="grid">
    <template v-for="el in data.formData">
      <component
          :is="el.component"
          :errors="errors && errors[el.name] ? errors[el.name] : null"
          :class="el.class"
          :name="el.name"
          :label="el.label"
          :componentData="el.componentData"
          v-model="props.formData[el.name]"
      />
    </template>
  </div>
</template>