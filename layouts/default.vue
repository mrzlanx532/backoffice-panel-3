<template>
  <div id="app">
    <div class="container">
      <SideMenu/>
      <div class="page">
        <div class="page__container">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import SideMenu from "@/components/Base/SideMenu"

export default {
  middleware: ['sanctum:auth'],
  name: 'default',
  components: {
    SideMenu,
  }
}
</script>
