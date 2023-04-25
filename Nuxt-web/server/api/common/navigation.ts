import {useGet} from "~/composables/useHttp";
import {IResData} from "~/global";

export default defineEventHandler(async () => {
    const { data } = await useGet<IResData<any>>('/column/all', { status: 0 })
    return data
})
