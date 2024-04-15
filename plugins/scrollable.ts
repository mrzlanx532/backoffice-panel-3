import { defineNuxtPlugin, onNuxtReady } from '#app'

import './../plugins-from-lib/scroll/common.scss'

import Scrollable from "./../plugins-from-lib/scroll/v-scrollable";
import './../plugins-from-lib/scroll/v-scrollable.scss'

import DocumentScroll from "./../plugins-from-lib/scroll/document-scroll.no_ssr.js"
import './../plugins-from-lib/scroll/document-scroll.no_ssr.scss'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('scrollable', {
        beforeMounted: function (el) {
            el.classList.add('v-scrollable')
        },
        mounted: function (el, binding) {
            new Scrollable(el, binding.value)
        }
    })
    onNuxtReady(async () => {
        window.documentScroll = new DocumentScroll

        try {
            new ResizeObserver(() => {
                window.documentScroll.updateScroll()
            }).observe(document.documentElement)
        } catch (e) {
            console.warn('Не удалось установить ResizeObserver для document')
        }
    })
})