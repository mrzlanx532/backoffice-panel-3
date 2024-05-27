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

const emit = defineEmits(['change'])

const onChange = (param, value) => emit('change', param, value)
</script>
<template>
  <div class="grid --2x2">
    <template v-for="el in data.formData">
      <component
          :is="el.component"
          :errors="errors && errors[el.name] ? errors[el.name] : null"
          :class="el.class"
          :name="el.name"
          :label="el.label"
          :componentData="el.componentData"
          @change="onChange"
      />
    </template>
  </div>
</template>