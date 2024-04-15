<template>
  <Browser
      h1="Плейлисты музыкальных треков"
      url-prefix="music/playlists"
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
    Browser,
  },
  data() {
    return {
      id: null,
      item: null,
      requestProperties: [
        'id',
        'name_ru',
        'tracks_counter'
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
          name: 'tracks_counter',
          title: 'Кол-во треков',
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