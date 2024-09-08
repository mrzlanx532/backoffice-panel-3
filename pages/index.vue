<template>
  <Page h1="Главная | UI KIT">
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
          :options="stateOptions"
          :selectedOption="selectedOption"
          url="music/tracks/state-update"
          @change="onChangeStateButton"
      />
    </div>

    <div :style="style">Badge</div>
    <template v-for="(btnClass, index) in btnClasses">
      <Badge title="Example Text" :class="btnClass"/>
    </template>

    <div :style="style">Shadow-rounded</div>
    <div>
      <template v-for="(btnClass, index) in btnClasses">
        <Button v-if="btnClass !== '--special'" :class="['--rounded --shadow ' + btnClass]" :key="index">Отправить</Button>
      </template>
    </div>

    <div :style="style">Shadow</div>
    <div>
      <template v-for="(btnClass, index) in btnClasses">
        <Button v-if="btnClass !== '--special'" :class="['--shadow ' + btnClass]" :key="index">Отправить</Button>
      </template>
    </div>

    <div :style="style">Rounded</div>
    <div>
      <template v-for="(btnClass, index) in btnClasses">
        <Button  v-if="btnClass !== '--special'" :class="['--rounded ' + btnClass]" :key="index">Отправить</Button>
      </template>
    </div>

    <div :style="style">Большие кнопки</div>
    <div class="btn__group">
      <Button v-for="(btnClass, index) in btnClasses" :class="['--big ' + btnClass]" :key="index">Отправить</Button>
    </div>
    <div :style="style">Средние кнопки</div>
    <div class="btn__group">
      <Button v-for="(btnClass, index) in btnClasses" :class="[btnClass]" :key="index">Отправить</Button>
    </div>
    <div :style="style">Маленькие кнопки</div>
    <div class="btn__group">
      <Button v-for="(btnClass, index) in btnClasses" :class="['--small ' + btnClass]" :key="index">Отправить</Button>
    </div>

    <div :style="style">Большие кнопки (outline)</div>
    <div class="btn__group">
      <Button v-for="(btnClass, index) in btnClassesOutline" :class="['--big ' + btnClass]" :key="index">Отправить</Button>
    </div>
    <div :style="style">Средние кнопки (outline)</div>
    <div class="btn__group">
      <Button v-for="(btnClass, index) in btnClassesOutline" :class="[btnClass]" :key="index">Отправить</Button>
    </div>
    <div :style="style">Маленькие кнопки (outline)</div>
    <div class="btn__group">
      <Button v-for="(btnClass, index) in btnClassesOutline" :class="['--small ' + btnClass]" :key="index">Отправить</Button>
    </div>

    <div :style="style">Кнопки (outline-contrast)</div>
    <div class="btn__group">
      <Button v-for="(btnClass, index) in btnClassesOutlineContrast" :class="[btnClass]" :key="index">Отправить</Button>
    </div>

    <div :style="style">Кнопка --full-size</div>
    <div :style="style">
      <Button :class="['--full-width --success']">Отправить</Button>
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
  </Page>
</template>
<script>

import Page from "@/components/Base/Page"
import Button from "@/components/Base/Button"
import StateButton from '@/components/Base/StateButton'
import BaseLink from '@/components/Base/BaseLink'
import Badge from '@/components/Base/Badge.vue'

export default {
  setup() {
    definePageMeta({
      middleware: ['auth']
    })
  },
  name: 'UsersPage',
  components: {
    Badge,
    Page,
    Button,
    StateButton,
    BaseLink
  },
  data() {
    return {
      style: 'margin: 15px 0;',
      selectedOption: {
        id: 'PUBLISHED',
        title: 'Опубликован',
        class: '--success'
      },
      stateOptions: [
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
      ],
      options: [
        {
          id: 2,
          title: 'Отправить',
          class: '--default'
        },
        {
          id: 3,
          title: 'Отправить',
          class: '--primary'
        },
        {
          id: 4,
          title: 'Отправить',
          class: '--success'
        },
        {
          id: 5,
          title: 'Отправить',
          class: '--danger'
        },
        {
          id: 6,
          title: 'Отправить',
          class: '--warning'
        },
      ],
      btnClassesOutline: [
        '--outline-default',
        '--outline-primary',
        '--outline-success',
        '--outline-danger',
        '--outline-warning',
      ],
      btnClassesOutlineContrast: [
        '--outline-contrast-default',
        '--outline-contrast-primary',
        '--outline-contrast-success',
        '--outline-contrast-danger',
        '--outline-contrast-warning',
      ],
      btnClasses: [
        '--special',
        '--default',
        '--primary',
        '--success',
        '--danger',
        '--warning',
      ],
    }
  },
  methods: {
    onChangeStateButton(selectedOption) {
      this.selectedOption = selectedOption
    }
  }
}
</script>