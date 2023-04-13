import {SearchParams} from "ohmyfetch";

export const useGet = <T>(url: string, params?: SearchParams, headers?: any): Promise<T> => {
    const { baseUrl } = useRuntimeConfig()
    return $fetch(baseUrl + url, {
        method: 'get',
        params,
        headers
    })
}

export const usePost = <T>(url: string, body?: Record<string, any>, headers?: any): Promise<T> => {
    const { baseUrl } = useRuntimeConfig()
    return $fetch(baseUrl + url, {
        method: 'post',
        body,
        headers
    })
}
