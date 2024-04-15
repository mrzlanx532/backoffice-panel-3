<template>
  <th :class="column.hasOwnProperty('classes') ? column.classes.reduce((concatString, className) => {return `${concatString} ${className}`}) : null">
    <div class="container">
      <div class="title">{{ column.title }}</div>
      <div
          class="svg-container"
          v-if="sorts.hasOwnProperty(column.name)"
          @click="onClick(column.name)"
          :class="[
            {'svg-container_desc': sorts[column.name] === 'desc'},
            {'svg-container_asc': sorts[column.name] === 'asc'},
          ]"
      >
        <svg width="14px" height="14px">
          <use xlink:href="img/sprite.svg#order"/>
        </svg>
      </div>
    </div>
  </th>
</template>
<script>
export default {
  name: 'BrowserSort',
  props: [
    'column',
    'sorts'
  ],
  nextValueMap: {
    null: 'desc',
    desc: 'asc',
    asc: null
  },
  data() {
    return {
      nextValueMap: {
        null: 'desc',
        desc: 'asc',
        asc: null
      }
    }
  },
  methods: {
    onClick(name) {
      this.$emit('sortChanged', name, this.nextValue(this.sorts[name]))
    },
    nextValue(value) {
      return this.$options.nextValueMap[value]
    }
  }
}
</script>