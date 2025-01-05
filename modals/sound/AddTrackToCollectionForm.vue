<script setup lang="ts">
import Form from '#backoffice-ui/components/Form.vue'

const props = defineProps({
  data: {
    type: Object,
    required: false
  }
})

const emit = defineEmits([
  'modal:close',
  'modal:resolve'
])

const {
  $authFetch,
} = useNuxtApp()

const {
  initForm,

  select
} = useForm()

const {
  formData,
  formDataValues,
  errors,
} = initForm([
  select({
    name: 'id',
    label: 'Выберите коллекцию для добавления',
    class: '--full',
  })
])

const onClickSave = () => {

  formDataValues.track_ids = props.data!.selectedIds

  $authFetch('sound/collections/track-add-many', {
    method: 'POST',
    body: formDataValues
  })

  emit('modal:resolve')
}

onMounted(() => {
  formData[0].componentData!.options = props.data!.formResponse.map((playlist: any) => {
    return {
      id: playlist.id,
      title: playlist.name_ru,
    }
  })
})
</script>

<template>
  <Form
      :title="'Добавить в коллекцию'"
      @close="emit('modal:close')"
  >
    <template #content>
      <div class="grid --2x2">
        <component
            v-for="formDataItem in formData"
            :componentData="formDataItem?.componentData"
            :class="formDataItem.class"
            :label="formDataItem.label"
            :name="formDataItem.name"
            :is="formDataItem.component"
            v-model="formDataValues[formDataItem.name]"
            :errors="errors[formDataItem.name]"
        />
      </div>
    </template>
    <template #footer>
      <div class="btn__group">
        <button class="btn --primary --big" @click="onClickSave">Сохранить</button>
        <button class="btn --outline-primary --big" @click="emit('modal:close')">Отмена</button>
      </div>
    </template>
  </Form>
</template>
