<template>
  <div class="browser__search-string-container">
    <input
        name="search_string"
        type="text"
        class="browser__search-string"
        placeholder="Поиск"
        @keyup.enter="onSearch"
        @input="onInput"
        v-model="searchString"
    >
    <div class="browser__search-string-button" @click="onSearch">
      <svg width="32px" height="32px">
        <use xlink:href="/img/sprite.svg#search"/>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BrowserSearchString',
  data() {
    return {
      searchString: ''
    }
  },
  methods: {
    onInput() {
      if (this.searchString === '') {
        this.$emit('search', this.searchString)
      }
    },
    onSearch() {
      if (this.searchString === '') {
        return;
      }

      this.$emit('search', this.searchString)
    }
  }
}
</script>