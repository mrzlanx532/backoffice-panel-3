<script setup lang="ts">
import { nextTick } from 'vue'
import { useNuxtApp } from '#imports'
import mimeTypeMapper from 'mime-db'

const props = defineProps({
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
    required: false,
    default() {
      return {
        maxSizeMB: null,
        allowedTypes: []
      }
    }
  },
})

watch(
    () => props.modelValue,
    (value) => {
      console.log(value)
    }
)

const { $notification } = useNuxtApp()

const emit = defineEmits(['update:modelValue'])

const files = ref([])

const singleImage = ref(null)
const unrecognisedFileSprite = ref('')

const handleUploadedFiles = (uploadFiles: FileList) => {
  unrecognisedFileSprite.value = ''

  Array.from(uploadFiles).map((file) => {

    const fileExtension = mimeTypeMapper[file.type]['extensions'] ?
        mimeTypeMapper[file.type]['extensions'][0] :
        file.name.split('.').pop()

    if (!props.componentData.allowedTypes.includes(fileExtension)) {
      $notification.push({type: 'danger', message: `Файл имеет неверный формат`})

      return
    }

    if (props.componentData.maxSizeMB < (file.size / (1024 ** 2))) {
      $notification.push({type: 'danger', message: `Размер файла превышает ${props.componentData.maxSizeMB?.toString()}MB`, autoRemoving: false})

      return
    }

    files.value.push(file)

    nextTick(() => {

      const blobLink = URL.createObjectURL(file)
      const img = new Image()
      img.onerror = () => {
        unrecognisedFileSprite.value = 'file'
      }
      img.onload = () => {
        singleImage.value.src = blobLink
      }
      img.src = blobLink

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
  unrecognisedFileSprite.value = ''
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
    <div class="input-file__container" :class="{'--empty': files.length === 0, '--has-errors': errors && errors[0]}">
      <template v-if="files.length > 0">
        <div class="input-file__image-wrapper" v-if="files.length > 0" @click="onRemove">
          <img v-if="unrecognisedFileSprite === ''" ref="singleImage" src="#" alt="image">
          <template v-else>
            <svg :class="{'--has-errors': errors && errors[0] }">
              <use :xlink:href="'/img/temp_sprite.svg#' + unrecognisedFileSprite"/>
            </svg>
            <p class="input-file__image-label">Загруженный файл</p>
          </template>
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
                <code v-for="(allowedType, index) in componentData.allowedTypes">{{ allowedType }}{{ index !== componentData.allowedTypes.length - 1 ? ',' : ''}}</code>
              </template>
              <template v-else>
                <span>все</span>
              </template>
            </p>
            <p class="input-file__label input-file__label_max-size mt_10">Максимальный размер</p>
            <p class="input-file__label input-file__label_max-size"><span>{{ componentData?.maxSizeMB ? componentData.maxSizeMB + 'MB' : 'не ограничен' }}</span></p>
          </div>
          <div class="input-file__btn-group">
              <button class="btn --special --small" @click="onClick">Обновить файл</button>
              <button class="btn --outline-contrast-danger --small" @click="onRemove">Убрать</button>
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
            <code v-for="(allowedType, index) in componentData.allowedTypes">{{ allowedType }}{{ index !== componentData.allowedTypes.length - 1 ? ',' : ''}}</code>
          </template>
          <template v-else>
            <span>все</span>
          </template>
        </p>
        <p class="input-file__label input-file__label_max-size">Максимальный размер: <span>{{ componentData?.maxSizeMB ? componentData.maxSizeMB + 'MB' : 'не ограничен' }}</span></p>
      </div>
    </div>
    <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
  </div>
</template>