import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
    const authToken = useCookie('auth_token')

    const $customFetch = $fetch.create({
        baseURL: 'http://backoffice-api.lsmlocal.ru/',
        onRequest({ request, options, error }) {
            if (authToken.value) {
                // Add Authorization header
                options.headers = options.headers || {}
                options.headers['Authorization'] = `Bearer ${authToken.value}`
            }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                return navigateTo('/login')
            }
        }
    })

    return {
        provide: {
            customFetch: $customFetch
        }
    }
})