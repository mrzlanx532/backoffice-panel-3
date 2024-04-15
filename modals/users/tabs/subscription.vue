<template>
  <div class="grid --2x2">
    <FormInput label="Тип подписки"/>
    <FormInput label="Дата истечения"/>
    <FormInput label="Дата истечения" class="--full"/>
    <FormInput label="Отключить подписку на экс. треки" class="--full"/>
    <FormInput label="Лейблы" class="--full"/>
  </div>
</template>
<script>
import FormInput from "@/components/Base/Form/Input";

export default {
  name: 'SubscriptionTab',
  components: {
    FormInput
  }
}
</script>