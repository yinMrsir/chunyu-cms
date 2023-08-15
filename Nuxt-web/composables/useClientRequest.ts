type FetchType = typeof $fetch
type FetchOptions = Parameters<FetchType>[1]

export const useClientRequest = <T= unknown>(url: string, opts?: FetchOptions) => {
  const userInfo = useCookie<{ token: string }>('userInfo')
  const runtimeConfig = useRuntimeConfig()

  const defaultOptions: FetchOptions = {
    baseURL: runtimeConfig.public.apiBase,
    onRequest({ options }) {
      options.headers = (options.headers || {}) as { [key: string]: string }
      if (userInfo.value?.token) {
        options.headers.Authorization = 'Bearer ' + userInfo.value.token
      }
    },
    onResponse({ response }) {
      if (+response._data.code !== 200) {
        ElMessage.error(response._data.msg)
      }
    },
    onResponseError({ response }) {
      ElMessage.error(response._data.data.msg)
    },
  }

  return $fetch<T>( url, {...defaultOptions, ...opts})
}
