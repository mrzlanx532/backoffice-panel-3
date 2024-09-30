<script setup lang="ts">
import SideMenu from '@/components/Base/SideMenu.vue'
</script>

<template>
  <div id="app">
    <div class="container">
      <SideMenu/>
      <div class="page">
        <div class="page__container">
          <slot/>
        </div>
      </div>
    </div>
    <Modal/>
    <Notification/>
  </div>
</template>