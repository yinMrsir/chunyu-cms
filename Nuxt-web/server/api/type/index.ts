import {getQuery} from "h3";

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const query = getQuery(event)
    const [res, info]: any = await Promise.all([
        $fetch( `${runtimeConfig.baseUrl}/web/type/${query.columnValue}`),
        $fetch(`${runtimeConfig.baseUrl}/column?value=${query.columnValue}`)
    ])

    return {
        list: res.data,
        info
    }
})
