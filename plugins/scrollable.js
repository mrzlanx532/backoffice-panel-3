import Vue from 'vue'

import '@/plugins-from-lib/scroll/common.scss'

import VScrollable from "@/plugins-from-lib/scroll/v-scrollable";
import '@/plugins-from-lib/scroll/v-scrollable.scss'

import DocumentScroll from "@/plugins-from-lib/scroll/document-scroll.no_ssr"
import '@/plugins-from-lib/scroll/document-scroll.no_ssr.scss'

Vue.use(VScrollable)

export default function(_, inject) {
    if (process.client) {
        window.onNuxtReady(() => {
            window.documentScroll = new DocumentScroll

            try {
                new ResizeObserver(() => {
                    window.documentScroll.updateScroll()
                }).observe(document.documentElement)
            } catch (e) {
                console.warn('Не удалось установить ResizeObserver для document')
            }
        })
    }
}