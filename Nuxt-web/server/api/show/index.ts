import {IResData, IResPage} from "~/global";
import {getQuery} from "h3";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
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
    $fetch<IResData<{name: string; id: number}[]>>(runtimeConfig.baseUrl + '/basic/genre/all', {
      query: {
        columnValue: query.columnValue
      }
    }),
    $fetch<IResData<{name: string; id: number}[]>>(runtimeConfig.baseUrl + '/basic/country/all'),
    $fetch<IResData<{name: string; id: number}[]>>(runtimeConfig.baseUrl + '/basic/language/all'),
    $fetch<IResPage<any[]>>(runtimeConfig.baseUrl + '/movie/list', {
      query: {
        columnValue: query.columnValue,
        genres: query.t,
        country: query.c,
        language: query.l,
        year: query.y,
        pageNum: query.page || 1,
        pageSize: 20
      }
    }),
    $fetch<IResPage<any[]>>(runtimeConfig.baseUrl + '/movie/list', {
      query: {
        columnValue: query.columnValue,
        pageNum: query.page || 1,
        pageSize: 20,
        orderBy: 'pv',
        date: [weekStartTime, currTime]
      }
    }),
    $fetch<IResPage<any[]>>(runtimeConfig.baseUrl + '/movie/list', {
      query: {
        columnValue: query.columnValue,
        pageNum: query.page || 1,
        pageSize: 20,
        orderBy: 'pv',
        date: [mouthStartTime, currTime]
      }
    }),
    $fetch(`${runtimeConfig.baseUrl}/column?value=${query.columnValue}`)
  ])

  const countryList = countryRes.data.map(value => ({ name: value.name, id: value.id }))
  const languageList = languageRes.data.map(value => ({ name: value.name, id: value.id }))

  return [
    genreList.data,
    countryList,
    languageList,
    movieRes.rows,
    movieRes.total,
    weekList.rows,
    monthList.rows,
    info
  ]
})
