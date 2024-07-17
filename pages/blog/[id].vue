<template>
  <Detail
      :h1="h1"
      :data-id="entityId"
      @itemUpdated="onItemUpdated"
      url-prefix="blog/posts"
  >
    <template v-slot:header>
      <div class="btn__group">
        <Button :classes="['--big --outline-primary']">Изменить</Button>
        <Button :classes="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template v-slot:content>
      <ClientOnly>
        <Transition name="fade" mode="out-in">
          <div class="section__group">
            <Section>
              <template v-slot:header>
                Краткое содержание
              </template>
              <template v-slot:content>
                {{ item.name }}
              </template>
            </Section>
            <Section>
              <template v-slot:header>
                Полное содержание
              </template>
              <template v-slot:content>
                <div v-html="item.content"/>
              </template>
            </Section>
            <FlexTable :config="detailOptions" :item="item"/>
          </div>
        </Transition>
      </ClientOnly>
    </template>
  </Detail>
</template>
<script>
import Section from "@/components/Base/Section"
import Detail from "@/components/Base/Detail"
import Button from "@/components/Base/Button"
import FlexTable from "@/components/Base/FlexTable";
import {useRoute} from "#imports";

export default {
  setup() {
    const route = useRoute()

    const entityId = route.params.id

    return {
      entityId
    }
  },
  name: 'BlogDetail',
  components: {
    Section,
    Detail,
    Button,
    FlexTable
  },
  data() {
    return {
      item: {},
      detailOptions: [
        {
          name: 'category',
          title: 'Категория',
          columnClass: 6,
          toFormat(item) {
            return item?.category?.name_ru
          }
        },
        {
          name: 'date',
          title: 'Дата',
          columnClass: 6
        },
        {
          name: 'created_at',
          title: 'Добавлен',
          columnClass: 6,
          preset: {
            name: 'timestampToFormatPreset',
          }
        },
        {
          name: 'updated_at',
          title: 'Изменен',
          columnClass: 6,
          preset: {
            name: 'timestampToFormatPreset',
          }
        },
      ],
    }
  },
  computed: {
    h1: function () {
      return 'Пост ' + this.entityId
    }
  },
  methods: {
    onItemUpdated(item) {
      this.item = item
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>