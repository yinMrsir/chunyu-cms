import { useFetch, UseFetchOptions } from "#app";

export const useHttp = async <T>(url: string, params?: UseFetchOptions<T>) => {
    const { data } = await useFetch('/api' + url, params)
    return data.value
}

export default useHttp
