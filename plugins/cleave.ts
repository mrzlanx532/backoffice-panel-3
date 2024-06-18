import { defineNuxtPlugin } from '#app'
import Cleave from 'cleave.js'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("cleave", {
        mounted: (el, binding) => {
            el.cleave = new Cleave(el, binding.value || {})
        },
        updated: (el) => {
            const event = new Event('input', {bubbles: true});
            setTimeout(function () {
                el.value = el.cleave.properties.result
                el.dispatchEvent(event)
            }, 100);
        }
    })
})