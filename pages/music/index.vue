<template>
  <Browser
      h1="Каталог музыкальных треков"
      url-prefix="music/tracks"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name"
      detail-page-url-prefix="music"
      @itemUpdated="onItemUpdated"
  >
    <template #rightSide>
      <div class="btn__group">
        <Button @click="onClickAdd" :classes="['--small --success']">Добавить</Button>
      </div>
    </template>

    <template #browserDetailHeader>
      <div class="btn__group">
        <Button :classes="['--big --outline-primary']">Изменить</Button>
        <Button :classes="['--big --outline-danger']">Удалить</Button>
        <StateButton
            class="ml_10"
            :data-id="item.id"
            :options="stateOptions"
            :selected-option="selectedState"
            url="/music/tracks/state-update"
            @change="onChangeStateButton"
        />
      </div>
      <Tabs :tabs="tabs"/>
    </template>
    <template #browserDetailContent>
      <Section>
        <template #header>
          Основное
        </template>
        <template #content>
          Дополнительное
        </template>
      </Section>
    </template>
  </Browser>
</template>
<script>

import PageWithBrowserMixin from "@/mixins/pages/browser.js"
import { getMethods } from "@/mixins/browser";
import { prepareDuration } from "@/helpers/functions-for-table-columns";
import Section from "@/components/Base/Section";
import Button from "@/components/Base/Button";
import Tabs from "@/components/Base/Tabs";
import MainTab from "@/pages/music/ignore/tabs/main"
import StateButton from "@/components/Base/StateButton";

export default {
  name: "MusicTracks",
  mixins: [PageWithBrowserMixin],
  components: {
    Button,
    Section,
    Tabs,
    MainTab,
    StateButton
  },
  watch: {
    item: function () {
      if (Object.keys(this.item).length === 0) {
        return {}
      }

      const classesByState = {
        PUBLISHED: '--success',
        DRAFT: '--default',
        DISABLED: '--danger',
      }

      this.selectedState = {
        'id': this.item.state.id,
        'title': this.item.state.title,
        'class': classesByState[this.item.state.id]
      }
    }
  },
  data() {
    return {
      selectedState: {},
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
      requestProperties: [
        'id',
        'title_ru',
        'description_ru',
        'album',
        'label',
        'variation',
        'authors',
        'created_at',
        'downloads_counter'
      ],
      tabs: [
        {
          title: 'Инфо',
          content: MainTab
        },
        {
          title: 'Правообладатели',
          content: MainTab
        },
        {
          title: 'Вариации',
          content: MainTab
        },
        {
          title: 'Стемы',
          content: MainTab
        },
        {
          title: 'Лирика',
          content: MainTab
        },
        {
          title: 'Плейлисты',
          content: MainTab
        },
        {
          title: 'Еще раздел',
          content: MainTab
        },
        {
          title: 'И еще раздел',
          content: MainTab
        },
      ],
      columns: [
        {
          name: 'id',
          title: 'ID'
        },
        {
          name: 'title_ru',
          title: 'Название',
        },
        {
          name: 'album',
          title: 'Альбом',
          toFormat(item) {
            return item.album?.name_ru
          }
        },
        {
          name: 'label',
          title: 'Лейбл',
          toFormat(item) {
            return item.label?.name_ru
          }
        },
        {
          name: 'variation',
          title: 'Длительность',
          toFormat(item) {
            return prepareDuration(item.variation?.duration)
          }
        },
        {
          name: 'authors',
          title: 'Автор',
          toFormat(item) {
            return item.authors.reduce((acc, item) => {
              if (acc === null) {
                return item.name_ru
              }

              return `${acc}, ${item.name_ru}`
            }, null)
          }
        },
        {
          name: 'downloads_counter',
          title: 'Кол-во скач.',
        },
        {
          name: 'created_at',
          title: 'Загружен',
          preset: {
            name: 'timestampToFormatPreset'
          }
        },
      ],
    }
  },
  methods: {
    ...getMethods,
    onChangeStateButton(option) {
      this.selectedState = option
    },
    onClickAdd() {
      this.$modal().load('Test')
    }
  }
}
</script>