import {getQuery} from "h3";
import { useGet } from "~/composables/useHttp";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const [res, info]: any = await Promise.all([
        useGet( `/web/type/${query.columnValue}`),
        useGet(`/column?value=${query.columnValue}`)
    ])

    return {
        list: res.data,
        info
    }
})
