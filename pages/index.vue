<script setup lang="ts">
import { definePageMeta } from '#imports'

import Page from '@/components/Base/Page.vue'
import Button from '@/components/Base/Button.vue'
import StateButton from '@/components/Base/StateButton.vue'
import BaseLink from '@/components/Base/BaseLink.vue'
import Badge from '@/components/Base/Badge.vue'
import type { Ref } from 'vue'
import ButtonDropdown from '~/components/Base/ButtonDropdown.vue'

definePageMeta({
  middleware: ['auth']
})

interface IStateButtonOption {
  id: string,
  title: string,
  class: string
}

const style = ref('margin: 15px 0;')
const selectedOption: Ref<IStateButtonOption> = ref({
  id: 'PUBLISHED',
  title: 'Опубликован',
  class: '--success'
})
const stateButtonOptions = ref([
  {
    id: 'PUBLISHED',
    title: 'Опубликован',
    class: '--success'
  },
  {
    id: 'DRAFT',
    title: 'Черновик',
    class: '--default'
  },
  {
    id: 'DISABLED',
    title: 'Отключен',
    class: '--danger'
  }
])

const btnClassesOutline = ref([
  '--outline-default',
  '--outline-primary',
  '--outline-success',
  '--outline-danger',
  '--outline-warning',
])

const btnClassesOutlineContrast = ref([
  '--outline-contrast-default',
  '--outline-contrast-primary',
  '--outline-contrast-success',
  '--outline-contrast-danger',
  '--outline-contrast-warning',
])

const btnClasses = ref([
  '--special',
  '--default',
  '--primary',
  '--success',
  '--danger',
  '--warning',
])

const onChangeStateButton = (_selectedOption: IStateButtonOption) => {
  selectedOption.value = _selectedOption
}
</script>

<template>
  <p style="margin-top: 20px;">Для начала работы используйте меню слева</p>
  <!--  <Page h1="Главная" style="background: white; border-radius: 5px;">
      <p style="margin-top: 20px;">Для начала работы используйте меню слева</p>

      <div style="height: 200px; padding: 20px;" v-scrollable class="v-scrollable">
        <div style="height: 400px;  background: aquamarine;">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate excepturi facere fuga harum, ipsum, laudantium non quia quisquam rem repellat soluta. Aliquid consequuntur eveniet harum nisi non, saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis, cupiditate
        </div>
      </div>
      <div :style="style">State-кнопка</div>
      <div>
        <StateButton
            :data-id="24600"
            :options="stateButtonOptions"
            :selectedOption="selectedOption"
            url="music/tracks/state-update"
            @change="onChangeStateButton"
        />
      </div>

      <ButtonDropdown :items="[{title: 'Скачать', class: '&#45;&#45;success'}, {title: 'Изменить', class: '&#45;&#45;primary'}, {title: 'Удалить', class: '&#45;&#45;danger'}]"/>

      <div :style="style">Badge</div>
      <template v-for="(btnClass, index) in btnClasses">
        <Badge title="Example Text" :class="btnClass"/>
      </template>

      <div :style="style">Shadow-rounded</div>
      <div>
        <template v-for="(btnClass, index) in btnClasses">
          <Button v-if="btnClass !== '&#45;&#45;special'" :class="['&#45;&#45;rounded &#45;&#45;shadow ' + btnClass]" :key="index">Отправить</Button>
        </template>
      </div>

      <div :style="style">Shadow</div>
      <div>
        <template v-for="(btnClass, index) in btnClasses">
          <Button v-if="btnClass !== '&#45;&#45;special'" :class="['&#45;&#45;shadow ' + btnClass]" :key="index">Отправить</Button>
        </template>
      </div>

      <div :style="style">Rounded</div>
      <div>
        <template v-for="(btnClass, index) in btnClasses">
          <Button  v-if="btnClass !== '&#45;&#45;special'" :class="['&#45;&#45;rounded ' + btnClass]" :key="index">Отправить</Button>
        </template>
      </div>

      <div :style="style">Большие кнопки</div>
      <div class="btn__group">
        <Button v-for="(btnClass, index) in btnClasses" :class="['&#45;&#45;big ' + btnClass]" :key="index">Отправить</Button>
      </div>
      <div :style="style">Средние кнопки</div>
      <div class="btn__group">
        <Button v-for="(btnClass, index) in btnClasses" :class="[btnClass]" :key="index">Отправить</Button>
      </div>
      <div :style="style">Маленькие кнопки</div>
      <div class="btn__group">
        <Button v-for="(btnClass, index) in btnClasses" :class="['&#45;&#45;small ' + btnClass]" :key="index">Отправить</Button>
      </div>

      <div :style="style">Большие кнопки (outline)</div>
      <div class="btn__group">
        <Button v-for="(btnClass, index) in btnClassesOutline" :class="['&#45;&#45;big ' + btnClass]" :key="index">Отправить</Button>
      </div>
      <div :style="style">Средние кнопки (outline)</div>
      <div class="btn__group">
        <Button v-for="(btnClass, index) in btnClassesOutline" :class="[btnClass]" :key="index">Отправить</Button>
      </div>
      <div :style="style">Маленькие кнопки (outline)</div>
      <div class="btn__group">
        <Button v-for="(btnClass, index) in btnClassesOutline" :class="['&#45;&#45;small ' + btnClass]" :key="index">Отправить</Button>
      </div>

      <div :style="style">Кнопки (outline-contrast)</div>
      <div class="btn__group">
        <Button v-for="(btnClass, index) in btnClassesOutlineContrast" :class="[btnClass]" :key="index">Отправить</Button>
      </div>

      <div :style="style">Кнопка &#45;&#45;full-size</div>
      <div :style="style">
        <Button :class="['&#45;&#45;full-width &#45;&#45;success']">Отправить</Button>
      </div>

      <div :style="style">Ссылки</div>
      <div style="display: flex;">
        <BaseLink
            to="/"
            v-for="(btnClass, index) in btnClasses"
            :class="btnClass"
            :key="index"
            :style="{'margin': index === 0 ? '0' : '0 10px'}"
        >Перейти</BaseLink>
      </div>
  </Page>-->
</template>