<template>
  <Browser
      h1="Музыкальные лейблы"
      url-prefix="music/labels"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name_ru"
      @itemUpdated="onItemUpdated"
  />
</template>
<script>

import Browser from "@/components/Base/Browser/Browser";

export default {
  middleware: 'auth',
  components: {
    Browser
  },
  data() {
    return {
      id: null,
      item: null,
      requestProperties: [
        'id',
        'name_ru',
        'ident',
        'tracks_counter',
        'albums_counter',
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
          name: 'albums_counter',
          title: 'Альбомы',
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
  },
  methods: {
    onItemUpdated(item) {
      this.item = item
    }
  }
}
</script>