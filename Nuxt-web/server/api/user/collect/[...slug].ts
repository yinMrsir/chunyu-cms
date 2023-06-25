import {useGet, useDelete, usePost} from "~/composables/useHttp";
import { getHeaders } from "h3";
import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get('/find', defineEventHandler(async (event) => {
  const headers = getHeaders(event)
  const query = getQuery(event)
  return useGet<{data: any}>('/user-collect/find', { movieId: query.id }, headers)
}))

router.get('/cancel', defineEventHandler(async (event) => {
  const headers = getHeaders(event)
  const query = getQuery(event)
  return useDelete<{data: any}>('/user-collect/' + query.id, {}, headers)
}))

router.get('/add', defineEventHandler(async (event) => {
  const headers = getHeaders(event)
  const query = getQuery(event)
  return usePost<{data: any}>('/user-collect', { movieId: query.id }, headers)
}))

export default useBase('/api/user/collect', router.handler)
