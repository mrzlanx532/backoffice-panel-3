<template>
  <div class="detail__flex-table flex-table" v-if="item">
    <div class="flex-table__item" v-for="configItem in config" :class="[
        {'--col-12': configItem.columnClass === 12},
        {'--col-6': configItem.columnClass === 6},
        {'--col-4': configItem.columnClass === 4},
        {'--col-3': configItem.columnClass === 3},
        {'--col-2': configItem.columnClass === 2},
    ]">
      <div class="flex-table__item-header">
        {{ configItem.title }}
      </div>
      <div class="flex-table__item-content">
        <template v-if="configItem.hasOwnProperty('component')">
          <component :is="configItem.component" :item="item[configItem.name]"/>
        </template>
        <template v-else-if="configItem.hasOwnProperty('preset')">
          {{ handleByPreset(configItem, item)}}
        </template>
        <template v-else-if="configItem.hasOwnProperty('toFormat')">
          {{ configItem.toFormat(item) }}
        </template>
        <template v-else>
          {{ item[configItem.name] !== null ? item[configItem.name] : emptySymbol }}
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import browserPresetsMethodsMixin from "@/helpers/browser-presets-methods-mixin"

export default {
  name: "FlexTable",
  props: {
    config: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      default() {
        return null;
      }
    },
    emptySymbol: {
      type: String,
      default: '–'
    }
  },
  methods: {
    ...browserPresetsMethodsMixin,
  }
}
</script>