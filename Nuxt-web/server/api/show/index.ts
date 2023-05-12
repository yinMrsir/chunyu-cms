import {IResData, IResPage} from "~/global";
import {getQuery} from "h3";
import dayjs from "dayjs";
import {useGet} from "~/composables/useHttp";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const currTime = dayjs().format('YYYY-MM-DD')
  const weekStartTime = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
  const mouthStartTime = dayjs().subtract(30, 'day').format('YYYY-MM-DD')

  const [
    genreList,
    countryRes,
    languageRes,
    movieRes,
    weekList,
    monthList,
    info
  ] = await Promise.all([
    useGet<IResData<{name: string; id: number}[]>>('/basic/genre/all', {
      query: {
        columnValue: query.columnValue
      }
    }),
    useGet<IResData<{name: string; id: number}[]>>('/basic/country/all'),
    useGet<IResData<{name: string; id: number}[]>>('/basic/language/all'),
    useGet<IResPage<any[]>>('/movie/list', {
      columnValue: query.columnValue,
      genres: query.t,
      country: query.c,
      language: query.l,
      year: query.y,
      pageNum: query.page || 1,
      pageSize: 30,
      orderBy: query.orderBy
    }),
    useGet<IResPage<any[]>>('/movie/list', {
      columnValue: query.columnValue,
      pageNum: query.page || 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [weekStartTime, currTime]
    }),
    useGet<IResPage<any[]>>('/movie/list', {
      columnValue: query.columnValue,
      pageNum: query.page || 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [mouthStartTime, currTime]
    }),
    useGet(`/column?value=${query.columnValue}`)
  ])

  const countryList = countryRes.data.map(value => ({ name: value.name, id: value.id }))
  const languageList = languageRes.data.map(value => ({ name: value.name, id: value.id }))
  return {
    genreList: genreList.data,
    countryList,
    languageList,
    movieList: movieRes.rows,
    total: movieRes.total,
    weekList: weekList.rows,
    monthList: monthList.rows,
    info
  }
})
