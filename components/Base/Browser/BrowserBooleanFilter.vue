<script setup lang="ts">
  const emit = defineEmits(['filterValueChanged'])

  const props = defineProps({
    filter: {
      type: Object,
      required: true
    }
  })

  const checked = ref(null)

  const onClick = (value: boolean|null) => {
    checked.value = value

    emit('filterValueChanged', {id: props.filter.id, value})
  }
</script>

<template>
  <div class="browser__filter">
    <label :for="filter.id" class="browser__filter-name">{{ filter.title }}</label>
    <div class="browser__filter-container">
      <div class="boolean">
        <div class="boolean__item-container">
          <input type="radio" hidden="hidden" :value="null" v-model="checked">
          <div class="boolean__radio" :class="{'--checked': checked === null}" @click="onClick(null)">
            <div class="boolean__checker" v-if="checked === null"></div>
          </div>
          <label class="boolean__label">Не выбрано</label>
        </div>
        <div class="boolean__item-container">
          <input type="radio" hidden="hidden" :value="true" v-model="checked">
          <div class="boolean__radio" :class="{'--checked': checked === true}" @click="onClick(true)">
            <div class="boolean__checker" v-if="checked === true"></div>
          </div>
          <label class="boolean__label">Да</label>
        </div>
        <div class="boolean__item-container">
          <input type="radio" hidden="hidden" :value="false" v-model="checked">
          <div class="boolean__radio" :class="{'--checked': checked === false}" @click="onClick(false)">
            <div class="boolean__checker" v-if="checked === false"></div>
          </div>
          <label class="boolean__label">Нет</label>
        </div>
      </div>
    </div>
  </div>
</template>