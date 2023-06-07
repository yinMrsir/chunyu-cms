import {useGet} from "~/composables/useHttp";
import { getHeaders } from "h3";
import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get('/sign', defineEventHandler(async (event) => {
  let headers = getHeaders(event)
  try {
    return useGet<{data: any}>('/user-sign/sign', {}, headers)
  } catch (e) {
    console.log(e)
  }
}))

router.get('/getSign', defineEventHandler(async (event) => {
  let headers = getHeaders(event)
  const { data } = await useGet<{data: any}>('/user-sign/getSign', {}, headers)
  return !!data
}))

export default useBase('/api/user/sign', router.handler)