<script setup lang="ts">
import { definePageMeta } from '#imports'
import Button from '@/components/Base/Button.vue'
import Browser from '@/components/Base/Browser/Browser.vue';
import PencilForm from '~/modals/pencils/PencilForm.vue'

definePageMeta({
  middleware: ['auth']
})

const {
  browserEl,
  item,

  onClickCreate,
  onClickEdit,
  onClickDelete,
  onItemUpdated
} = usePage()

const columns = shallowRef([
  {
    name: 'id',
    title: 'ID'
  },
  {
    name: 'example_checkbox',
    title: 'Чекбокс',
  },
  {
    name: 'example_date',
    title: 'Date',
  },
  {
    name: 'example_datetime',
    title: 'Datetime',
  },
  {
    name: 'example_editor',
    title: 'Editor',
  },
  {
    name: 'example_input',
    title: 'Input',
  },
  {
    name: 'example_input_file',
    title: 'InputFile',
  },
  {
    name: 'example_select',
    title: 'Select',
  },
  {
    name: 'example_select_wrap',
    title: 'SelectWrap',
  },
  {
    name: 'example_select_switcher',
    title: 'Switcher',
  },
  {
    name: 'example_select_textarea',
    title: 'Textarea',
  },
])

</script>

<template>
  <Browser
      ref="browserEl"
      h1="Ручки"
      url-prefix="pencils/browse"
      detail-url-prefix="pencils/detail"

      detail-title-property="id"
      detail-subtitle-property="name"
      detail-page-url-prefix="blog"

      :columns="columns"

      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button
            @click="onClickCreate({
              formURL: 'pencils/form',
              modalComponent: PencilForm,
              modalTitle: 'Создание ручки',
              notificationMessage: 'Ручка добавлена',
            })"
            :class="['--small --primary']"
        >
          Добавить
        </Button>
      </div>
    </template>
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button
            @click="onClickEdit({
              formURL: 'pencils/form',
              modalComponent: PencilForm,
              modalTitle: 'Редактирование ручки',
              notificationMessage: 'Ручка изменена',
            })"
            :class="['--big --outline-primary']"
        >
          Изменить
        </Button>
        <Button
            @click="onClickDelete({
              deleteURL: 'pencils/delete',
              notificationMessage: 'Ручка удалена'}
            )"
            :class="['--big --outline-danger']"
        >
          Удалить
        </Button>
      </div>
    </template>
    <template #browserDetailContent>
      {{ item ? item.id : undefined }}
    </template>
  </Browser>
</template>