import {SearchParams} from "ohmyfetch";

const getDomain = (url: string) => {
    let domain: string[] = url.split("/");
    return domain[2] || ''
}

export const useGet = <T>(url: string, params?: SearchParams, headers?: any): Promise<T> => {
    const { baseUrl } = useRuntimeConfig()
    return $fetch(baseUrl + url, {
        method: 'get',
        params,
        headers: {
            ...headers,
            host: getDomain(baseUrl)
        }
    })
}

export const usePost = <T>(url: string, body?: Record<string, any>, headers?: any): Promise<T> => {
    const { baseUrl } = useRuntimeConfig()
    return $fetch(baseUrl + url, {
        method: 'post',
        body,
        headers: {
            ...headers,
            host: getDomain(baseUrl)
        }
    })
}

export const useDelete = <T>(url: string, query?: SearchParams, headers?: any): Promise<T> => {
    const { baseUrl } = useRuntimeConfig()
    return $fetch(baseUrl + url, {
        method: 'delete',
        query,
        headers: {
            ...headers,
            host: getDomain(baseUrl)
        }
    })
}
