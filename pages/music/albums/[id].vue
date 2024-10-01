<script setup lang="ts">
import Detail from '~/components/Base/Detail.vue'

const route = useRoute()
</script>

<template>
  <Detail
      url-prefix="music/albums"
      :h1="'Альбом #' + route.params.id"
  >
    <template #header>
      Что-то
    </template>

    <template #content>
      Что-то
    </template>
  </Detail>
</template>