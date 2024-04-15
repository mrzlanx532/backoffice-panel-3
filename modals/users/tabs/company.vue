<template>
  <div class="grid --3x3">
    <FormInput label="Название компании" class="--full"/>
    <FormInput label="Направление работы компании" class="--full"/>
    <FormInput label="Должность" class="--full"/>
    <FormInput label="Сайт компании" class="--full"/>
    <FormInput label="Адрес" class="--full"/>
    <FormInput label="Индекс"/>
    <FormInput label="Страна"/>
    <FormInput label="Город"/>
  </div>
</template>
<script>
import FormInput from "@/components/Base/Form/Input";

export default {
  name: 'CompanyTab',
  components: {
    FormInput
  }
}
</script>