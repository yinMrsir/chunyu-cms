import {getQuery} from "h3";
import {IResData, IResPage} from "~/global";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const query = getQuery(event)
  const currTime = dayjs().format('YYYY-MM-DD')
  const weekStartTime = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
  const mouthStartTime = dayjs().subtract(30, 'day').format('YYYY-MM-DD')

  const [
    detailRes
  ] = await Promise.all([
    $fetch<IResData<any>>(`${runtimeConfig.baseUrl}/movie/videos/${query.id}`)
  ])

  const [
    likeRowsRes,
    weekList,
    monthList
  ] = await Promise.all([
    $fetch<IResPage<any[]>>(`${runtimeConfig.baseUrl}/movie/list`, {
      query: {
        genres: detailRes.data.movie.genres.split(',')[0],
        pageNum: 1,
        pageSize: 30,
      }
    }),
    $fetch<IResPage<any[]>>(runtimeConfig.baseUrl + '/movie/list', {
      query: {
        columnValue: detailRes.data.movie.columnValue,
        pageNum: 1,
        pageSize: 20,
        orderBy: 'pv',
        date: [weekStartTime, currTime]
      }
    }),
    $fetch<IResPage<any[]>>(runtimeConfig.baseUrl + '/movie/list', {
      query: {
        columnValue: detailRes.data.movie.columnValue,
        pageNum: 1,
        pageSize: 20,
        orderBy: 'pv',
        date: [mouthStartTime, currTime]
      }
    })
  ])

  return {
    detail: detailRes.data,
    likeRows: likeRowsRes.rows,
    weekList: weekList.rows,
    monthList: monthList.rows
  }
})
