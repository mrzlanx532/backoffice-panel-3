<template>
  <Browser
      h1="Статьи блога"
      url-prefix="blog/posts"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name"
      detail-page-url-prefix="blog"
      @itemUpdated="onItemUpdated"
  >
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit" :classes="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickEdit" :classes="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template #browserDetailContent>
      <div class="section__group">
        <Section>
          <template v-slot:header>
            Основное
          </template>
          <template v-slot:content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur enim fugit id molestias necessitatibus obcaecati quidem repudiandae. Cumque cupiditate doloribus ex excepturi vel. Dolores eius nam quo rerum.
          </template>
        </Section>
        <Section>
          <template v-slot:header>
            Дополнительное
          </template>
          <template v-slot:content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur enim fugit id molestias necessitatibus obcaecati quidem repudiandae. Cumque cupiditate doloribus ex excepturi vel. Dolores eius nam quo rerum.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque culpa ea eius ipsa labore maxime molestiae perferendis perspiciatis quaerat quod saepe sequi, sint suscipit temporibus ut velit, voluptatibus! Consectetur?
          </template>
        </Section>
      </div>
    </template>
  </Browser>
</template>
<script>
import PageWithBrowserMixin from "@/mixins/pages/browser.js"
import SubscriptionRow from "@/components/CustomRows/users/SubscriptionRow";
import { getMethods } from "@/mixins/browser";
import Button from "@/components/Base/Button"
import Section from "@/components/Base/Section";
import {definePageMeta} from "#imports";

export default {
  setup() {
    definePageMeta({
      middleware: ['auth'],
    })
  },
  name: 'BlogPage',
  mixins: [PageWithBrowserMixin],
  components: {
    Button,
    SubscriptionRow,
    Section
  },
  data() {
    return {
      requestProperties: [
          'id',
          'date',
          'name',
          'category',
          'locale',
          'state',
          'created_at',
          'company_business_type',
          'job_title',
          'company_address',
          'company_index',
          'company_country',
          'company_city',
          'subscription_type'
      ],
      columns: [
        {
          name: 'id',
          title: 'ID'
        },
        {
          name: 'date',
          title: 'Дата',
        },
        {
          name: 'name',
          title: 'Заголовок',
        },
        {
          name: 'category',
          title: 'Рубрика',
          toFormat(item) {
            return item?.category?.name_ru
          }
        },
        {
          name: 'locale',
          title: 'Локаль',
          toFormat(item) {
            return item?.locale?.title
          }
        },
        {
          name: 'state',
          title: 'Статус',
          toFormat(item) {
            return item?.state?.title
          }
        },
        {
          name: 'created_at',
          title: 'Создан',
          preset: {
            name: 'timestampToFormatPreset'
          }
        },
      ],
    }
  },
  methods: {
    ...getMethods,
    onClickEdit() {
      console.log(123)
    },
  }
}
</script>