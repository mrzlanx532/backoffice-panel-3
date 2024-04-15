import { defineNuxtPlugin, onNuxtReady } from '#app'

import DocumentScroll from "./../plugins-from-lib/scroll/document-scroll.no_ssr.js"
import './../plugins-from-lib/scroll/document-scroll.no_ssr.scss'

export default defineNuxtPlugin(() => {
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