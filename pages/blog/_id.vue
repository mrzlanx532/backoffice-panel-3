<template>
  <Detail
      :h1="h1"
      fetchUrl="/blog/posts/detail"
      :data-id="this.entityId"
      @itemUpdated="onItemUpdated"
  >
    <template v-slot:header>
      <div class="btn__group">
        <Button :classes="['--big --outline-primary']">Изменить</Button>
        <Button :classes="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template v-slot:content>
      <transition name="fade">
        <Section v-if="Object.keys(item).length > 0">
          <template v-slot:header>
            Основное
          </template>
          <template v-slot:content>
            <FlexTable :item="item" :config="detailOptions"/>
          </template>
        </Section>
      </transition>
    </template>
  </Detail>
</template>
<script>
import Section from "@/components/Base/Section"
import Detail from "@/components/Base/Detail"
import Button from "@/components/Base/Button"
import FlexTable from "@/components/Base/FlexTable";

export default {
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
          name: 'id',
          title: 'ID',
          columnClass: 6
        },
        {
          name: 'name',
          title: 'Заголовок',
          columnClass: 6
        },
        {
          name: 'category',
          title: 'Рубрика',
          columnClass: 6,
          toFormat(item) {
            return item?.category?.name_ru
          }
        },
        {
          name: 'locale',
          title: 'Локаль',
          columnClass: 6,
          toFormat(item) {
            return item?.locale?.title
          }
        },
        {
          name: 'date',
          title: 'Дата',
          columnClass: 6
        },
        {
          name: 'created_at',
          title: 'Дата создания',
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
  asyncData({params}) {
    return {
      entityId: params.id
    }
  },
  methods: {
    onItemUpdated(item) {
      this.item = item
    }
  }
}
</script>