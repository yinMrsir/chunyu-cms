import {useGet, usePost} from "~/composables/useHttp";
import { getHeaders } from "h3";
import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get('/find', defineEventHandler(async (event) => {
  const headers = getHeaders(event)
  const query = getQuery(event)
  return useGet<{data: any}>('/user-rate', { movieId: query.id }, headers)
}))


router.post('/create', defineEventHandler(async (event) => {
  const headers = getHeaders(event)
  const body = await readBody(event)
  return usePost<{data: any}>('/user-rate', { movieId: body.id, rate: body.rate }, headers)
}))

export default useBase('/api/user/rate', router.handler)
