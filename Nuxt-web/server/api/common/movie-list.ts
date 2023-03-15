import {getQuery} from "h3";
import {IResPage} from "~/global";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const query = getQuery(event)

  const res = await $fetch<IResPage<any[]>>(runtimeConfig.baseUrl + '/movie/list', {
    query: {
      keyword: query.keyword,
      genres: query.t,
      country: query.c,
      language: query.l,
      year: query.y,
      pageNum: query.page || 1,
      pageSize: query.size || 20
    }
  })
  return {
    rows: res.rows,
    total: res.total
  }
})
