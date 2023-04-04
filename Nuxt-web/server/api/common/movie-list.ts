import {getQuery} from "h3";
import {IResPage} from "~/global";
import {useGet} from "~/composables/useHttp";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const { rows, total } = await useGet<IResPage<any[]>>('/movie/list', {
    keyword: query.keyword,
    genres: query.t,
    country: query.c,
    language: query.l,
    year: query.y,
    pageNum: query.page || 1,
    pageSize: query.size || 20
  })
  return {
    rows,
    total
  }
})
