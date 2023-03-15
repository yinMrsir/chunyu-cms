import {getQuery} from "h3";
import {IResData, IResPage} from "~/global";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const query = getQuery(event)
  const currTime = dayjs().format('YYYY-MM-DD')
  const weekStartTime = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
  const mouthStartTime = dayjs().subtract(30, 'day').format('YYYY-MM-DD')

  $fetch(`${runtimeConfig.baseUrl}/movie/updatePv/${query.id}`)

  const [
    detailRes,
    roleRes,
    castRes,
    weekList,
    monthList
  ] = await Promise.all([
    $fetch<IResData<any>>(`${runtimeConfig.baseUrl}/movie/${query.id}`),
    $fetch<IResPage<any[]>>(`${runtimeConfig.baseUrl}/movie/role-actor/list?movieId=${query.id}&pageNum=1&pageSize=50`),
    $fetch<IResPage<any[]>>(`${runtimeConfig.baseUrl}/movie/cast/list?movieId=${query.id}&pageNum=1&pageSize=50`),
    $fetch<IResPage<any[]>>(runtimeConfig.baseUrl + '/movie/list', {
      query: {
        categoryId: query.id,
        pageNum: 1,
        pageSize: 20,
        orderBy: 'pv',
        date: [weekStartTime, currTime]
      }
    }),
    $fetch<IResPage<any[]>>(runtimeConfig.baseUrl + '/movie/list', {
      query: {
        categoryId: query.id,
        pageNum: 1,
        pageSize: 20,
        orderBy: 'pv',
        date: [mouthStartTime, currTime]
      }
    })
  ])

  return [
    detailRes.data,
    roleRes.rows,
    castRes.rows,
    weekList.rows,
    monthList.rows
  ]
})
