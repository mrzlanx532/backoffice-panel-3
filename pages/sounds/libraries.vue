<template>
  <Browser
      h1="Библиотеки шумов"
      url-prefix="sound/libraries"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="sounds/libraries"
      @itemUpdated="onItemUpdated"
  />
</template>

<script>
import PageWithBrowserMixin from "@/mixins/pages/browser.js"

export default {
  mixins: [PageWithBrowserMixin],
  data() {
    return {
      requestProperties: [
        'id',
        'name_ru',
        'ident',
        'tracks_counter',
        'author',
        'created_at'
      ],
      columns: [
        {
          name: 'id',
          title: 'ID'
        },
        {
          name: 'name_ru',
          title: 'Название'
        },
        {
          name: 'ident',
          title: 'Идентификатор',
        },
        {
          name: 'tracks_counter',
          title: 'Треки',
        },
        {
          name: 'author',
          title: 'Автор',
          toFormat(item) {
            return item.author?.name_ru
          }
        },
        {
          name: 'created_at',
          title: 'Создан',
          preset: {
            name: 'timestampToFormatPreset',
          }
        },
      ],
    }
  }
}
</script>