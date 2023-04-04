import {getQuery} from "h3";
import {IResData, IResPage} from "~/global";
import dayjs from "dayjs";
import {useGet} from "~/composables/useHttp";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const currTime = dayjs().format('YYYY-MM-DD')
  const weekStartTime = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
  const mouthStartTime = dayjs().subtract(30, 'day').format('YYYY-MM-DD')

  useGet(`/movie/updatePv/${query.id}`)

  const [
    detailRes,
    roleRes,
    castRes,
  ] = await Promise.all([
    useGet<IResData<any>>(`/movie/${query.id}`),
    useGet<IResPage<any[]>>(`/movie/role-actor/list?movieId=${query.id}&pageNum=1&pageSize=50`),
    useGet<IResPage<any[]>>(`/movie/cast/list?movieId=${query.id}&pageNum=1&pageSize=50`),
  ])

  const [weekList, monthList] = await Promise.all([
    useGet<IResPage<any[]>>('/movie/list', {
      columnValue: detailRes.data.columnValue,
      pageNum: 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [weekStartTime, currTime]
    }),
    useGet<IResPage<any[]>>('/movie/list', {
      columnValue: detailRes.data.columnValue,
      pageNum: 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [mouthStartTime, currTime]
    })
  ])

  return {
    detail: detailRes.data,
    roles: roleRes.rows,
    casts: castRes.rows,
    weekList: weekList.rows,
    monthList: monthList.rows
  }
})
