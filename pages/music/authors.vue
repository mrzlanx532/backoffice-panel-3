<template>
  <Browser
      h1="Авторы музыкальных треков"
      url-prefix="music/authors"
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
  name: "MusicAuthors",
  mixins: [PageWithBrowserMixin],
  data() {
    return {
      requestProperties: [
        'id',
        'name_ru',
        'tracks_counter',
        'albums_counter',
        'created_at'
      ],
      columns: [
        {
          name: 'id',
          title: 'ID',
          classes: [
              '--min-width'
          ]
        },
        {
          name: 'name_ru',
          title: 'Имя',
          classes: [
            '--max-width-200'
          ]
        },
        {
          name: 'tracks_counter',
          title: 'Треки',
          classes: [
            '--max-width-200'
          ]
        },
        {
          name: 'albums_counter',
          title: 'Альбомы',
          classes: [
            '--max-width-200'
          ]
        },
        {
          name: 'created_at',
          title: 'Создан',
          classes: [
            '--min-width'
          ],
          preset: {
            name: 'timestampToFormatPreset',
          },
        },
      ],
    }
  },
}
</script>