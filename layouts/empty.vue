<template>
  <div id="app">
    <slot />
  </div>
</template>
<script>
export default {
  middleware: ['sanctum:guest'],
  name: "empty"
}
</script>