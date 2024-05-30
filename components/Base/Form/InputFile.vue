<script setup lang="ts">
import { nextTick } from 'vue'

defineProps({
  label: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  modelValue: {
    type: [Number, String, Array]
  },
  errors: {
    type: Array,
    required: false,
    default: []
  },
  componentData: {
    type: Object,
    required: false
  },
  maxSizeMB: {
    type: Number,
    required: false,
  },
  maxSizeLabel: {
    required: false,
    type: String,
    default: 'не ограничен'
  },
  allowedTypes: {
    required: false,
    type: Array,
    default: ['jpg', 'jpeg', 'png']
  }
})

const files = ref([])

const singeImage = ref(null)

const handleUploadedFiles = (uploadFiles: FileList) => {
  Array.from(uploadFiles).map((file) => {

    files.value.push(file)

    nextTick(() => {
      singeImage.value.src = URL.createObjectURL(file)
    })
  })
}

const onChange = (e: Event) => {
  handleUploadedFiles(e.target.files)
}

const onDrop = (e: Event) => {
  handleUploadedFiles(e.dataTransfer.files)
}

const onRemove = () => {
  files.value.splice(0, files.value.length)
}

const onClick = () => {
  const inputFile = document.createElement('input')

  inputFile.addEventListener('change', onChange)

  inputFile.type = 'file'
  inputFile.click()
}
</script>

<template>
  <div>
    <label class="label">{{label}}</label>
    <div class="input-file__image-container" v-if="files.length > 0" @click="onRemove">
      <img ref="singeImage" src="#" alt="image">
      <div class="input-file__image-overlay"></div>
      <div class="input-file__cross-container">
        <svg>
          <use xlink:href="/img/sprite.svg#trash"/>
        </svg>
      </div>
    </div>
    <div class="input-file__container"
         @keyup.enter="onClick"
         tabindex="0"
         v-else
         @click="onClick"
         @drop.prevent="onDrop"
         @dragover.prevent
    >
      <div class="input-file__label input-file__label_choose">Перетащите файл сюда</div>
      <div class="input-file__label input-file__label_or">или</div>
      <div class="input-file__label input-file__label_download">Выберите с устройства</div>
      <div class="input-file__label input-file__label_allow-formats">
        Разрешенные форматы:
        <template v-if="componentData?.allowedTypes">
          <code v-for="(allowedType, index) in componentData.allowedTypes">{{ allowedType }}{{ index !== allowedTypes.length - 1 ? ',' : ''}}</code>
        </template>
        <template v-else>
          <span>все</span>
        </template>
      </div>
      <div class="input-file__label input-file__label_max-size">Максимальный размер: <span>{{ componentData?.maxSizeLabel ? componentData.maxSizeLabel : 'не ограничен' }}</span></div>
    </div>
    <input type="file" hidden>
  </div>
</template>