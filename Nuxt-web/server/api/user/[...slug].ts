import {useGet, usePost} from "~/composables/useHttp";
import { getHeaders } from "h3";
import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get('/info', defineEventHandler(async (event) => {
  let headers = getHeaders(event)
  const { data } = await useGet<{data: any}>('/web/user/info', {}, headers)
  return data
}))

router.post('/login', defineEventHandler(async (event) => {
  const body = await readBody(event)
  return usePost('/web/user/login', body)
}))

router.post('/reg', defineEventHandler(async (event) => {
  const body = await readBody(event)
  return usePost('/web/user/reg', body)
}))

export default useBase('/api/user', router.handler)
