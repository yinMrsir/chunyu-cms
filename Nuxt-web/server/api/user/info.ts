import {useGet} from "~/composables/useHttp";
import {getHeaders} from "h3";

export default defineEventHandler(async (event) => {
  let headers = getHeaders(event)
  const { data } = await useGet<{data: any}>('/web/user/info', {}, headers)
  return data
})
