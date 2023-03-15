import { useFetch } from "#app";

export const useHttp = async <T>(url: string, params?: any) => {
    const { data } = await useFetch<T>('/api' + url, params)
    return data.value
}

export default useHttp
