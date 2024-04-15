<template>
  <div id="app">
    <div class="container">
      <SideMenu/>
      <div class="page">
        <div class="page__container">
          <Nuxt/>
        </div>
      </div>
    </div>
    <Modal/>
  </div>
</template>
<script>

import SideMenu from "@/components/Base/SideMenu"

export default {
  name: 'LayoutDefault',
  components: {
    SideMenu,
  }
}
</script>
