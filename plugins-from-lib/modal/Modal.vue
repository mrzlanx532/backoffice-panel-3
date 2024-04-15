<template>
  <div class="modal" v-if="modalContentComponentFilename">
    <div class="modal__overlay" @click="onOverlayClick"/>
    <div :class="['modal__container', modalContainerClassModifier]" @click.stop>
      <component
          :is="modalContentComponent"
          :data="modalContentComponentProps"
          @modal:close="onOverlayClick"
          @modal:resolve="onResolve"
          @modal:reject="onReject"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      modalContainerClassModifier: null,
      modalContentComponentFilename: null,
      modalContentComponent: null,
      modalContentComponentProps: {},
      isPreset: false
    }
  },
  watch: {
    modalContentComponentFilename: async function (name) {

      if (name === null) {

        this.modalContentComponent = null

        window.onscroll = function () {};
        return
      }

      try {
        const dynamicComponent = this.isPreset ? await import(`@/plugins-from-lib/modal/presets/${name}`) : await import(`@/modals/${name}`)

        this.modalContainerClassModifier = dynamicComponent.default?.parentClassModifier
        this.modalContentComponent = dynamicComponent.default

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        window.onscroll = function () {
          window.scrollTo(scrollLeft, scrollTop);
        };

      } catch (e) {
        console.error(`Не удалось найти модальное окно: "@/modals/${name}"`)
      }
    }
  },
  methods: {
    onOverlayClick() {
      this.modalContentComponentFilename = null
      this.$emit('modal:close')
    },
    onResolve(payload) {
      this.modalContentComponentFilename = null
      this.$emit('modal:close')

      this.resolve(payload)
    },
    onReject(payload) {
      this.modalContentComponentFilename = null
      this.$emit('modal:close')

      this.reject(payload)
    }
  }
}
</script>