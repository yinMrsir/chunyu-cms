import {getQuery} from "h3";
import {IResData, IResPage} from "~/global";
import dayjs from "dayjs";
import {useGet} from "~/composables/useHttp";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const currTime = dayjs().format('YYYY-MM-DD')
  const weekStartTime = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
  const mouthStartTime = dayjs().subtract(30, 'day').format('YYYY-MM-DD')

  const [ detailRes ] = await Promise.all([
    useGet<IResData<any>>(`/movie/videos/${query.id}`)
  ])

  const [
    likeRowsRes,
    weekList,
    monthList
  ] = await Promise.all([
    useGet<IResPage<any[]>>(`/movie/list`, {
      genres: detailRes.data.movie.genres.split(',')[0],
      pageNum: 1,
      pageSize: 18,
    }),
    useGet<IResPage<any[]>>('/movie/list', {
      columnValue: detailRes.data.movie.columnValue,
      pageNum: 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [weekStartTime, currTime]
    }),
    useGet<IResPage<any[]>>('/movie/list', {
      columnValue: detailRes.data.movie.columnValue,
      pageNum: 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [mouthStartTime, currTime]
    })
  ])

  return {
    detail: detailRes.data,
    likeRows: likeRowsRes.rows,
    weekList: weekList.rows,
    monthList: monthList.rows
  }
})
