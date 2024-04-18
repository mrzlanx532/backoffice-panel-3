<template>
  <Detail
      :h1="h1"
      fetchUrl="music/tracks/detail"
      :data-id="entityId"
      @itemUpdated="onItemUpdated"
  >
    <template #header>
      <div class="btn__group">
        <Button :classes="['--big --outline-primary']">Изменить</Button>
        <Button :classes="['--big --outline-danger']">Удалить</Button>
        <StateButton
            class="ml_10"
            :data-id="item.id"
            :options="stateOptions"
            :selectedOption="selectedState"
            url="/music/tracks/state-update"
            @change="onChangeStateButton"
        />
      </div>
    </template>
    <template #content>
      <ClientOnly>
        <Transition name="fade">
          <Section v-if="Object.keys(item).length > 0">
            <template v-slot:header>
              <Tabs :tabs="tabs"/>
            </template>
            <template v-slot:content>
              <component :is="{...selectedTabMap.content}" :item="item"/>
            </template>
          </Section>
        </Transition>
      </ClientOnly>
    </template>
  </Detail>
</template>
<script>
import Section from "@/components/Base/Section"
import Detail from "@/components/Base/Detail"
import Button from "@/components/Base/Button"
import { detailConfig } from "@/parts/reports"
import Spinner from "@/components/Base/Spinner";
import MainTab from "@/pages/music/ignore/tabs/main"
import Tabs from "@/components/Base/Tabs";
import StateButton from "@/components/Base/StateButton";
import { useRoute } from '#imports'

export default {
  setup() {
    const route = useRoute()

    const entityId = route.params.id

    return {
      entityId
    }
  },
  name: 'UserDetail',
  components: {
    Section,
    Detail,
    Button,
    Spinner,
    MainTab,
    Tabs,
    StateButton
  },
  computed: {
    h1: function () {
      return 'Трек #' + this.entityId
    },
    selectedTabMap: function () {
      return this.tabs[this.selectedTab]
    }
  },
  asyncData({params}) {
    return {
      entityId: params.id
    }
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
      detailConfig,
      selectedTab: 0,
      item: {},
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
    }
  },
  methods: {
    onItemUpdated(item) {
      this.item = item
    },
    onChangeTab(index) {
      this.selectedTab = index
    },
    onChangeStateButton(option) {
      this.selectedState = option
    }
  }
}
</script>