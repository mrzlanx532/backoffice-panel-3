<template>
  <Browser
      h1="Отчеты"
      url-prefix="reports"
      :columns="columns"
      :request-properties="requestProperties"
      detail-title-property="id"
      detail-subtitle-property="name"
      @itemUpdated="onItemUpdated"
  >
    <template #browserDetailHeader>
      <div class="btn__group">
        <Button @click="onClickEdit" :classes="['--big --outline-primary']">Изменить</Button>
        <Button @click="onClickEdit" :classes="['--big --outline-danger']">Удалить</Button>
      </div>
    </template>
    <template #browserDetailContent>
      <Section>
        <template #header>
          Основное
        </template>
        <template #content>
          <KeyValueTable :item="item" :config="detailConfig"/>
        </template>
      </Section>
    </template>
  </Browser>
</template>
<script>

import Page from "@/components/Base/Page";
import SubscriptionRow from "@/components/CustomRows/users/SubscriptionRow"
import BrowserDetail from "@/components/Base/Browser/BrowserDetail";
import Button from "@/components/Base/Button"
import Section from "@/components/Base/Section";
import KeyValueTable from "@/components/Base/KeyValueTable";
import { detailConfig } from "@/parts/reports"

import { getMethods } from "@/mixins/browser";

import PageWithBrowserMixin from "@/mixins/pages/browser.js"

export default {
  name: 'UsersPage',
  mixins: [PageWithBrowserMixin],
  components: {
    Page,
    KeyValueTable,
    Button,
    Section,
    BrowserDetail,
    SubscriptionRow,
  },
  data() {
    return {
      requestProperties: [
        'id',
        'created_at',
        'name',
        'content_counter',
        'media',
        'region',
      ],
      columns: [
        {
          name: 'id',
          title: 'ID'
        },
        {
          name: 'created_at',
          title: 'Дата создания',
          preset: {
            name: 'timestampToFormatPreset',
          }
        },
        {
          name: 'name',
          title: 'Название проекта',
        },
        {
          name: 'content_counter',
          title: 'Кол-во треков'
        },
        {
          name: 'media',
          title: 'Медиа'
        },
        {
          name: 'region',
          title: 'Территория',
        },
      ],
      detailConfig
    }
  },
  methods: {
    ...getMethods,
    onClickEdit() {
      console.log(123)
    }
  }
}
</script>