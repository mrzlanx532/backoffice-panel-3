<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue'])

/* @ts-ignore */
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { i18nChangeLanguage } from '@wangeditor/editor'

i18nChangeLanguage('ru')

const editorRef = shallowRef()

const valueHtml = ref('<p>hello</p>')

onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>Ajax async set HTML.</p>'
  }, 1500)
})

const toolbarKeys = [
  'headerSelect',
  {
    key: 'group-more-style',
    title: 'Стиль',
    menuKeys: [
      'bold',
      'italic',
      'through',
      'underline',
      'code',
      'clearStyle'
    ]
  },
  '|',
  {
    key: 'group-more-alignment',
    title: 'Align',
    iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
    menuKeys: [
      'justifyLeft',
      'justifyRight',
      'justifyCenter',
      'justifyJustify',
    ]
  },
  'insertTable',
  {
    key: 'group-more-list',
    title: 'Список',
    menuKeys: [
      'numberedList',
      'bulletedList'
    ]
  },
  {
    key: 'group-more-more',
    title: 'Еще',
    menuKeys: [
      'insertImage',
      'insertVideo',
      'todo',
      'blockquote',
      'insertLink',
      'divider',
      'codeBlock',
    ]
  },
    'undo',
    'redo'
]

const toolbarConfig = {
  toolbarKeys
}
const editorConfig = {
  toolbarKeys
}

onBeforeUnmount(() => {
  const editor = editorRef.value

  if (editor == null) {
    return
  }

  editor.destroy()
})

// @ts-ignore
const handleCreated = (editor) => {
  editorRef.value = editor // record editor instance
}

// @ts-ignore
const handleChange = (editor) => {
  emit('update:modelValue', editor.getHtml())
}
</script>

<template>
  <div class="wangeditor-container">
    <Toolbar
        style="border-bottom: 1px solid #dbdbdb;"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="'default'"
    />
    <Editor
        style="height: 300px;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="'default'"
        @onCreated="handleCreated"
        @onChange="handleChange"
    />
  </div>
</template>

<style>
.wangeditor-container {
  border: 1px solid #dbdbdb;
  border-radius: 5px;

  >div:nth-child(1) {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .w-e-bar {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .w-e-text-container {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .w-e-text-container [data-slate-editor] {
    padding: 0 12px;
  }
}
</style>