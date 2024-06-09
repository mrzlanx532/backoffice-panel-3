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
    type: [Number, String, Array, File]
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

const emit = defineEmits(['update:modelValue'])

const files = ref([])

const singleImage = ref(null)

const handleUploadedFiles = (uploadFiles: FileList) => {
  Array.from(uploadFiles).map((file) => {

    files.value.push(file)

    nextTick(() => {
      singleImage.value.src = URL.createObjectURL(file)

      emit('update:modelValue', files.value[0])
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
    <div class="input-file__container">
      <template v-if="files.length > 0">
        <div class="input-file__image-wrapper" v-if="files.length > 0" @click="onRemove">
          <img ref="singleImage" src="#" alt="image">
          <div class="input-file__image-overlay"></div>
          <div class="input-file__cross-wrapper">
            <svg>
              <use xlink:href="/img/sprite.svg#trash"/>
            </svg>
          </div>
        </div>
        <div class="input-file__image-actions">
          <div>
            <p class="input-file__label input-file__label_allow-formats">
              <p>Разрешенные форматы:</p>
              <template v-if="componentData?.allowedTypes">
                <code v-for="(allowedType, index) in componentData.allowedTypes">{{ allowedType }}{{ index !== allowedTypes.length - 1 ? ',' : ''}}</code>
              </template>
              <template v-else>
                <span>все</span>
              </template>
            </p>
            <p class="input-file__label input-file__label_max-size mt_10">Максимальный размер</p>
            <p class="input-file__label input-file__label_max-size"><span>{{ componentData?.maxSizeLabel ? componentData.maxSizeLabel : 'не ограничен' }}</span></p>
            <div class="input-file__btn-wrapper">
              <button class="btn --special --small" @click="onClick">Обновить изображение</button>
            </div>
            <div class="input-file__btn-wrapper">
              <button class="btn --outline-contrast-danger --small" @click="onRemove">Убрать</button>
            </div>
          </div>
        </div>
      </template>
      <div class="input-file__input"
           @keyup.enter="onClick"
           tabindex="0"
           v-else
           @click="onClick"
           @drop.prevent="onDrop"
           @dragover.prevent
      >
        <p class="input-file__label input-file__label_choose">Перетащите файл сюда</p>
        <p class="input-file__label input-file__label_or">или</p>
        <p class="input-file__label input-file__label_download">Выберите с устройства</p>
        <p class="input-file__label input-file__label_allow-formats">
          Разрешенные форматы:
          <template v-if="componentData?.allowedTypes">
            <code v-for="(allowedType, index) in componentData.allowedTypes">{{ allowedType }}{{ index !== allowedTypes.length - 1 ? ',' : ''}}</code>
          </template>
          <template v-else>
            <span>все</span>
          </template>
        </p>
        <p class="input-file__label input-file__label_max-size">Максимальный размер: <span>{{ componentData?.maxSizeLabel ? componentData.maxSizeLabel : 'не ограничен' }}</span></p>
      </div>
    </div>
  </div>
</template>