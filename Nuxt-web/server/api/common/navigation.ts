import {IResData} from "~/global";

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const res = await $fetch<IResData<any[]>>(runtimeConfig.baseUrl + '/column/all')
    return res.data
})
