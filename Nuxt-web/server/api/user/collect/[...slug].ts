import { useGet} from "~/composables/useHttp";
import { getHeaders } from "h3";
import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get('/list', defineEventHandler(async (event) => {
  let headers = getHeaders(event)
  return useGet<{data: any}>('/user-collect/findByPage', {}, headers)
}))

router.get('/find', defineEventHandler(async (event) => {
  const headers = getHeaders(event)
  const query = getQuery(event)
  return useGet<{data: any}>('/user-collect/find', { movieId: query.id }, headers)
}))

export default useBase('/api/user/collect', router.handler)
