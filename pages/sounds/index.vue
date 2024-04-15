<template>
  <Browser
      h1="Каталог шумовых треков"
      url-prefix="sound/tracks"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="description_ru"
      detail-page-url-prefix="sounds"
      @itemUpdated="onItemUpdated"
  />
</template>
<script>
import PageWithBrowserMixin from "@/mixins/pages/browser.js"
import { prepareDuration } from "@/helpers/functions-for-table-columns";

export default {
  name: 'SoundsPage',
  middleware: 'auth',
  mixins: [PageWithBrowserMixin],
  data() {
    return {
      requestProperties: [
        'id',
        'description_ru',
        'library',
        'variation',
        'author',
        'downloads_counter',
        'created_at'
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
          name: 'library',
          title: 'Библиотека',
          toFormat(item) {
            return item.library?.name_ru
          }
        },
        {
          name: 'variation',
          title: 'Длительность',
          toFormat(item) {
            return prepareDuration(item.variation?.duration)
          }
        },
        {
          name: 'author',
          title: 'Автор',
          toFormat(item) {
            return item.author?.name_ru
          }
        },
        {
          name: 'downloads_counter',
          title: 'Кол-во скачиваний',
        },
        {
          name: 'created_at',
          title: 'Загружен',
          preset: {
            name: 'timestampToFormatPreset',
          }
        },
      ],
    }
  },
}
</script>