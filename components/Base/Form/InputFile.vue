<script setup lang="ts">
import { nextTick, type Ref } from 'vue'
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
    required: false,
    type: [Object, String]
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
      if (value === null || value instanceof File) {
        return
      }

      tryToLoadImage(value.original)
    }
)

const { $notification } = useNuxtApp()

const emit = defineEmits(['update:modelValue'])

const files = ref([])

const imageEl: Ref<HTMLElement|null> = ref(null)
const isUnrecognisedFile: Ref<boolean|null> = ref(false)

const handleUploadedFiles = (uploadFiles: FileList) => {
  isUnrecognisedFile.value = false

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

      tryToLoadImage(blobLink)

      emit('update:modelValue', files.value[0])
    })
  })
}

const tryToLoadImage = (link: string) => {
  const img = new Image()
  img.onerror = () => {
    isUnrecognisedFile.value = true
  }
  img.onload = () => {
    imageEl.value.src = link
  }
  img.src = link
}

const onChange = (e: Event) => {
  handleUploadedFiles(e.target.files)
}

const onDrop = (e: Event) => {
  handleUploadedFiles(e.dataTransfer.files)
}

const onRemove = () => {
  files.value.splice(0, files.value.length)
  isUnrecognisedFile.value = false

  emit('update:modelValue', null)
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
    <label class="label">{{ label }}</label>
    <div class="input-file__container" :class="{'--empty': files.length === 0 && modelValue?.original === undefined, '--has-errors': errors && errors[0]}">
      <template v-if="files.length > 0 || modelValue?.original !== undefined">
        <div class="input-file__image-wrapper" v-if="files.length > 0 || modelValue?.original !== undefined" @click="onRemove">
          <template v-if="isUnrecognisedFile">
            <svg :class="{'--has-errors': errors && errors[0] }">
              <use :xlink:href="'/img/temp_sprite.svg#file'"/>
            </svg>
            <p class="input-file__image-label">Загруженный файл</p>
          </template>
          <img v-else ref="imageEl" src="#" alt="image">
          <div class="input-file__image-overlay"/>
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