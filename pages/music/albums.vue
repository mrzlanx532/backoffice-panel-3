<template>
  <Browser
      h1="Альбомы музыкальных треков"
      url-prefix="music/albums"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      @itemUpdated="onItemUpdated"
  />
</template>
<script>
import PageWithBrowserMixin from "@/mixins/pages/browser.js"

export default {
  name: "MusicAlbums",
  mixins: [PageWithBrowserMixin],
  data() {
    return {
      requestProperties: [
        'id',
        'name_ru',
        'author',
        'label',
        'ident',
        'tracks_counter',
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
          name: 'author',
          title: 'Автор',
          toFormat(item) {
            return item.author?.name_ru
          }
        },
        {
          name: 'label',
          title: 'Лейбл',
          toFormat(item) {
            return item.label?.name_ru
          }
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
          name: 'created_at',
          title: 'Дата создания',
          preset: {
            name: 'timestampToFormatPreset',
          }
        },
      ],
    }
  }
}
</script>