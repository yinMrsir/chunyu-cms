import { useFetch, UseFetchOptions } from "#app";
import { merge } from 'lodash'

export const useServerRequest = <T= unknown>(url: string, opts?: UseFetchOptions<T, unknown>) => {
  const userInfo = useCookie<{ token: string }>('userInfo')
  const runtimeConfig = useRuntimeConfig()

  const defaultOptions: UseFetchOptions<unknown> = {
    baseURL: runtimeConfig.public.apiBase,
    onRequest({ options }) {
      options.headers = (options.headers || {}) as { [key: string]: string }
      if (userInfo.value?.token) {
        options.headers.Authorization = 'Bearer ' + userInfo.value.token
      }
    },
    onResponse({ response }) {
      if (+response._data.code !== 200) {
        process.client && ElMessage.error(response._data.msg)
      }
    },
    onResponseError({ response }) {
      process.client && ElMessage.error(response._data.data.msg)
    },
  }

  return useFetch<T>( url, merge(defaultOptions, opts) as any)
}
