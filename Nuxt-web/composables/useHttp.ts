import {SearchParams} from "ohmyfetch";

export const useGet = <T>(url: string, params?: SearchParams): Promise<T> => {
    const { baseUrl } = useRuntimeConfig()
    return $fetch(baseUrl + url, {
        method: 'get',
        params
    })
}

export const usePost = <T>(url: string, body?: Record<string, any>) => {
    const { baseUrl } = useRuntimeConfig()
    return $fetch(baseUrl + url, {
        method: 'post',
        body
    })
}
