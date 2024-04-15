<template>
  <Browser
      h1="Менеджеры"
      url-prefix="managers"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name"
      @itemUpdated="onItemUpdated"
  />
</template>
<script>

import PageWithBrowserMixin from "@/mixins/pages/browser.js"

export default {
  name: 'CustomersPage',
  mixins: {
    PageWithBrowserMixin,
  },
  data() {
    return {
      requestProperties: [
          'id',
          'name',
          'email',
          'created_at'
      ],
      columns: [
        {
          name: 'id',
          title: 'ID',
        },
        {
          name: 'name',
          title: 'Имя'
        },
        {
          name: 'email',
          title: 'Email'
        },
        {
          name: 'created_at',
          title: 'Дата создания',
          preset: {
            name: 'timestampToFormatPreset',
          }
        },
      ]
    }
  }
}
</script>