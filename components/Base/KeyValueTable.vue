<template>
  <table class="key-value-table" v-if="item">
    <tbody>
      <tr v-for="configItem in config">
        <th>{{ configItem.title }}</th>
        <td>
          <template v-if="configItem.hasOwnProperty('component')">
            <component :is="configItem.component" :item="item[configItem.name]"/>
          </template>
          <template v-else-if="configItem.hasOwnProperty('preset')">
            {{ handleByPreset(configItem, item)}}
          </template>
          <template v-else-if="configItem.hasOwnProperty('toFormat')">
            {{ configItem.toFormat(item[configItem.name]) }}
          </template>
          <template v-else>
            {{ item[configItem.name] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>

import browserPresetsMethodsMixin from "@/helpers/browser-presets-methods-mixin";

export default {
  name: 'KeyValueTable',
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
  },
  methods: {
    ...browserPresetsMethodsMixin,
    handleByPreset(configItem, item) {
      return this[configItem.preset.name](configItem, item)
    },
  }
}
</script>