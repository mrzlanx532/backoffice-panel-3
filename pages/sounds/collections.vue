<template>
  <Browser
      h1="Коллекции шумов"
      url-prefix="sound/collections"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="sounds/collections"
      @itemUpdated="onItemUpdated"
  />
</template>
<script>
import PageWithBrowserMixin from "@/mixins/pages/browser.js"

export default {
  middleware: 'auth',
  mixins: [PageWithBrowserMixin],
  data() {
    return {
      requestProperties: [
        'id',
        'description_ru',
        'tracks_counter',
      ],
      columns: [
        {
          name: 'id',
          title: 'ID'
        },
        {
          name: 'description_ru',
          title: 'Описание'
        },
        {
          name: 'tracks_counter',
          title: 'Кол-во треков',
        },
      ],
    }
  },
}
</script>