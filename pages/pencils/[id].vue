<script setup lang="ts">
import { definePageMeta, useRoute } from '#imports'
import Button from '#backoffice-ui/components/Button.vue'
import Detail from '#backoffice-ui/components/Detail.vue'

import PencilForm from '~/modals/pencils/PencilForm.vue'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()

const sections = ref([
  {
    title: 'Общее',
    rows: [
      {
        name: 'id',
        title: 'ID'
      },
      {
        name: 'example_date',
        title: 'DATE'
      },
      {
        name: 'example_datetime',
        title: 'DATETIME'
      },
      {
        name: 'example_editor',
        title: 'EDITOR'
      },
      {
        name: 'example_input',
        title: 'INPUT'
      },
      {
        name: 'example_input_file',
        title: 'INPUT_FILE'
      },
      {
        name: 'example_select',
        title: 'SELECT'
      },
      {
        name: 'example_select_wrap',
        title: 'SELECT_WRAP'
      },
      {
        name: 'example_switcher',
        title: 'SWITCHER'
      },
      {
        name: 'example_textarea',
        title: 'TEXTAREA'
      }
    ]
  },
  {
    title: 'Дополнительное',
    rows: [
      {
        name: 'id',
        title: 'ID'
      },
      {
        name: 'example_date',
        title: 'DATE'
      },
      {
        name: 'example_datetime',
        title: 'DATETIME'
      },
      {
        name: 'example_editor',
        title: 'EDITOR'
      },
      {
        name: 'example_input',
        title: 'INPUT'
      },
      {
        name: 'example_input_file',
        title: 'INPUT_FILE'
      },
      {
        name: 'example_select',
        title: 'SELECT'
      },
      {
        name: 'example_select_wrap',
        title: 'SELECT_WRAP'
      },
      {
        name: 'example_switcher',
        title: 'SWITCHER'
      },
      {
        name: 'example_textarea',
        title: 'TEXTAREA'
      }
    ]
  }
])

const {
  item,

  onClickEdit,
  onClickDelete,

  SSRLoadDetail,
} = usePage()

await SSRLoadDetail(item, 'pencils/detail', route.params.id)
</script>

<template>
  <Detail :entity-name="'Ручка'" :back-link="'/pencils'" :sections="sections" :item="item!">
    <template #actions>
      <div class="btn__group">
        <Button
            @click="onClickEdit({
              formURL: 'pencils/form',
              modalComponent: PencilForm,
              modalTitle: 'Редактирование ручки',
              notificationMessage: 'Ручка изменена',
            })"
            :class="['--small --outline-primary']"
        >
          Изменить
        </Button>
        <Button
            @click="onClickDelete({
              deleteURL: 'pencils/delete',
              notificationMessage: 'Ручка удалена'}
            )"
            :class="['--small --outline-danger']"
        >
          Удалить
        </Button>
      </div>
    </template>
  </Detail>
</template>
