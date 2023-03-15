import {getQuery} from "h3";
import {IResData} from "~/global";



export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const query = getQuery(event)
    const res: IResData<any[]> = await $fetch( `${runtimeConfig.baseUrl}/web/type/${query.columnValue}`)
    return res.data
})
