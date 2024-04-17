import type { UseFetchOptions } from "nuxt/app"
import { useFetch, useCookie } from "#imports"

export function useCustomFetch<T>(path: any, options: UseFetchOptions<T> = {}) {

  let headers: any = {}

  const authToken = useCookie('auth_token')

  if (authToken.value) {
    headers['Authorization'] = authToken
  }

  return useFetch(`http://backoffice-api.lsmlocal.ru/${path}`, {
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  })
}
