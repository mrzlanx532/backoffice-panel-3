<template>
  <Browser
      h1="Авторы шумовых треков"
      url-prefix="sound/authors"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      detail-page-url-prefix="sounds/authors"
      @itemUpdated="onItemUpdated"
  />
</template>
<script>
import PageWithBrowserMixin from "@/mixins/pages/browser.js"

export default {
  name: "SoundsAuthorsPage",
  mixins: [PageWithBrowserMixin],
  data() {
    return {
      requestProperties: [
        'id',
        'name_ru',
        'ident',
        'tracks_counter',
        'libraries_counter',
        'created_at'
      ],
      columns: [
        {
          name: 'id',
          title: 'ID'
        },
        {
          name: 'name_ru',
          title: 'Имя'
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
          name: 'libraries_counter',
          title: 'Библиотеки',
        },
        {
          name: 'created_at',
          title: 'Создан',
          preset: {
            name: 'timestampToFormatPreset'
          }
        },
      ],
    }
  }
}
</script>