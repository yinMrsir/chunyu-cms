import { useFetch, UseFetchOptions } from "#app";
import { isArray } from "~/utils/tool";

export const useServerRequest = <T>(url: string, opts?: UseFetchOptions<T, unknown>) => {
  const token = useCookie<string | undefined>('token')
  const runtimeConfig = useRuntimeConfig()

  const defaultOptions: UseFetchOptions<unknown> = {
    baseURL: runtimeConfig.public.apiBase,
    onRequest({ options }) {
      options.headers = (options.headers || {}) as { [key: string]: string }
      if (token.value) {
        options.headers.Authorization = 'Bearer ' + token.value
      }
    },
    onResponse({ response }) {
      if (+response.status === 200 && +response._data.code !== 200) {
        process.client && ElMessage.error(response._data.msg)
      }
    },
    onResponseError({ response }) {
      process.client && ElMessage.error(isArray(response._data.data.msg) ? response._data.data.msg[0] : response._data.data.msg)
    }
  }

  return useFetch<T>( url, {...defaultOptions, ...opts} as any)
}
